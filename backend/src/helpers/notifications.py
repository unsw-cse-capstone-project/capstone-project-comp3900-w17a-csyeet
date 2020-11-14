import re
from pathlib import Path
from datetime import datetime, timedelta
from enum import Enum
from typing import List, Dict
from smtplib import SMTP
from email.message import EmailMessage
from email.utils import make_msgid
from pydantic import EmailStr
from apscheduler.schedulers.asyncio import AsyncIOScheduler
from bs4 import BeautifulSoup
from sqlalchemy.orm import Session
from ..models import Listing, User
from .common import session_maker
from .listing import get_auction_time_remaining
from .bid import get_highest_bid

email_htmls: Dict[str, str] = {}
scheduler = AsyncIOScheduler()


@scheduler.scheduled_job("interval", seconds=5)
def check_for_notifications():
    with session_maker.context_session() as session:
        session: Session
        listings: List[Listing] = session.query(Listing).all()
        for listing in listings:
            time_remaining = get_auction_time_remaining(listing)
            ended = time_remaining <= timedelta(milliseconds=0)
            if ended and not listing.notified_ended:
                # notify all registered bidders and seller of the auction's outcome
                highest_bid = get_highest_bid(listing.id, session)
                if highest_bid is not None and highest_bid.bid >= listing.reserve_price:
                    # auction was successful
                    for bidder in listing.bidders:
                        if bidder.user.id == highest_bid.bidder_id:
                            notify_winning_bidder(bidder.user, listing)
                            notify_successful_seller(bidder.user, listing)
                        else:
                            notify_losing_bidder(bidder.user, listing)
                else:
                    # auction was unsuccessful - property was passed in
                    notify_unsuccessful_seller(listing)
                    for bidder in listing.bidders:
                        notify_failed_bidder(bidder.user, listing)
                listing.notified_ended = True
                listing.notified_ending = True
                listing.notified_started = True
            elif not listing.notified_ending and time_remaining <= timedelta(minutes=5):
                # notify all registered bidders that the auction for this property is ending soon
                for bidder in listing.bidders:
                    notify_ending_soon(bidder.user, listing)
                listing.notified_ending = True
                listing.notified_started = True
            elif not listing.notified_started and listing.auction_start <= datetime.now():
                # notify all registered bidders that the auction for this property has started
                for bidder in listing.bidders:
                    notify_started(bidder.user, listing)
                listing.notified_started = True

            try:
                session.commit()
            except Exception:
                pass  # listing could have been deleted


def send_email(to: EmailStr, subject: str, html_tree: BeautifulSoup):
    email = EmailMessage()
    email['From'] = 'notifications.abode@gmail.com'
    email['To'] = to
    email['Subject'] = subject

    # fix whitespace and add a plain text alternative in case the client prefers it over HTML
    email.set_content(re.sub('\t+', '', re.sub('\n+', '\n', html_tree.text)))

    # embed image in email by including it as related inline content and referencing it in the HTML
    cid = make_msgid(domain='abode.com')
    # cid is enclosed by angle brackets, so remove them
    html_tree.find('img')['src'] = f'cid:{cid[1:-1]}'
    email.add_alternative(str(html_tree), subtype='html')

    with open(Path.cwd().joinpath('..', 'frontend', 'src', 'ui', 'base', 'logo', 'logo.png'), 'rb') as img:
        email.get_payload()[1] \
            .add_related(img.read(), 'image', 'png', cid=cid)

    # send the email via SMTP
    with SMTP('smtp.gmail.com', 587) as smtp_server:
        smtp_server.starttls()
        smtp_server.login('notifications.abode@gmail.com',
                          'ab0denotifications')
        smtp_server.send_message(email)


class EmailType(Enum):
    auction_started = 'auction_started'
    auction_ending_soon = 'auction_ending_soon'
    seller_sold = 'seller_success'
    seller_passed_in = 'seller_rejection'
    winning_bidder = 'buyer_success'
    losing_bidder = 'buyer_rejection_bid'
    bidder_passed_in = 'buyer_rejection_passedin'


def start_monitoring_notifications():
    # read and store email templates as HTML strings
    for filename_prefix in [email.value for email in EmailType]:
        with open(Path.cwd().joinpath('src', 'email_templates', f'{filename_prefix}.html'), 'r') as file:
            email_htmls[filename_prefix] = file.read()

    scheduler.start()


def stop_monitoring_notifications():
    scheduler.shutdown()


def notify_winning_bidder(winning_bidder: User, listing: Listing):
    # email winning bidder, providing seller's contact details
    html_tree = BeautifulSoup(
        email_htmls[EmailType.winning_bidder.value], 'html.parser')
    html_tree.find(id='property-text').string = listing.title
    html_tree.find(id='seller-email').string = listing.owner.email
    html_tree.find(id='seller-phone').string = listing.owner.phone_number
    email_subject = f"[Abode] You were the highest bidder for {listing.title}!"
    send_email(winning_bidder.email, email_subject, html_tree)


def notify_successful_seller(highest_bidder: User, listing: Listing):
    # email seller, providing highest bidder contact details
    html_tree = BeautifulSoup(
        email_htmls[EmailType.seller_sold.value], 'html.parser')
    html_tree.find(id='property-text').string = listing.title
    html_tree.find(id='bidder-email').string = highest_bidder.email
    html_tree.find(id='bidder-phone').string = highest_bidder.phone_number
    email_subject = f"[Abode] Your property, {listing.title}, was sold!"
    send_email(listing.owner.email, email_subject, html_tree)


def notify_losing_bidder(losing_bidder: User, listing: Listing):
    html_tree = BeautifulSoup(
        email_htmls[EmailType.losing_bidder.value], 'html.parser')
    html_tree.find(id='property-text').string = listing.title
    email_subject = f"[Abode] {listing.title} was sold to another bidder"
    send_email(losing_bidder.email, email_subject, html_tree)


def notify_unsuccessful_seller(listing: Listing):
    html_tree = BeautifulSoup(
        email_htmls[EmailType.seller_passed_in.value], 'html.parser')
    html_tree.find(id='property-text').string = listing.title
    html_tree.find(id='auction-button')['href'] = get_auction_url(listing)
    email_subject = f"[Abode] Your property, {listing.title}, was passed in"
    send_email(listing.owner.email, email_subject, html_tree)


def notify_failed_bidder(failed_bidder: User, listing: Listing):
    html_tree = BeautifulSoup(
        email_htmls[EmailType.bidder_passed_in.value], 'html.parser')
    html_tree.find(id='property-text').string = listing.title
    email_subject = f"[Abode] {listing.title} was passed in"
    send_email(failed_bidder.email, email_subject, html_tree)


def notify_ending_soon(bidder: User, listing: Listing):
    html_tree = BeautifulSoup(
        email_htmls[EmailType.auction_ending_soon.value], 'html.parser')
    html_tree.find(id='property-text').string = listing.title
    html_tree.find(id='auction-button')['href'] = get_auction_url(listing)
    email_subject = f"[Abode] The auction for {listing.title} is ending very soon!"
    send_email(bidder.email, email_subject, html_tree)


def notify_started(bidder: User, listing: Listing):
    html_tree = BeautifulSoup(
        email_htmls[EmailType.auction_started.value], 'html.parser')
    html_tree.find(id='property-text').string = listing.title
    html_tree.find(id='auction-button')['href'] = get_auction_url(listing)
    email_subject = f"[Abode] The auction for {listing.title} has started!"
    send_email(bidder.email, email_subject, html_tree)


def get_auction_url(listing: Listing) -> str:
    return f'http://localhost:3000/listing/{listing.id}/auction'

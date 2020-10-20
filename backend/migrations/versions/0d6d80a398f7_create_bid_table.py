"""create bid table

Revision ID: 0d6d80a398f7
Revises: 2a308486176d
Create Date: 2020-10-19 17:28:03.055764

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '0d6d80a398f7'
down_revision = '2a308486176d'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('bid',
    sa.Column('listing_id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('bid', sa.Integer(), nullable=False),
    sa.Column('placed_at', sa.DateTime(), nullable=False),
    sa.ForeignKeyConstraint(['listing_id'], ['listing.id'], name=op.f('fk_bid_listing_id_listing'), ondelete='CASCADE'),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], name=op.f('fk_bid_user_id_user'), ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('listing_id', 'user_id', 'bid', name=op.f('pk_bid'))
    )
    op.alter_column('listing', 'description',
               existing_type=sa.TEXT(),
               nullable=False)
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('listing', 'description',
               existing_type=sa.TEXT(),
               nullable=True)
    op.drop_table('bid')
    # ### end Alembic commands ###
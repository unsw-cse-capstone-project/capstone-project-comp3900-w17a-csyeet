import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import { AuthProvider, useStore } from "./AuthContext";
import { observer } from "mobx-react";
import { runInAction } from "mobx";
import { SearchPage } from "./teresa/search/main";
import { StarredPage } from "./profile/starred/main";
import { ListingsPage } from "./profile/listings/main";
import { DetailsPage } from "./profile/details/main";
import { BidsPage } from "./profile/bids/main";
import { AboutPage } from "./profile/about/main";
import { AddListingPage } from "./jenn/add_listing/main";
import { BidderRegistrationPage } from "./teresa/bidder_registration/main";
import { AuctionPage } from "./teresa/auction/main";
import { HomePage } from "./teresa/home/main";
import { ViewListingPage } from "./jeremy/view_listing/main";
import { Header } from "./ui/base/jenn/header/Header";
import { SignInStore } from "./ui/base/jenn/header/sign_in/SignInStore";
import { SignUpStore } from "./ui/base/jenn/header/sign_up/SignUpStore";
import { SignIn } from "./ui/base/jenn/header/sign_in/SignIn";
import "./index.css";

const ProtectedComponent = observer(
  ({
    Component,
    signInStore,
  }: {
    Component: React.ComponentType;
    signInStore: SignInStore;
  }) => {
    const store = useStore();
    if (!store) throw Error("Store shouldn't be null");
    if (!store.user) {
      runInAction(() => (signInStore.open = true));
      return (
        <SignIn
          store={signInStore}
          onSubmit={(email: string, password: string) =>
            store.signIn(email, password)
          }
        />
      );
    }
    return <Component />;
  }
);

const ErrorPage = () => <div>404 Page not found</div>;
const signInStore = new SignInStore();
const signUpStore = new SignUpStore();
ReactDOM.render(
  <React.StrictMode>
    <div className="page">
      <BrowserRouter>
        <AuthProvider>
          <Header signInStore={signInStore} signUpStore={signUpStore} />
          <div className="content" id="content">
            <Switch>
              <Route path="/search" component={SearchPage} />
              <Route
                path="/listing/:id/register"
                render={(props) => (
                  <ProtectedComponent
                    {...props}
                    signInStore={signInStore}
                    Component={BidderRegistrationPage}
                  />
                )}
              />
              <Route path="/listing/:id/auction" component={AuctionPage} />
              <Route path="/listing/:id" component={ViewListingPage} />
              <Route
                path="/add"
                render={(props) => (
                  <ProtectedComponent
                    {...props}
                    signInStore={signInStore}
                    Component={AddListingPage}
                  />
                )}
              />
              {/* Profile Pages */}
              <Route
                path="/profile/starred"
                render={(props) => (
                  <ProtectedComponent
                    {...props}
                    signInStore={signInStore}
                    Component={StarredPage}
                  />
                )}
              />
              <Route
                path="/profile/listings"
                render={(props) => (
                  <ProtectedComponent
                    {...props}
                    signInStore={signInStore}
                    Component={ListingsPage}
                  />
                )}
              />
              <Route
                path="/profile/details"
                render={(props) => (
                  <ProtectedComponent
                    {...props}
                    signInStore={signInStore}
                    Component={DetailsPage}
                  />
                )}
              />
              <Route
                path="/profile/bids"
                render={(props) => (
                  <ProtectedComponent
                    {...props}
                    signInStore={signInStore}
                    Component={BidsPage}
                  />
                )}
              />
              <Route
                path="/profile/about"
                render={(props) => (
                  <ProtectedComponent
                    {...props}
                    signInStore={signInStore}
                    Component={AboutPage}
                  />
                )}
              />
              <Route exact path="/" component={HomePage} />
              <Route component={ErrorPage} />
            </Switch>
          </div>
        </AuthProvider>
      </BrowserRouter>
    </div>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

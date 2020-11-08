import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import { AuthProvider, useStore } from "./AuthContext";
import { observer } from "mobx-react";
import { SearchPage } from "./search/main";
import { ProfilePage } from "./profile/main";
import { AddListingPage } from "./listing/add_listing/main";
import { BidderRegistrationPage } from "./bidder_registration/main";
import { AuctionPage } from "./auction/main";
import { HomePage } from "./home/main";
import { ViewListingPage } from "./view_listing/main";
import Header from "./ui/base/header/Header";
import { SignInStore } from "./ui/base/header/sign_in/SignInStore";
import { SignUpStore } from "./ui/base/header/sign_up/SignUpStore";
import { SignIn } from "./ui/base/header/sign_in/SignIn";
import { runInAction } from "mobx";
import { MessagesPage } from "./messages/main";
import { ListingMessagesPage } from "./listing_messages/main";

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
          onSubmit={(email: string, password: string, onError: () => void) =>
            store.signIn(email, password, onError)
          }
        />
      );
    }
    runInAction(() => (signInStore.open = false));
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
              <Route
                path="/listing/:id/messages"
                render={(props) => (
                  <ProtectedComponent
                    {...props}
                    signInStore={signInStore}
                    Component={ListingMessagesPage}
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
                path="/profile"
                render={(props) => (
                  <ProtectedComponent
                    {...props}
                    signInStore={signInStore}
                    Component={ProfilePage}
                  />
                )}
              />
              <Route
                path="/messages"
                render={(props) => (
                  <ProtectedComponent
                    {...props}
                    signInStore={signInStore}
                    Component={MessagesPage}
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

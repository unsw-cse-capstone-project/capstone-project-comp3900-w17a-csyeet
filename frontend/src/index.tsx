import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import {
  AuthProvider,
  SignInArgs,
  SignUpArgs,
  useStore,
  SignUpGoogleArgs,
  SignInGoogleArgs,
} from "./AuthContext";
import { observer } from "mobx-react";
import { SearchPage } from "./search/main";
import { ProfilePage } from "./profile/main";
import { AddListingPage } from "./listing/add_listing/main";
import { EditListingPage } from "./listing/edit_listing/main";
import { ViewListingPage } from "./view_listing/main";
import { BidderRegistrationPage } from "./bidder_registration/main";
import { AuctionPage } from "./auction/main";
import { HomePage } from "./home/main";
import { Header } from "./ui/base/header/Header";
import { SignUpStore } from "./ui/base/header/sign_up/SignUpStore";
import { MessagesPage } from "./messages/main";
import { ListingMessagesPage } from "./listing_messages/main";
import {
  createMuiTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@material-ui/core/styles";
import { NotFoundPage } from "./error/main";
import { Footer } from "./ui/base/footer/Footer";
import { Authentication } from "./ui/base/header/authentication/Authentication";
import { SignUp } from "./ui/base/header/sign_up/SignUp";
import { SignIn } from "./ui/base/header/sign_in/SignIn";
import { ErrorBoundaryComponent } from "./ui/base/error_boundary/ErrorBoundary";

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);
const signUpStore = new SignUpStore();

const ProtectedComponent = observer(
  ({ Component }: { Component: React.ComponentType }) => {
    const store = useStore();
    const [openModal, setOpenModal] = React.useState(true);
    const [signInMode, setSignInMode] = React.useState(true);
    if (!store) throw Error("Store shouldn't be null");
    if (!store.user) {
      const SignInWrapper = () => (
        <SignIn
          switchMode={() => setSignInMode(false)}
          onSubmit={(args: SignInArgs) => store.signIn(args)}
          onSubmitGoogle={(args: SignInGoogleArgs) => store.signInGoogle(args)}
          closeModal={() => setOpenModal(false)}
        />
      );
      const SignUpWrapper = () => (
        <SignUp
          switchMode={() => setSignInMode(true)}
          store={signUpStore}
          onSubmitNormal={(args: SignUpArgs) => store.signUp(args)}
          onSubmitGoogle={(args: SignUpGoogleArgs) => store.signUpGoogle(args)}
          closeModal={() => setOpenModal(false)}
        />
      );
      return (
        <div style={{minHeight: "calc(100vh - 435px)"}}>
          <Authentication
            signInMode={signInMode}
            open={openModal}
            onClose={() => setOpenModal(false)}
            SignIn={SignInWrapper}
            SignUp={SignUpWrapper}
          />
        </div>
      );
    }
    return <Component />;
  }
);

ReactDOM.render(
  <React.StrictMode>
    <div className="page">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <AuthProvider>
            <ErrorBoundaryComponent>
              <Header signUpStore={signUpStore} />
            </ErrorBoundaryComponent>
            <div className="content" id="content">
              <div className="pageContainer">
                <Switch>
                  <Route path="/search" component={SearchPage} />
                  <Route
                    exact
                    path="/listing/:id/register"
                    render={(props) => (
                      <ProtectedComponent
                        {...props}
                        Component={BidderRegistrationPage}
                      />
                    )}
                  />
                  <Route
                    exact
                    path="/listing/:id/messages"
                    render={(props) => (
                      <ProtectedComponent
                        {...props}
                        Component={ListingMessagesPage}
                      />
                    )}
                  />
                  <Route
                    exact
                    path="/listing/:id/auction"
                    component={AuctionPage}
                  />
                  <Route
                    exact
                    path="/listing/:id"
                    component={ViewListingPage}
                  />
                  <Route
                    exact
                    path="/listing/:id/edit"
                    component={EditListingPage}
                  />
                  <Route
                    path="/add"
                    render={(props) => (
                      <ProtectedComponent
                        {...props}
                        Component={AddListingPage}
                      />
                    )}
                  />
                  {/* Profile Pages */}
                  <Route
                    path="/profile"
                    render={(props) => (
                      <ProtectedComponent {...props} Component={ProfilePage} />
                    )}
                  />
                  <Route
                    path="/messages"
                    render={(props) => (
                      <ProtectedComponent {...props} Component={MessagesPage} />
                    )}
                  />
                  <Route exact path="/" component={HomePage} />
                  <Route component={NotFoundPage} />
                </Switch>
                <Footer />
              </div>
            </div>
          </AuthProvider>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import {
  Route,
  Switch,
  BrowserRouter,
  Link,
  useHistory,
} from "react-router-dom";
import { AuthProvider, AuthContext, useStore } from "./AuthContext";
import { observer } from "mobx-react";
import { Button, Dialog } from "@material-ui/core";
import { SearchPage } from "./search/main";
import { StarredPage } from "./profile/starred/main";
import { ListingsPage } from "./profile/listings/main";
import { DetailsPage } from "./profile/details/main";
import { BidsPage } from "./profile/bids/main";
import { AboutPage } from "./profile/about/main";
import { AddListingPage } from "./add_listing/main";
import { BidderRegistrationPage } from "./bidder_registration/main";
import { AuctionPage } from "./auction/main";
import { HomePage } from "./home/main";
import { ViewListingPage } from "./view_listing/main";
import { action } from "mobx";

const Header = observer(() => {
  const store = React.useContext(AuthContext);
  const history = useHistory();
  if (!store) throw Error("Store shouldn't be null");
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <h3>
        <Link to="/"> HOME </Link>
      </h3>
      {store.user ? (
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            store.logout();
            history.push("/");
          }}
        >
          logout
        </Button>
      ) : (
        <Button
          variant="contained"
          color="primary"
          onClick={() => store.toggleSignInModal()}
        >
          login
        </Button>
      )}
      <Dialog
        onClose={() => store.toggleSignInModal()}
        aria-labelledby="simple-dialog-title"
        open={store.openSignIn}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={action(() => {
            store.login();
            store.toggleSignInModal();
          })}
        >
          Login
        </Button>
      </Dialog>
    </div>
  );
});

const ProtectedComponent = observer(
  ({ Component }: { Component: React.ComponentType }) => {
    const store = useStore();
    if (!store) throw Error("Store shouldn't be null");
    React.useEffect(() => {
      if (!store.user) {
        store.toggleSignInModal();
      }
    }, []);
    if (!store.user) {
      return (
        <Dialog aria-labelledby="simple-dialog-title" open={store.openSignIn}>
          <Button
            variant="contained"
            color="primary"
            onClick={action(() => {
              store.login();
              store.toggleSignInModal();
            })}
          >
            Login
          </Button>
        </Dialog>
      );
    }
    return <Component />;
  }
);

const ErrorPage = () => <div>404 Page not found</div>;

ReactDOM.render(
  <React.StrictMode>
    <div className="page">
      <BrowserRouter>
        <AuthProvider>
          <Header />
          <div className="content" id="content">
            <Switch>
              <Route path="/search" component={SearchPage} />
              <Route
                path="/listing/:id/register"
                render={(props) => (
                  <ProtectedComponent
                    {...props}
                    Component={BidderRegistrationPage}
                  />
                )}
              />
              <Route path="/listing/:id/auction" component={AuctionPage} />
              <Route path="/listing/:id" component={ViewListingPage} />
              <Route
                path="/add"
                render={(props) => (
                  <ProtectedComponent {...props} Component={AddListingPage} />
                )}
              />
              {/* Profile Pages */}
              <Route
                path="/profile/starred"
                render={(props) => (
                  <ProtectedComponent {...props} Component={StarredPage} />
                )}
              />
              <Route
                path="/profile/listings"
                render={(props) => (
                  <ProtectedComponent {...props} Component={ListingsPage} />
                )}
              />
              <Route
                path="/profile/details"
                render={(props) => (
                  <ProtectedComponent {...props} Component={DetailsPage} />
                )}
              />
              <Route
                path="/profile/bids"
                render={(props) => (
                  <ProtectedComponent {...props} Component={BidsPage} />
                )}
              />
              <Route
                path="/profile/about"
                render={(props) => (
                  <ProtectedComponent {...props} Component={AboutPage} />
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

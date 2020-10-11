import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
// import App from "./App";
import * as serviceWorker from "./serviceWorker";
import {
  Route,
  Switch,
  BrowserRouter,
  RouteProps,
  Redirect,
  Link,
} from "react-router-dom";
import { AuthProvider, AuthContext } from "./AuthContext";
import { observer } from "mobx-react";
import { Button } from "@material-ui/core";
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

const ProtectedRoute = observer(
  ({
    component: Component,
    ...rest
  }:
    | RouteProps
    | {
        component: React.ComponentType<RouteProps>;
      }) => {
    const store = React.useContext(AuthContext);
    if (!store) throw Error("Store shouldn't be null");
    return (
      <Route
        render={(props: any) =>
          store.isAuth ? (
            Component && <Component {...props} />
          ) : (
            <Redirect to="/" />
          )
        }
        {...rest}
      />
    );
  }
);

const Header = observer(() => {
  const store = React.useContext(AuthContext);
  if (!store) throw Error("Store shouldn't be null");
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <h3>
        <Link to="/"> HOME </Link>
      </h3>
      {store.isAuth ? (
        <Button
          variant="contained"
          color="primary"
          onClick={() => store.logout()}
        >
          logout
        </Button>
      ) : (
        <Button
          variant="contained"
          color="primary"
          onClick={() => store.login()}
        >
          login
        </Button>
      )}
    </div>
  );
});

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
              <ProtectedRoute
                path="/listing/:id/register"
                component={BidderRegistrationPage}
              />
              <Route path="/listing/:id/auction" component={AuctionPage} />
              <Route path="/listing/:id" component={ViewListingPage} />
              <ProtectedRoute path="/add" component={AddListingPage} />
              {/* Profile Pages */}
              <ProtectedRoute path="/profile/starred" component={StarredPage} />
              <ProtectedRoute
                path="/profile/listings"
                component={ListingsPage}
              />
              <ProtectedRoute path="/profile/details" component={DetailsPage} />
              <ProtectedRoute path="/profile/bids" component={BidsPage} />
              <ProtectedRoute path="/profile/about" component={AboutPage} />
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

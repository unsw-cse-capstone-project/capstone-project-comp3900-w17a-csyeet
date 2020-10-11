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
  useLocation,
  useParams,
  useHistory,
} from "react-router-dom";
import { AuthProvider, useStore, AuthContext } from "./AuthContext";
import { observer } from "mobx-react";
import { Button, createStyles, makeStyles, Theme } from "@material-ui/core";
import { createSearchPage } from "./search/create";
const Dashboard = () => <h2>User Dashboard</h2>;
const Landing = () => <h2>Landing</h2>;

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
const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const SearchPage = () => {
  const query = useQuery().get("query");

  if (query === null || query === "") {
    return <Redirect to="/" />;
  }

  const Page = createSearchPage(query);
  return <Page />;
};

const BidderRegistrationPage = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={() => history.push("/listing/" + id)}
      >
        Back to Listing
      </Button>
      Bidder rego for listing {id}
    </div>
  );
};

const ListingPage = () => {
  const { id } = useParams<{ id: string }>();
  return <div>Listing #{id}</div>;
};

ReactDOM.render(
  <div className="page">
    <BrowserRouter>
      <AuthProvider>
        <Header />
        <div className="content" id="content">
          <Switch>
            <ProtectedRoute path="/dashboard" component={Dashboard} />
            <Route path="/search" component={SearchPage} />
            <Route
              path="/listing/:id/register"
              component={BidderRegistrationPage}
            />
            <Route path="/listing/:id" component={ListingPage} />
          </Switch>
        </div>
      </AuthProvider>
    </BrowserRouter>
  </div>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

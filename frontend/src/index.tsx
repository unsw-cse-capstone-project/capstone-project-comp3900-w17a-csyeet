import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
// import App from "./App"; // Disabled
import * as serviceWorker from "./serviceWorker";
import {
  Route,
  Switch,
  BrowserRouter,
  RouteProps,
  Redirect,
  Link,
} from "react-router-dom";
import { AuthProvider, AuthConsumer } from "./ui/authContext/AuthContext";
import Header from "./ui/base/header/Header";

const Dashboard = () => <h2>User Dashboard</h2>;
const Landing = () => <h2>Landing</h2>;

const ProtectedRoute = ({
  component: Component,
  ...rest
}:
  | RouteProps
  | {
      component: React.ComponentType<RouteProps>;
    }) => (
  <AuthConsumer>
    {({ isAuth }) => (
      <Route
        render={(props: any) =>
          isAuth ? Component && <Component {...props} /> : <Redirect to="/" />
        }
        {...rest}
      />
    )}
  </AuthConsumer>
);

ReactDOM.render(
  <BrowserRouter>
    <AuthProvider>
      <Header />
      <Switch>
        <ProtectedRoute path="/dashboard" component={Dashboard} />
        <Route path="/" component={Landing} />
      </Switch>
    </AuthProvider>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

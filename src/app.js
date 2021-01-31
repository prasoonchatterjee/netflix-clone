import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";

import * as ROUTES from "./constants/routes";
import { Home, Browse, Signin, Signup } from "./pages";
import { IsUserRedirect, ProtectedRoute } from "./helpers/routes";

function App() {
  // const user = { name: "pras" };
  const user = null;

  return (
    <Router>
      <Switch>
        <IsUserRedirect
          user={user}
          loggedInPath={ROUTES.BROWSE}
          path={ROUTES.SIGN_IN}
          exact
        >
          <Signin />
        </IsUserRedirect>
        <IsUserRedirect
          user={user}
          loggedInPath={ROUTES.BROWSE}
          path={ROUTES.SIGN_UP}
          exact
        >
          <Signup />
        </IsUserRedirect>
        <IsUserRedirect
          user={user}
          loggedInPath={ROUTES.BROWSE}
          path={ROUTES.HOME}
          exact
        >
          <Home />
        </IsUserRedirect>
        <ProtectedRoute
          user={user}
          path={ROUTES.BROWSE}
          signInPath={ROUTES.SIGN_IN}
          exact
        >
          <Browse />
        </ProtectedRoute>
      </Switch>
    </Router>
  );
}

export default App;

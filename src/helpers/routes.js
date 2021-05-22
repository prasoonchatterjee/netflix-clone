import React from "react";
import { Route, Redirect } from "react-router-dom";

//if user present then redirect to loggedInPath
export function IsUserRedirect({ user, loggedInPath, children, ...rest }) {
  return (
    <Route
      {...rest}
      render={() => {
        if (!user) return children;
        if (user) return <Redirect to={{ pathname: loggedInPath }} />;
        return null;
      }}
    />
  );
}

//if user not present redirect to signInPath
export function ProtectedRoute({ children, user, signInPath, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (user) return children;
        if (!user)
          return (
            <Redirect
              to={{ pathname: signInPath, state: { from: location } }}
            />
          );
        return null;
      }}
    />
  );
}

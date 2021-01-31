import React from "react";
import { Route, Redirect } from "react-router-dom";

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

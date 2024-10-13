import React from 'react';
import { Route, Redirect } from 'react-router-dom';


// In the PrivateRoute component, replace the isAuthenticated variable with your actual authentication logic. 
// You might use state management libraries like Redux, context, or local storage to store and check the user's 
// authentication status.

function PrivateRoute({ component: Component, ...rest }) {
  const isAuthenticated = /* Check if the user is authenticated */ false;
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
}
export default PrivateRoute;
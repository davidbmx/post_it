import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const isAuth = () => {
    return localStorage.getItem('token') != null;
}

const ProtectedRoute = ({ component: Component, ...rest }) => (
    <Route
    {...rest}
    render={(props) =>
      isAuth() === false ? <Redirect to="/login" /> : <Component {...props} />
    }
  />
);

export default ProtectedRoute;

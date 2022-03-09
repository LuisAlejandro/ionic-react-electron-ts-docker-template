import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';


const PrivateRoute: React.FC<RouteProps> = ({ component: Component, ...rest }) => {
  if (!Component) return null;
  return (
    <Route {...rest} render={props => (
      localStorage.getItem('user')
        ? <Component {...props} />
        : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
      )} />)
}

export default PrivateRoute;
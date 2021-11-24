import React from "react";
import {Route, Redirect} from "react-router-dom";
import {isAuthenticated} from "./index";



// this PrivateRoute syntax is copied directly from "https://reactrouter.com/web/example/auth-workflow"
const PrivateRoute = ({ component : Component, ...rest }) => {
    return (
      <Route
        {...rest}
        render={ props =>                           //prop will allow us to send some additional properties in the actual route
            isAuthenticated() ? (
            <Component {...props}/> 
          ) : (                                     //look closely, this is a ternary operator
            <Redirect
              to={{
                pathname: "/signin",
                state: { from: props.location }
              }}
            />
          )
        }
      />
    );
  };


  export default PrivateRoute;
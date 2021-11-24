import React from "react";
import {Route, Redirect} from "react-router-dom";
import {isAuthenticated} from "./index";



// this AdminRoute syntax is copied directly from "https://reactrouter.com/web/example/auth-workflow"
const AdminRoute = ({ component : Component, ...rest }) => {
    return (
      <Route
        {...rest}
        render={ props =>                           //prop will allow us to send some stuff
            isAuthenticated() && isAuthenticated().user.role === 1 ? (
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


  export default AdminRoute;
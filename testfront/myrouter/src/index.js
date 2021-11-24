import React from 'react';
import ReactDOM from 'react-dom';
import {Route, Link, Switch, BrowserRouter as Router} from "react-router-dom";
//"Link" is just like the href a of HTML

import './index.css';
import App from './App';
import User from "./User";
import Visit from "./Visit";
import notfound from "./notfound";

const routing = (
  <Router>
    <div>
      <ul>
        <li><Link to = "/">Home</Link></li>
        <li><Link to = "/user">User</Link></li>
        <li><Link to = "/visit">Visit</Link></li>
      </ul>
    </div>     {/*usually, we keep these links in a separate file*/}
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/user" component={User} />
      <Route path="/visit" component={Visit} />
      
      <Route  component = {notfound} />           
      {/*Saare routes are wrapped up inside a switch. Also, if no path is served
      then serve the default path, that is "notfound" here */}
    </Switch>
  </Router>
);                         //this will handle all of my routiung stuff instead of the App directly

ReactDOM.render(
    routing,
  document.getElementById("root")
);


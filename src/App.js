import React from 'react';
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';

import Main from "./pages/Main";
import Profile from "./pages/Profile";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" 
          component={(props)=><Main {...props}/>}
          />
          <Route path='/profile' 
          component={(props)=><Profile {...props}/>}
          />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

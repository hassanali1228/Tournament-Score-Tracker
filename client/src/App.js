import logo from './logo.svg';
import './App.css';
import React,{useState} from 'react';
import { BrowserRouter,Route,Switch } from 'react-router-dom';
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Update from "./pages/Update";
import Home from "./pages/Home";
import Tournaments from "./pages/createTournaments";
import Matches from "./pages/createMatches";

const axios = require('axios');

function App() {
  return (
    <div className="App">      
      <BrowserRouter>
        <Route path='/' component={Home} exact/>
          <Switch>
            <Route path='/signin' component={Signin} exact/>
            <Route path='/signup' component={Signup} exact/>
            <Route path='/update' component={Update} exact/>
            <Route path='/createtournament' component={Tournaments} exact/>
            <Route path='/creatematch' component={Matches} exact/>
          </Switch>
      </BrowserRouter>
      
    </div>
  );
}

export default App;

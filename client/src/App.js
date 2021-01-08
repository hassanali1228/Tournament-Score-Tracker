import logo from './logo.svg';
import './App.css';
import React,{useState} from 'react';
import { BrowserRouter,Route,Switch } from 'react-router-dom';
import Signin from "./pages/signin";
import Signup from "./pages/Signup";
import Update from "./pages/Update";
import Home from "./pages/Home";

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
          </Switch>
      </BrowserRouter>
      
    </div>
  );
}

export default App;

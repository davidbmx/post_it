import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';
import Navbar from './components/Navbar';
import LoginService from './services/LoginService';

axios.defaults.baseURL = 'http://localhost:8000';


class App extends Component {

  render() {
    return (
      <div className="container-block">
        <Router>
          {LoginService.isAuth() ? <Navbar /> : ''}
          <ProtectedRoute path="/" component={Dashboard} exact />
          <Route path="/login" component={Login} exact />
        </Router>
      </div>
    );
  }
}

export default App;

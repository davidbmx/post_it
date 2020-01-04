import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

axios.defaults.baseURL = 'http://localhost:8000';

const token = localStorage.getItem('token');
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

class App extends Component {

  render() {
    return (
      <div className="container">
        <Router>
          <ProtectedRoute path="/" component={Dashboard} exact />
          <Route path="/login" component={Login} exact />
        </Router>
      </div>
    );
  }
}

export default App;

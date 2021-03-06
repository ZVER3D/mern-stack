import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { Provider } from 'react-redux';

import store from './store';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import { clearProfile } from './actions/profileActions';

import PrivateRoute from './components/common/privateRoute';

import './App.css';

import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Footer from './components/layout/Footer';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/createProfile/CreateProfile';
import EditProfile from './components/editProfile/EditProfile';
import AddExperience from './components/addCredentials/AddExperience';
import AddEducation from './components/addCredentials/AddEducation';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import NotFound from './components/common/NotFound';
import Posts from './components/posts/Posts';
import Post from './components/post/Post';


// Check for token
if (localStorage.getItem('jwtToken')) {
  // Set auth token to header
  setAuthToken(localStorage.getItem('jwtToken'));
  // Decode token and get user info
  const decoded = jwt_decode(localStorage.getItem('jwtToken'));
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now()/1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Clear current profile
    store.dispatch(clearProfile());
    // Redirect to login
    window.location.href = '/login';
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route path="/" exact component={Landing} />
            <div className="container">
              <Route path="/register" exact component={Register} />
              <Route path="/login" exact component={Login} />
              <Route path="/profiles" exact component={Profiles} />
              <Route path="/profile/:handle" exact component={Profile} />
              <Switch>
                <PrivateRoute path="/dashboard" exact component={Dashboard} />
              </Switch>
              <Switch>
                <PrivateRoute path="/create-profile" exact component={CreateProfile} />
              </Switch>
              <Switch>
                <PrivateRoute path="/edit-profile" exact component={EditProfile} />
              </Switch>
              <Switch>
                <PrivateRoute path="/add-experience" exact component={AddExperience} />
              </Switch>
              <Switch>
                <PrivateRoute path="/add-education" exact component={AddEducation} />
              </Switch>
              <Switch>
                <PrivateRoute path="/feed" exact component={Posts} />
              </Switch>
              <Switch>
                <PrivateRoute path="/post/:id" exact component={Post} />
              </Switch>
              <Route path="/not-found" exact component={NotFound} />
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;

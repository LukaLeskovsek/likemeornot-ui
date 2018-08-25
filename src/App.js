import React from 'react';
import PropTypes from 'prop-types';
import {Route} from 'react-router-dom';
import HomePage from './components/pages/HomePage';
import LoginPage from './components/pages/LoginPage';
import DashboardPage from './components/pages/DashboardPage';
import UserRoute from './components/routes/UserRoute';

const App = ({location}) => (<div className='ui container'>
  <Route location={location} path="/" exact component={HomePage} />
  <Route location={location} path="/login" exact component={LoginPage} />
  <UserRoute location={location} path="/dashboard" exact component={DashboardPage} />
  </div>
);

App.propTypes = {
  location : PropTypes.shape(
    {
      pathname : PropTypes.string.isRequired
    }
  )
}




export default App;

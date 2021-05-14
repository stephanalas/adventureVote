import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import MainLoginSignup from './MainLoginSignup';
import Nav from './Nav';
import { connect } from 'react-redux';
import UserMainView from './UserMainView';
import getUser from '../store/actions/getUser';
import getUsers from '../store/actions/getUsers';
import MyFriends from './MyFriends';
import CreateTrip from './CreateTrip';
import TripCard from './TripCard';

export default connect(
  (state) => state,
  (dispatch) => {
    return {
      getUser: () => dispatch(getUser()),
      getUsers: () => dispatch(getUsers()),
      getTrips: () => dispatch(getTrips()),
    };
  }
)((props) => {
  if (localStorage.getItem('token') && !props.user.id) {
    props.getUser();
    props.getUsers();
  }
  return (
    <HashRouter>
      <Route component={Nav} />
      <Switch>
        <Route component={TripCard} path="/test" exact />
        {!props.user.id ? (
          <Route component={MainLoginSignup} path="/" exact />
        ) : null}

        {props.user.id ? <Route component={UserMainView} path="/home" /> : null}
        <Route component={CreateTrip} path="/createTrip" exact />
        <Route component={MyFriends} path="/friends" exact />
      </Switch>
    </HashRouter>
  );
});

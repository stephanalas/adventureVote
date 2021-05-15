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
import NotificationModal from './NotificationModal';
import CreateEvent from './CreateEvent';
import UpdateTrip from './updateTrip';
import CreateEventModal from './CreateEventModal';
export default connect(
  (state) => state,
  (dispatch) => {
    return {
      getUser: () => dispatch(getUser()),
      getUsers: () => dispatch(getUsers()),
    };
  }
)((props) => {
  if (localStorage.getItem('token') && !props.user.user) {
    props.getUser();
    props.getUsers();
  }
  const id = props.user || null;
  return (
    <HashRouter>
      <Route component={Nav} />
      <Switch>
        <Route component={CreateEventModal} path="/test" exact />
        {id ? <Route component={MainLoginSignup} path="/" exact /> : null}

        {id ? <Route component={UserMainView} path="/home" /> : null}
        <Route component={CreateTrip} path="/createTrip" exact />
        <Route component={MyFriends} path="/friends" exact />
        <Route component={UpdateTrip} path="/updateTrip/trip/:tripId" exact />
      </Switch>
    </HashRouter>
  );
});

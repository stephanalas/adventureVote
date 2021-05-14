import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { Avatar, Button } from '@material-ui/core';
import { connect } from 'react-redux';
import logout from '../store/actions/logout';
const useStyles = makeStyles({
  nav: {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'space-between',
  },
  logo: {
    height: '3rem',
    width: '3rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: '1rem',
  },
  link: {
    display: 'flex',
    alignItems: 'center',
    padding: '.5rem',
  },
});

const Nav = (props) => {
  const classes = useStyles();
  const handleLogout = () => {
    props.logout();
    props.history.push('/');
  };
  return (
    <AppBar position="static" className={classes.nav}>
      <Link to="/home">
        <div className={classes.logo}>Logo</div>
      </Link>
      {props.user.id ? <Avatar src="none.jpg" /> : 'Welcome'}
      {props.user.id ? <Button onClick={handleLogout}>Sign Out</Button> : ''}
      <Link to="#" className={classes.link}>
        Learn More
      </Link>
    </AppBar>
  );
};

export default connect(
  (state) => state,
  (dispatch) => {
    return {
      logout: () => dispatch(logout()),
    };
  }
)(Nav);
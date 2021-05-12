import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
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

const Nav = () => {
  const classes = useStyles();
  return (
    <AppBar position="static" className={classes.nav}>
      <div className={classes.logo}>Logo</div>
      <Link to="#" className={classes.link}>
        Learn More
      </Link>
    </AppBar>
  );
};

export default Nav;

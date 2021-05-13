import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { connect } from 'react-redux';
import createUser from '../store/actions/createUser';

const useStyles = makeStyles((theme) => ({
  // this is where you can use css
  paper: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '20rem',
    width: '20rem',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignUp = (props) => {
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const onChange = (ev) => {
    const { name } = ev.target;
    if (name === 'username') setUsername(ev.target.value);
    else if (name === 'email') setEmail(ev.target.value);
    else setPassword(ev.target.value);
  };
  const onSubmit = (ev) => {
    ev.preventDefault();
    props.signUp({ username, email, password });
    localStorage.setItem('userId', props.user.id);
    if (props.user.id) props.history.push('/home');
  };
  return (
    <Container component="div" maxWidth="xs">
      <CssBaseline />
      <form className={classes.form} onSubmit={onSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              autoComplete="username"
              name="username"
              variant="outlined"
              required
              fullWidth
              id="username"
              label="Username"
              autoFocus
              onChange={onChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              onChange={onChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={onChange}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Sign Up
        </Button>
      </form>
    </Container>
  );
};

export default connect(
  (state) => state,
  (dispatch) => {
    return {
      signUp: (userInfo) => dispatch(createUser(userInfo)),
    };
  }
)(SignUp);

import React, { useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Paper,
  Grid,
  Divider,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
} from '@material-ui/core';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import getUser from '../store/actions/getUser';
const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '100%',
    display: 'flex',
  },
  paper: {
    backgroundColor: 'green',
    height: '100%',
    marginTop: '3rem',
    marginLeft: '1rem',
    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
  },
  userNavigation: {
    width: '20%',
  },
  lineContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  option: {
    backgroundColor: 'white',
    height: '4rem',
    // display: 'flex',
    // justifyContent: 'center',
    // alignItems: 'center',
    margin: '0',
  },
  button: {
    width: '100%',
    height: '100%',
  },
  typography: {
    width: '100%',
    height: '100%',
  },
});
export default connect((state) => state)((props) => {
  const classes = useStyles();
  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12} sm={3} className={classes.userNavigation}>
        <Paper className={classes.paper}>
          <Grid item className={classes.option}>
            <Typography className={classes.typography}>
              <Button className={classes.button}>Create A Trip</Button>
            </Typography>
          </Grid>
          <Grid item className={classes.option}>
            <Typography className={classes.typography}>
              <Button
                className={classes.button}
                onClick={() =>
                  props.history.push(`/users/${props.user.id}/friends`)
                }
              >
                My friends
              </Button>
            </Typography>
          </Grid>
          <Grid item className={classes.option}>
            <Typography className={classes.typography}>
              <Button className={classes.button}>Past Trips</Button>
            </Typography>
          </Grid>
          <Grid item className={classes.option}>
            <Typography className={classes.typography}>
              <Button className={classes.button}>Notifications</Button>
            </Typography>
          </Grid>
          <Grid item className={classes.option}>
            <Typography className={classes.typography}>
              <Button className={classes.button}>Events</Button>
            </Typography>
          </Grid>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={2} className={classes.lineContainer}>
        <Divider orientation="vertical" />
      </Grid>
      <Grid item xs={12} sm={6}>
        {/* flexbox the paper element */}
        <Paper className={classes.paper}>
          <Card className={classes.card} raised>
            <CardContent>
              <Typography>Create a new Trip!</Typography>
            </CardContent>
            <CardActions>
              <Button size="small" variant="contained">
                create Trip
              </Button>
            </CardActions>
          </Card>
        </Paper>
      </Grid>
    </Grid>
  );
});

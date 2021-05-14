import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  makeStyles,
  Button,
} from '@material-ui/core';
import { connect } from 'react-redux';
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    height: 'min-content',
    width: '100%',
    padding: '0',
    height: '5rem',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    padding: '0',
    justifyContent: 'center',
  },
  content: {
    display: 'flex',
    flexFlow: 'row',
    justifyContent: 'space-around',
    width: '100%',
    padding: '0',
    alignItems: 'center',
  },
}));
const AttendeeCard = (props) => {
  const classes = useStyles();
  return (
    <Card className={classes.root} key={props.attendee.id}>
      <div className={classes.details}>
        <CardContent className={classes.content} style={{ padding: 0 }}>
          <div>image</div>
          <Typography component="h5" variant="h5">
            {props.attendee.username}
          </Typography>
        </CardContent>
      </div>
    </Card>
  );
};

export default connect((state) => state)(AttendeeCard);

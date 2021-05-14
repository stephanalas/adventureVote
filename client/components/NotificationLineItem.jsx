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
const NotificationLineItem = (props) => {
  const classes = useStyles();
  return (
    <Card className={classes.root} key={Math.random * 100000}>
      <div className={classes.details}>
        <CardContent className={classes.content} style={{ padding: 0 }}>
          <div>image</div>
          {props.notification
            ? 'wants to be your friend'
            : 'wants to invite you on a trip'}
        </CardContent>
      </div>
    </Card>
  );
};

export default connect((state) => state)(NotificationLineItem);

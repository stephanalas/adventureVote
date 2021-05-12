import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '100%',
  },
});
export default () => {
  const classes = useStyles();
  return <Container className={classes.root}> </Container>;
};

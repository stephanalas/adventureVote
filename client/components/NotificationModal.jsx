import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Paper,
  Typography,
  Modal,
  Backdrop,
  Fade,
  List,
} from '@material-ui/core';
import { connect } from 'react-redux';
import NotificationLineItem from './NotificationLineItem';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    maxHeight: '300px',
    maxWidth: '400px',
    overflow: 'auto',
    width: '100%',
  },
}));

export default connect((state) => state)(function NotificationModal(props) {
  const classes = useStyles();
  let notifications, invites, friendRequests;
  if (props.user.user) notifications = props.user.notifications;
  else notifications = {};
  invites = notifications.tripInvites || [];
  friendRequests = notifications.friendRequests || [];

  const handleClose = () => {
    props.setOpen(false);
  };
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={props.open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={props.open}>
        <Paper className={classes.paper}>
          <Typography id="transition-modal-title">Notifications</Typography>
          <List dense className={classes.root}>
            {friendRequests.length
              ? friendRequests.map((request) => (
                  <NotificationLineItem notification={request} />
                ))
              : null}
            {invites.length
              ? invites.map((invite) => (
                  <NotificationLineItem notication={invite} />
                ))
              : null}
            hello
          </List>
        </Paper>
      </Fade>
    </Modal>
  );
});

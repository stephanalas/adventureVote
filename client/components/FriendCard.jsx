import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  makeStyles,
  Button,
} from '@material-ui/core';
import { connect } from 'react-redux';
import addFriend from '../store/actions/addFriend';
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
const FriendCard = (props) => {
  const classes = useStyles();
  let pending, isFriend;
  console.log(props);
  const friends = props.user.friends || [];
  if (friends.length) {
    // console.log(friends);
    friends.forEach((friend) => {
      if (
        friend.id === props.friend.id &&
        friend.User_Friend.status === 'approved'
      ) {
        isFriend = true;
      } else if (
        friend.id === props.friend.id &&
        friend.User_Friend.status === 'pending'
      ) {
        pending = true;
      }
    });
  }
  return (
    <Card className={classes.root} key={props.friend.id}>
      <div className={classes.details}>
        <CardContent className={classes.content} style={{ padding: 0 }}>
          <div>image</div>
          <Typography component="h5" variant="h5">
            {props.friend.username}
          </Typography>{' '}
          {isFriend ? <Button>Message</Button> : null}
          {pending ? <Typography>Pending</Typography> : null}
          {!isFriend && !pending ? (
            <Button
              onClick={() => props.addFriend(props.user.id, props.friend.id)}
            >
              Add Friend
            </Button>
          ) : null}
        </CardContent>
      </div>
    </Card>
  );
};

export default connect(
  (state) => state,
  (dispatch) => {
    return {
      addFriend: (userId, friendId) => dispatch(addFriend(userId, friendId)),
    };
  }
)(FriendCard);

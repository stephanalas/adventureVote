import React, { useState } from 'react';
import { connect } from 'react-redux';
import SearchBar from 'material-ui-search-bar';
import { Grid, makeStyles } from '@material-ui/core';
import FriendCard from './FriendCard';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: 'max-content',
    display: 'flex',
    justifyContent: 'center',
  },
  searchBar: {
    width: '50%',
  },
  friendList: {
    width: '70%',
    height: 'max-content',
    backgroundColor: 'green',
  },
}));

const MyFriends = (props) => {
  const classes = useStyles();
  const [searchValue, setSearchValue] = useState('');
  const [users, setUsers] = useState([]);
  const onChange = (ev) => {
    if (!ev.length) {
      setUsers(props.user.user.friends);
    }
    setSearchValue(ev);
    const potentialFriends = props.users.filter((user) =>
      user.username.includes(ev)
    );
    setUsers(potentialFriends);
  };
  let friends;
  if (props.user.user) friends = props.user.user.friends;
  else friends = [];
  return (
    <Grid container className={classes.root}>
      {' '}
      <SearchBar
        onChange={onChange}
        onRequestSearch={() => console.log('onRequestSearch')}
        className={classes.searchBar}
        onCancelSearch={() => setSearchValue('')}
        placeholder="Search for friends or make new ones"
        style={{
          margin: '0 auto',
          maxWidth: 912,
        }}
      />
      <Grid item container className={classes.friendList}>
        {searchValue.length
          ? users.map((user) => <FriendCard key={user.id} friend={user} />)
          : friends.map((friend) => (
              <FriendCard key={friend.id} friend={friend} />
            ))}
      </Grid>
    </Grid>
  );
};

export default connect((state) => state)(MyFriends);

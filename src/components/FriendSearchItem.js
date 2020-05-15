import React from 'react';
import {ListGroup, ListGroupItem, Button} from "react-bootstrap";

import {useHistory} from "react-router-dom";

import filterFriends from '../helpers/filterFriends';

const request = require("request");

export default function FriendSearchItem(props){
  let history = useHistory();
  const {friend, user, list} = props;
  

  const handleClick = async (e) =>{
    e.preventDefault();
    friend.friends.push(user.id);
    user.friends.push(friend.id);
    const updates = {user: user, friend: friend};
    list[user.id - 1] = user;
    list[friend.id - 1] = friend;

    await request({
      uri: "http://localhost:8080/addfriend",
      method: "POST",
      body: JSON.stringify(updates),
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': 'http://localhost:8080',
        "Access-Control-Allow-Methods": "POST",
        }
  }, async (err, response, body) => {
      if(err){
        return;
      }
    })
    history.push({pathname: "/profile", state: {user: user, list: list, friendList: filterFriends(user.friends, list)}})
  }

  return(
    <ListGroup horizontal>
      <ListGroupItem>
        {friend.name}
      </ListGroupItem>
      <ListGroupItem>
        <Button 
        variant="secondary"
        onClick={(e)=> handleClick(e)}
        >
          Add Friend
        </Button>
      </ListGroupItem>
    </ListGroup>
  )
}
import React from 'react';
import {ListGroup, ListGroupItem, Button} from "react-bootstrap";

export default function FriendSearchItem(props){
  return(
    <ListGroup horizontal>
      <ListGroupItem>
        {props.name}
      </ListGroupItem>
      <ListGroupItem>
        <Button variant="secondary">Add Friend</Button>
      </ListGroupItem>
    </ListGroup>
  )
}
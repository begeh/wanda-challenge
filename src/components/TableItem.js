import React from 'react';

import {Button} from "react-bootstrap";

import {useHistory} from "react-router-dom";

import filterFriends from '../helpers/filterFriends';

export default function TableItem(props){
  let history = useHistory();
  const {name, longUrl, shortUrl, friends, list} = props;

  const handleClick = (e) =>{
    e.preventDefault();
    const friendList = filterFriends(friends, list);
    history.push({pathname: "/profile", state: {...props, friendList: friendList}})
  }

  return(
    <tr onClick={(e)=> handleClick(e)}>
      <td>{name}</td>
      <td>
        <a onClick={(e)=> e.stopPropagation()} href={longUrl}>
          {shortUrl}
        </a>
      </td>
      <td>{friends.length}</td>
      {/* <td>
        <Button variant="primary">Add Friend</Button>
      </td> */}
    </tr>
  )
}
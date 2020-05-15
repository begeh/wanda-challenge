import React from 'react';

import {useHistory} from "react-router-dom";

import filterFriends from '../helpers/filterFriends';

export default function TableItem(props){
  let history = useHistory();
  const {name, longUrl, shortUrl, friends} = props.user;
  const{list} = props;

  const handleClick = (e) =>{
    e.preventDefault();
    const friendList = filterFriends(friends, list);
    history.push({pathname: "/profile", state: {user: props.user, list: list, friendList: friendList}})
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
    </tr>
  )
}
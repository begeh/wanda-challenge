import React from 'react';

import {Button} from "react-bootstrap";

import {useHistory} from "react-router-dom";

export default function TableItem(props){
  let history = useHistory();
  return(
    <tr onClick={()=>history.push({pathname: "/profile", state: props})}>
      <td>{props.name}</td>
      <td>
        <a href={props.longUrl}>
          {props.shortUrl}
        </a>
      </td>
      <td>{props.friends.length}</td>
      <td>
        <Button variant="primary">Add Friend</Button>
      </td>
    </tr>
  )
}
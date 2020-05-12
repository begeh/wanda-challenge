import React from 'react';

import {Button} from "react-bootstrap";

export default function TableItem(props){
  return(
    <tr>
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
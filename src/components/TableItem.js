import React from 'react';

import {Button} from "react-bootstrap";

import {useHistory} from "react-router-dom";

export default function TableItem(props){
  let history = useHistory();
  const {name, longUrl, shortUrl, friends} = props;
  return(
    <tr onClick={()=>history.push({pathname: "/profile", state: props})}>
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
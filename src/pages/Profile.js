import React from 'react';
import "../App.css";

import {useHistory} from "react-router-dom";

import {Card, Button} from "react-bootstrap";

export default function Profile(props) {
  let history = useHistory();
  const {name, longUrl, shortUrl, friends, headings} = props.location.state;

  console.log(headings);

  return(
    <Card className="profile text-center">
      <Card.Header>{name}</Card.Header>
      <Card.Body>
        <Card.Title>
          Website URL: <a href={longUrl}>{longUrl}</a>
        </Card.Title>
        <Card.Title>
          Shortened URL: {shortUrl}
        </Card.Title>
        <Card.Title>
          Headings:
          {
            headings ? 
            <ul>
            {
              headings.map((heading, index) =>(
                <li>{heading}</li>
              ))
            }
            </ul>
            : null
          }
          
        </Card.Title>
        <Button onClick={() => history.push("/")}variant="primary">Home</Button>
      </Card.Body>
      <Card.Footer className="text-muted">
        <p>Search Friends</p>
      <input id="search" className="input" type="textarea" />
      </Card.Footer>
    </Card>
  )
}
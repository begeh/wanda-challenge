import React from 'react';
import "../App.css";

import {useHistory, Link} from "react-router-dom";

import {Card, Button} from "react-bootstrap";

export default function Profile(props) {
  let history = useHistory();
  const {name, longUrl, shortUrl, headings, friendList} = props.location.state;

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
          <u>Headings</u>:
          {
            headings ? 
            <ul className="profile-list">
            {
              headings.map((heading, index) =>(
                <li key={index}>{heading}</li>
              ))
            }
            </ul>
            : null
          }
          
        </Card.Title>
        <Card.Title>
          <u>Friends</u>:
          {
            friendList ?
            <ul className="profile-list">
            {
              friendList.map((friend, index) =>(
                <Link to="/">
                  <li key={index}>{friend.name}</li>
                </Link>
              ))
            }
            </ul>
            : null
          }
        </Card.Title>
        <Button onClick={() => history.push("/")}variant="primary">Home</Button>
      </Card.Body>
      <Card.Footer className="text-muted">
        <p>Search for Expert</p>
      <input id="search" className="input" type="textarea" />
      </Card.Footer>
    </Card>
  )
}
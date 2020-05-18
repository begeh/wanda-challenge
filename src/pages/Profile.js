import React, {useState, useEffect} from 'react';
import "../App.css";

import {useHistory} from "react-router-dom";

import {Card, Button, ListGroup, ListGroupItem} from "react-bootstrap";

import filterFriends from '../helpers/filterFriends';

import FriendSearchItem from '../components/FriendSearchItem';

export default function Profile(props) {
  let history = useHistory();
  const {id, name, longUrl, shortUrl, headings, friends} = props.location.state.user;
  const  {list, friendList} = props.location.state;

  const[friend, setFriend] = useState("");
  const [searchFriends, setSearchFriends] = useState([]);

  const[topic, setTopic] = useState("");
  const [searchTopic, setSearchTopic] = useState([]);

  const notFriends = list.filter(user => !friends.includes(user.id)&& user.id !== id);

  useEffect(()=>{
    const search = [];
    for(let user of notFriends){
      if(user.name.toLowerCase().includes(friend.toLowerCase())){
        search.push(user);
      }
    }
    setSearchFriends(search);

  },[friend])

  useEffect(()=>{
    const search = []
    const splitTopic = topic.toLowerCase().split(" ");
    for(let user of notFriends){
      const joinedHeadings = user.headings.join("").toLowerCase();
      let check = 0;
      for(let item of splitTopic){
        if(joinedHeadings.includes(item)){
          check++
        }
      }
      if(check === splitTopic.length){
        search.push(user);
      }
    }
    
    setSearchTopic(search);

  },[topic])

  const friendRedirect = (e, friend) =>{
    e.preventDefault();
    setSearchTopic([]);
    setSearchFriends([]);
    setTopic("");
    setFriend("");
    history.push({pathname: "/profile", state: {user: friend, list: list, friendList: filterFriends(friend.friends, list)}})
  }

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
            headings.length !== 0 && headings[0] !== "Error: Invalid URL" ? 
            <ul className="profile-list">
            {
              headings.map((heading, index) =>(
                <li key={index}>{heading}</li>
              ))
            }
            </ul> :
             (
              headings[0] !== "Error: Invalid URL" ?
              <p className="error">No Headings Found</p>
              : <p className="error">Error: Invalid URL Submitted</p>
              )
          }
          
        </Card.Title>
        <Card.Title>
          <u>Friends</u>:
          {
            friendList ?
            <ul className="profile-list">
            {
              friendList.map((friend, index) =>(
                <a key={index}  href="/profile" onClick={(e)=> friendRedirect(e, friend)}>
                  <li>{friend.name}</li>
                </a>
              ))
            }
            </ul>
            : null
          }
        </Card.Title>
        <Button onClick={() => history.push("/")}variant="primary">Home</Button>
      </Card.Body>
      <Card.Footer className="text-muted">
        <p>Add a Friend</p>
        <input 
          className="input" 
          type="textarea" 
          placeholder="Search by Name"
          value={friend}
          onChange={e => setFriend(e.target.value)}
        />
        <div>
          {
            friend ?
            <ListGroup className="search">
              {
                searchFriends.map((friend, index) => (
                  <FriendSearchItem 
                  key={index}
                  friend={friend} 
                  user={props.location.state.user}
                  list={list}
                  />
                ))
              }
            </ListGroup>
            : null
          } 
        </div>
      </Card.Footer>
      <Card.Footer className="text-muted">
        <p>Search for Expert</p>
        <input
          className="input"
          type="textarea" 
          placeholder="Search by Topic"
          value={topic}
          onChange={e => setTopic(e.target.value)}
        />
        <div>
        {
            topic ?
            <ListGroup className="search">
              {
                searchTopic.map((user, index) => (
                  <ListGroupItem key={index} onClick={(e)=> friendRedirect(e, user)}>
                    <a href="/profile">
                      {user.name}
                    </a>
                  </ListGroupItem>
                ))
              }
            </ListGroup>
            : null
          }
        </div>
      </Card.Footer>
    </Card>
  )
}
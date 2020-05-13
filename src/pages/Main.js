import React, {useState, Fragment} from 'react';

import { Table, Button } from 'react-bootstrap';

import db from "../db.json";

import TableItem from "../components/TableItem";

import axios from 'axios';

const request = require("request");

export default function Main(props){

  const experts = Object.values(db);

  let expertsList = experts;
  if(props.list){
    expertsList = experts;
  }
  const [name, setName] = useState("");
  const [url, setUrl] = useState(""); 
  const [list, setList] = useState(expertsList);
  const [show, setShow] = useState(false);

  
  const handleSubmit = async (event) => {

    // await axios.post("http://localhost:8080/header",{name: name, url: url}).then(res => console.log(res));

    // // console.log(api);

    event.preventDefault();

    if(!name || !url){
      return;
    }

    const urlCheck = url.split(":");
    let longUrl = url;

    if(urlCheck[0] !== "https" && urlCheck[0] !== "http"){
      longUrl = `https://${url}`;
    }

    const linkRequest = {
    destination: longUrl,
    }

    const requestHeaders = {
      "Content-Type": "application/json",
      "apikey": "e12bafdd5ff24baaba855383fb988dbd",
    }

    await request({
        uri: "https://api.rebrandly.com/v1/links",
        method: "POST",
        body: JSON.stringify(linkRequest),
        headers: requestHeaders
    }, async (err, response, body) => {
      const link = JSON.parse(body);
      console.log(`Long URL was ${link.destination}, short URL is ${link.shortUrl}`);

      const newUser ={
        "id": list.length,
        "name": name,
        "longUrl": longUrl,
        "shortUrl": link.shortUrl,
        "friends": [],
        "headings": []
      }

     await request({
        uri: "http://localhost:8080/data",
        method: "POST",
        body: JSON.stringify(newUser),
        headers: {
          "Content-Type": "application/json",
          'Access-Control-Allow-Origin': 'http://localhost:8080',
          "Access-Control-Allow-Methods": "POST",
          }
    }, async (err, response, body) => {
      if(err){
        console.log("Success")
      } else{
        console.log("Failure");
      }
    })

      setList([...list, newUser]);
      setName("");
      setUrl("");
    })

  }
  
  return(
    <>
      <h1>Expert Search</h1>
        <p>
          Find an expert
        </p>
        <input id="search" className="input" type="textarea" />
        <Button onClick={e => {
          if(show){
            setShow(false)
          } else{
            setShow(true);
          }
        }} className= "new-user-button" variant="secondary" size="lg">
          {show ? "Close" : "Register New User"}
        </Button>

        {
          show ?  
          <form method="GET" action="/header" className="add-user" onSubmit={(event)=> handleSubmit(event)}>
            <input placeholder="Enter Name" className="input" type="textarea" value={name} onChange={e => setName(e.target.value)} />
            <input placeholder="Enter Website URL" className="input" type="textarea" onChange={e => setUrl(e.target.value)} value={url}/>
            <input type="submit" className= "btn btn-primary register" value="Submit" />
          </form>
        : null
        }
        
        <Table className="table" striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Name</th>
              <th>Short URL</th>
              <th>No. of Friends</th>
              <th>
              </th>
            </tr>
          </thead>
          <tbody>
              {
                list.map((expert, index) => (
                  <TableItem 
                    key={index}
                    name={expert.name}
                    shortUrl={expert.shortUrl}
                    friends={expert.friends}
                    longUrl={expert.longUrl}
                  />
                ))
              }
          </tbody>
        </Table>
    </>
  )
}
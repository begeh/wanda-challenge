import React, {useState, Fragment} from 'react';

import { Table, Button } from 'react-bootstrap';

import status from "../status.png";

import db from "../db.json";

import TableItem from "../components/TableItem";

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
  const [load, setLoad] = useState(false);

  
  const handleSubmit = async (event) => {
    event.preventDefault();

    if(!name || !url){
      return;
    }

    setShow(false);
    setLoad(true);

    const urlCheck = url.split(":");
    let longUrl = url;

    if(urlCheck[0] !== "https" && urlCheck[0] !== "http"){
      longUrl = `http://${url}`;
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
      if(err){
        return;
      }
      const link = JSON.parse(body);
      console.log(`Long URL was ${link.destination}, short URL is ${link.shortUrl}`);

      const newUser ={
        "id": list.length + 1,
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
          return;
        } else{
          setLoad(false);
          setList([...list, newUser]);
          setName("");
          setUrl("");
        }
      })
    })
  }
  
  return(
    <>
      <h1>Expert Search</h1>
        <p className="subhead">
          Find an expert
        </p>
        <Button onClick={e => {
          if(show){
            setShow(false)
          } else{
            setShow(true);
          }
        }} className= "new-user-button" variant="secondary" size="lg">
          {show ? "Close" : "Register New User"}
        </Button>
        {load ?
          <img
            className="load-image"
            src={status}
            alt="Loading"
          />
          : null
        }

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
            </tr>
          </thead>
          <tbody>
              {
                list.map((expert, index) => (
                  <TableItem 
                    key={index}
                    user={expert}
                    list={list}
                  />
                ))
              }
          </tbody>
        </Table>
    </>
  )
}
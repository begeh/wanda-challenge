import React, {useState, useEffect} from 'react';

import { Table, Button } from 'react-bootstrap';

import experts from "../experts.json";

import TableItem from "../components/TableItem";

export default function Main(props){
  const [name, setName] = useState(null);
  const [url, setUrl] = useState(null); 
  const [list, setList] = useState(experts);
  const [show, setShow] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if(!name || !url){
      return;
    }

    const newUser ={
      "id": list.length,
      "name": name,
      "longUrl": url,
      "shortUrl": null,
      "friends": [],
      "headings": []
    }
    setList([...list, newUser]);
    setName("");
    setUrl("");

  }
  
  return(
    <div className="App">
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
          Register New User
        </Button>

        {
          show ?  
          <form className="add-user" onSubmit={(event)=> handleSubmit(event)}>
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
    </div>
  )
}
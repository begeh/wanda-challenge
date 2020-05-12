import React from 'react';

import { Table, Button } from 'react-bootstrap';

import experts from "../experts.json";

import TableItem from "../components/TableItem";

export default function Main(){
  return(
    <div className="App">
      <h1>Expert Search</h1>
        <p>
          Find an expert
        </p>
        <input className="search" type="textarea" />
        <Button className= "new-user-button" variant="secondary" size="lg">
          Register New User
        </Button>
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
                experts.map(expert => (
                  <TableItem 
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
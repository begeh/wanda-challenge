const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
const cors = require('cors');

app.use(express.static(path.join(__dirname, 'build')));
app.use(cors());
app.use(bodyParser.json());

const {db} = require("./db");

const {scraper} = require('./scraper');

app.get('/ping', (req, res) => {
 return res.send('pong');
});

app.get('/', (req, res) => {
  return res.send('Wanda Challenge API');
});

app.get('/header', async (req, res) => {
  const longURL = 'https://en.m.wikipedia.org/wiki/List_of_presidents_of_the_United_States';
  scraper(longURL).then(response => res.send(response))
});

app.get("/data", async (req, res)=>{
  res.json(db.getState());
})

app.post("/data", async (req,res)=>{
  const longUrl = req.body.longUrl;
  let tags = await scraper(longUrl).then(response => response);
  console.log(tags);
  if(tags.statusCode && tags.statusCode === 403){
    tags = ["Error: 403 Forbidden Access"] 
  } else if(tags.message){
    tags = ["Error: Could not reach site"] 
  }
  const user = {...req.body, headings: tags};
  db.set(Object.keys(db.getState()).length + 1, user).write();
})

app.post("/addfriend", async (req,res)=>{
  const {user, friend} = req.body;
  db.set(user.id, user).write();
  db.set(friend.id, friend).write();
})

app.listen(process.env.PORT || 8080,  () => {
  console.log(`Listening on port 8080...`);
});
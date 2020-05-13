const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
const cors = require('cors');

app.use(express.static(path.join(__dirname, 'build')));
app.use(cors());
app.use(bodyParser.json());

const {db} = require("./db/db");

const rp = require('request-promise');
const cheerio = require('cheerio');

async function scraper(url){
  return await rp(url)
    .then(function(html){
      const $ = cheerio.load(html);
      const headers = $("h1, h2, h3, h4, h5, h6");
      const arr = [];
      headers.each(function(){
        arr.push($(this).text());
      });
      return arr.filter(item => item && item.length !== " ");
    })
    .catch(function(err){
      return err
    });
  }

app.get('/ping', (req, res) => {
 return res.send('pong');
});

app.get('/', (req, res) => {
  // res.sendFile(path.join(__dirname, 'build', 'index.html'));
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
  console.log(longUrl);
  const tags = await scraper(longUrl).then(response => response)
  console.log(tags);
  const user = {...req.body, header: tags};
  console.log(user);
  db.set(Object.keys(db.getState()).length, user).write();
})

app.listen(process.env.PORT || 8080,  () => {
  console.log(`Listening on port 8080...`);
});
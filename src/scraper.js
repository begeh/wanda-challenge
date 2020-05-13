const rp = require('request-promise');
const cheerio = require('cheerio');
const url = 'https://en.m.wikipedia.org/wiki/List_of_presidents_of_the_United_States';

rp(url)
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
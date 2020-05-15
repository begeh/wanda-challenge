const rp = require('request-promise');
const cheerio = require('cheerio');

async function scraper(url){

const { getUserAgent } = require("universal-user-agent");
  
const userAgent = getUserAgent();

const options = {
  uri: url,
  transform: function (body) {
    return cheerio.load(body);
  },
  headers: {
    'User-Agent': userAgent
}
};
return await rp(options)
  .then(function($){
    const headers = $("h1, h2, h3");
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

module.exports = {scraper};
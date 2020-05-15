// const rp = require('request-promise');
// const cheerio = require('cheerio');

const Nightmare = require('nightmare')
const nightmare = Nightmare({ show: false})

async function scraper(url){
  
  return await nightmare
  .goto(url)
  .evaluate(() => Array.from(document.querySelectorAll('h1, h2, h3')).map(item => item.innerText))
  .then(result => result.filter(item => item !== "" && item !== " "))
  .catch(error => {
    console.error('Search failed:', error)
  })

// const options = {
//   uri: url,
//   transform: function (body) {
//     return cheerio.load(body);
//   }
// };
// return await rp(options)
//   .then(function($){
//     const headers = $("h1, h2, h3");
//     const arr = [];
//     headers.each(function(){
//       arr.push($(this).text());
//     });
//     return arr.filter(item => item && item.length !== " ");
//   })
//   .catch(function(err){
//     return err
//   });
}

module.exports = {scraper};
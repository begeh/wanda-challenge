const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter)
const experts = require("./experts.json")
 
// Set some defaults
db.defaults(experts)
  .write()

function reset() {
    db.setState(experts)
      .write()
  }

reset();

module.exports = {db};
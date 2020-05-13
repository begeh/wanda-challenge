const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter)
const experts = require("./experts.json")
 
// Set some defaults
db.defaults(experts)
  .write()

module.exports = {db};
const path = require('path');
const fs = require('fs')
// =======================================
const mongoose = require('mongoose')
// =======================================
const env = process.env.NODE_ENV || 'development';
const basename = path.basename(__filename);

const config = require('../config/mongoConfig')[env];

mongoose
  .connect(`mongodb://${config.host}:${config.port}/${config.dbName}`)
  .then(() => console.log(`Connection to DB <<< ${config.dbName} >>> is Ok`))
  .catch((err) => console.log(err))

const dbMongo = {};

fs.readdirSync(__dirname)
  .filter((fileName) => {
    return (
      fileName.indexOf('.') !== 0 &&
      fileName !== basename &&
      fileName.slice(-3) === '.js'
    )
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file)); //'models/players.js'
    dbMongo[model.modelName] = model; //{Player: modelPlayer}
  })

  dbMongo.mongoose = mongoose;

  module.exports = dbMongo;
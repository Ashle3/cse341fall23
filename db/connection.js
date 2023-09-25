//dotenv package installed

//lets you access your .env file
const dotenv = require('dotenv');
//config() Loads .env file contents into process.env by default.
dotenv.config();
//create an instance of MongoClient
const MongoClient = require('mongodb').MongoClient;

let _db;

const initDb = (callback) => {
    if (_db) {
      console.log('Db is already initialized!');
      return callback(null, _db); ///////////error used to be null
    }
    MongoClient.connect(process.env.MONGODB_URI)
      .then((client) => {
        _db = client;
        callback(null, _db);
      })
      .catch((err) => {
        callback(err);
      });
  };
  
const getDb = () => {
    if (!_db) {
        throw Error('Db not initialized');
    }   
    return _db;
};
  
module.exports = {
    initDb,
    getDb,
};
const mongodb = require('../db/connection');
//const { put } = require('../routes/contacts');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
    const result = await mongodb.getDb().db('contacts').collection('contacts').find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  };
  
const getSingle = async (req, res, next) => {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db('contacts')
      .collection('contacts')
      .find({ _id: userId });
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    });
};

//functions go here
// put
// res.status(201)

// const deleteContact = async(req, res) => {
//   const contact = req.params.id;
//   const result = await mongodb.getDb().db('contacts').collection('contacts').dropIndex('contact');
//   contacts = contacts.filter(

//   )
// }
module.exports = { getAll, getSingle };
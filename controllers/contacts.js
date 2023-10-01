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

const addContact = async (req, res) => {
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };
  const result = await mongodb.getDb().db('contacts').collection('contacts').insertOne(contact);
  res.status(201).json(result);
  res.setHeader('Content-Type', 'application/json');
};

const deleteContact = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db('contacts')
    .collection('contacts')
    .deleteOne({ _id: userId });
  res.setHeader('Content-Type', 'application/json');
  if (result.acknowledged){
    res.status(200).json(result)
  } else {
    res.status(500).json(response.error || 'An error occurred while deleting the contact.');
  }
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
module.exports = { getAll, getSingle, addContact, deleteContact };
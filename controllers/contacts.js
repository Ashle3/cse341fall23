const mongodb = require('../db/connection');
//const { put } = require('../routes/contacts');
const ObjectId = require('mongodb').ObjectId;

const getAll = (req, res) => {
    mongodb
      .getDb()
      .db('contacts')
      .collection('contacts')
      .find()
      .toArray((err, lists) => {
        if (err) {
          res.status(400).json({ message: err });
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
      });
  };
  
const getSingle = (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid contact id.');
  }
  const userId = new ObjectId(req.params.id);
  mongodb
    .getDb()
    .db('contacts')
    .collection('contacts')
    .find({ _id: userId })
    .toArray((err, result) => {
      if (err) {
        res.status(400).json({ message: err });
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(result[0]);
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
  if(result.acknowledged){
    res.status(201).json(result);
  } else {
    res.status(500).json(response.error || 'An error occurred while creating the contact.');
  }
};

const updateContact = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid contact id to update a contact.');
  }
  const userId = new ObjectId(req.params.id);
  const updatedContact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };
  const result = await mongodb.getDb().db('contacts').collection('contacts').replaceOne({ _id: userId }, updatedContact);
  console.log(result)
  if(result.modifiedCount > 0){
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'An error occurred while updating the contact.');
  }
};

const deleteContact = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid contact id to delete a contact.');
  }
  const userId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db('contacts')
    .collection('contacts')
    .deleteOne({ _id: userId });
  if (result.deleteCount > 0){
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'An error occurred while deleting the contact.');
  }
};

module.exports = { getAll, getSingle, addContact, updateContact, deleteContact };
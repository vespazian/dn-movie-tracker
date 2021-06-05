const express = require('express');
const User = require('../models/User');

const router = express.Router();

//întoarce toți utilizatorii
router.get('/', async (req, res) => {
  try{
  const user = await User.find();
  // find will return all user's object or null
  
    res.json(user);
  } catch(error) {
  
    res.status(404).send('User not found');
  }
 
});

//întoarce un singur utilizator
router.get('/:email', async (req, res) => {
  try{
  const user = await User.findOne({ email: req.params.email });
  // findOne will return the found user object or null
  
    res.json(user);
  } catch(error) {
  
    res.status(404).send('User not found');
  }
 
});

//adaugă un utilizator
router.post('/', async (req, res) => {
  // create will try to create a new user, but can throw an error if there is already an user with the same email (unique param in the schema)
  try {
    const user = await User.create({ email: req.body.email} );
    res.send(user);
  } catch (error) {
    res.status(400).send(error + "pe linia de post-create");
  }
});

//delete by _id
router.delete('/:_id', async (req, res) => {
  try{
  const user = await User.findByIdAndRemove({ _id: req.params._id });
  // findByIdAndRemove find and remove
  
    res.send(user);
  } catch(error) {
  
    res.status(404).send( error + 'User not found to delete');
  }
 
});

//șterge un utilizator // delete by email
router.delete('/email/:email', async (req, res) => {
  try{
  const user = await User.findOneAndRemove({ email: req.params.email });
  // findByIdAndRemove find and remove
  
    res.send(user);
  } catch(error) {
  
    res.status(404).send( error + 'User not found to delete');
  }
 
});

module.exports = router;

const express = require("express");
const User = require("../models/User");

const router = express.Router();

//întoarce toți utilizatorii
router.get("/", async (req, res) => {
  try {
    const user = await User.find();

    res.json(user);
  } catch (error) {
    res.status(404).send("User not found");
  }
});

//adaugă un utilizator
router.post("/", async (req, res) => {
  try {
    const user = await User.create({
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      city: req.body.city,
      about: req.body.about,
      birthday: req.body.birthday
    });
    res.send(user);
  } catch (error) {
    res.status(400).send(error + "pe linia de post-create");
  }
});

//întoarce un singur utilizator
router.get("/:email", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    // findOne will return the found user object or null

    res.json(user);
  } catch (error) {
    res.status(404).send("User not found");
  }
});

//modifică datele unui utilizator
router.put("/:email", async (req, res) => {
  try {
    const user = await User.findOneAndReplace({email: req.params.email}, req.body
    );
    res.json( user );
  } catch (error) {
    res.status(400).send(error + "pe ruta put - findOneAndReplace");
  }
});

//suprascrie un utilizator
router.patch("/:email", async (req, res) => {
  try {
    const modif = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      city: req.body.city,
      about: req.body.about,
      birthday: req.body.birthday
    }

    const user = await User.findOneAndUpdate({email: req.params.email}, modif
    );
    res.json( user );
  } catch (error) {
    res.status(400).send(error + "pe ruta patch -findOneAndUpdate ");
  }
});

//șterge un utilizator // delete by email
router.delete("/:email", async (req, res) => {
  try {
    const user = await User.findOneAndRemove({ email: req.params.email });
    // findByIdAndRemove find and remove
    if(user) {
    res.send(user);}
    else {
      res.send("userul nu a fost gasit")
    }
  } catch (error) {
    res.status(404).send(error + "User not found to delete");
  }
});


/* delete by _id
router.delete("/:_id", async (req, res) => {
  try {
    const user = await User.findByIdAndRemove({ _id: req.params._id });
    // findByIdAndRemove find and remove

    res.send(user);
  } catch (error) {
    res.status(404).send(error + "User not found to delete");
  }
});

with help from https://www.djamware.com/post/59faec0a80aca7739224ee1f/building-crud-web-application-using-mern-stack#routes-rest-api
*/
module.exports = router;

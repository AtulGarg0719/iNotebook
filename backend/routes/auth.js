const express = require('express');
const router = express.Router();
const User =require('../models/User');
const { body, validationResult } = require('express-validator');


// Route For Create User by Post Method
router.post('/',[
  body('name','Enter Name Please').isLength({ min: 5 }),
  body('email','Enter valid Email').isEmail(),
  body('password').isLength({ min: 5 }),
], (req, res) => {
  // console.log(req.body);
  // const user = User(req.body);
  // user.save()

  // res.send(req.body);

  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    }).then(user => res.json(user)).catch(err =>{console.log(err)
    res.json({error:'Please Enter unique email',message:err.message})});
    //res.send("Data save successfully!");
  });

module.exports = router
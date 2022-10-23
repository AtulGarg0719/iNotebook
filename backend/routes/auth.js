const express = require('express');
const router = express.Router();
const User =require('../models/User');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');
const JWT_SECRET = 'atuljwttoken';


// Route For Create User by Post Method  /api/auth
router.post('/createuser',[
  body('name','Enter Name Please').isLength({ min: 5 }),
  body('email','Enter valid Email').isEmail(),
  body('password').isLength({ min: 5 }),
], async (req, res) => {
  // console.log(req.body);
  // const user = User(req.body);
  // user.save()

  // res.send(req.body);

  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // Check where user email already Exits or not 
    try{
      let user = await User.findOne({email:req.body.email});
      console.log(user)
      if(user){
        return res.status(400).json({error : "User with this Email already exits"});
      }
      const salt = await bcrypt.genSaltSync(10);
      secPass =  await bcrypt.hash(req.body.password,salt);
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });
      const data ={
        user:{
          id:user.id
        }
      }

      const authToken = jwt.sign(data,JWT_SECRET);
      res.json({authToken});
      //res.json({"Success":"Your Data is saved successfully"});
    } 
    catch (error){
      console.error(error.message);
      return res.status(500).send('Some error occur');
    }
    
    // .then(user => res.json(user)).catch(err =>{console.log(err)
    // res.json({error:'Please Enter unique email',message:err.message})});
    //res.send("Data save successfully!");
  });

module.exports = router
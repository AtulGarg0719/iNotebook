const express = require('express');
const router = express.Router();
const User =require('../models/User');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');
const { validate } = require('../models/User');
const JWT_SECRET = 'atuljwttoken';

var fetchuser = require('../middleware/fetchuser');


// 1- Route For Create User by Post Method  /api/auth/createuser
router.post('/createuser',[
  body('name','Enter Name Please').isLength({ min: 4 }),
  body('email','Enter valid Email').isEmail(),
  body('password').isLength({ min: 5 }),
  ], async (req, res) => {

  //without validate save method uses
  // console.log(req.body);
  // const user = User(req.body);
  // user.save()
  // res.send(req.body);


    // if error then send bad request
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
}
);

// 2-  Authanticate a user  or login user  by Post Method /api/auth/login

router.post('/login',[
    body('email','Enter valid Email').isEmail(),
    body('password','password cannot be blank').exists(),
    // body('password').isLength({ min: 5 }),
  ], 
  async (req, res) => {
    // if error then send bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {email,password} = req.body;
    try{
      let user = await User.findOne({email});
      if(!user){
        return res.status(400).json({'error':"User does not exits"});
      }

      const passwordCompare = await bcrypt.compare(password , user.password);
      if(!passwordCompare){
        return res.status(400).json({'error':"Please check Your password"});
      }
      const data ={
        user:{
          id:user.id
        }
      }

      const authToken = jwt.sign(data,JWT_SECRET);
      res.json({authToken});

    }
    catch(error){
      console.error(error.message);
      return res.status(500).send('Internal Server Error');

    }

  }
  
); 

// 3- get loggedin user details by Post Method  /api/auth/getuser 

router.post('/getuser',fetchuser ,async (req, res) => {

  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
      console.error(error.message);
      return res.status(500).send('Internal Server Error');
  }

  }
);




module.exports = router
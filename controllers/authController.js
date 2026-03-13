const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

async function register(req, res){

    const {username, password} = req.body;

  if(password.length < 6){
    return res.status(400).json({
      message:"Password must be at least 6 characters"
    });
  }

  const existingUser = await User.findOne({ username });

  if(existingUser){
    return res.status(400).json({
      message:"Username already exists"
    });
  }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        username,
        password: hashedPassword
    });

    res.json(user);
}

async function login(req, res){

  console.log(req.body);


    const {username, password} = req.body;

    const user = await User.findOne({username});

    if(!user){
        return res.status(400).json({message:"User not found"});
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch){
        return res.status(400).json({message:"Wrong password"});
    }

    const token = jwt.sign(
        {id: user._id},
        process.env.JWT_SECRET,
        {expiresIn: "30d"}
    );

    res.json({token});
}

module.exports ={register, login};

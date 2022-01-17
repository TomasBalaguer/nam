import User from './../models/User';
import jwt from "jsonwebtoken";
import config from './../config'
import Role from '../models/Role';

export const signUp = async (req, res) => {
    const { name, lastname, email, username, password, roles } = req.body;
    
    const userCheck = await User.find({email});

    const newUser = new User({
        name,
        lastname,
        email,
        username,
        password: await User.encryptPassword(password)
    })

    if(roles){
        const foundRoles = await Role.find({name: {$in: roles}})
        newUser.roles = foundRoles.map(role => role._id);       
    }else{
        const role = await Role.findOne({name: "user"});
        console.log(role)
        newUser.roles = [role._id]
    }

    const savedUser = await newUser.save();

    const token = jwt.sign({id: savedUser._id}, config.SECRET, {
        expiresIn: 31556952 // 1 Year
    })

    res.json({token})
}

export const signIn = async (req, res) => {
    const { email, password } = req.body;

    const userCheck = await User.findOne({email: email}).populate("roles");
    console.log(userCheck);
    if(!userCheck)  return res.status(400).json({message: "User or Password Incorrect"});

    const checkPassword = await User.comparePassword(password, userCheck.password);

    if(!checkPassword) return res.status(401).json({message: "User or Password Incorrect"});
    
    const token = jwt.sign({id: userCheck._id}, config.SECRET, {
        expiresIn: 31556952 // 1 Year
    })

    res.json({token})

}
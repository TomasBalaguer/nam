import User from './../models/User';
import jwt from "jsonwebtoken";
import config from './../config'
import Role from '../models/Role';
import Group from '../models/Group';

export const signUp = async (req, res) => {
    const { name, lastname, email, username, password, roles, groups } = req.body;
    
    const userCheck = await User.find({email});

    const newUser = new User({
        name,
        lastname,
        email: email.toLowerCase(),
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
    
    if(groups){
        const foundGroups = await Group.find({name: {$in: groups}});
        newUser.groups = foundGroups.map(group => group._id)
    }else{
        const group = await Group.findOne({name: "ps"});
        newUser.groups = [group._id]
    }

    const savedUser = await newUser.save();

    const token = jwt.sign({id: savedUser._id}, config.SECRET, {
        expiresIn: 31556952 // 1 Year
    })

    res.json({token})
}

export const signIn = async (req, res) => {
    const { email, password } = req.body;

    const userCheck = await User.findOne({email: email.toLowerCase()}).populate("roles");
    console.log(userCheck);
    if(!userCheck)  return res.status(400).json({message: "User or Password Incorrect"});

    const checkPassword = await User.comparePassword(password, userCheck.password);

    if(!checkPassword) return res.status(401).json({message: "User or Password Incorrect"});
    
    const token = jwt.sign({id: userCheck._id}, config.SECRET, {
        expiresIn: 31556952 // 1 Year
    })

    res.json({token: token, user: userCheck})

}

export const getUser = async (req, res) => {
    const user = await User.findById(req.userId).populate(['roles', 'groups']);

    res.json({user});
}
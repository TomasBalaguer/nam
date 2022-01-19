// export const checkRolesExistance = (req, res, next) => {
//     if(req.body.roles) {
//         for (let index = 0; index < req.body.roles.length; index++) {                        
//         }
//     }
// }

import User from "../models/User"


export const verifyDuplicateEmail = async (req, res, next) => {
    console.log(req.body.email);
    const email = await User.findOne({email: req.body.email});
    console.log(email)
    if(email) return res.status(400).json({message: "Email already exists!"})

    next();
}
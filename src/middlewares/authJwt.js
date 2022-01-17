import jwt from "jsonwebtoken";
import config from "./../config";
import User from "./../models/User";
import Role from "./../models/Role";

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];

    if (!token) return res.status(403).json({ message: "No token provided" });

    const decoded = jwt.verify(token, config.SECRET);
    req.userId = decoded.id;

    const user = await User.findById(req.userId, { password: 0 });
    if (!user) return res.status(404).json({ message: "No user found" });

    next();
  } catch (error) {
    return res.status(404).json({ message: "Unauthorized" });
  }
};

export const isAdmin = async (req, res, next) => {
     const user = await User.findById(req.userId).populate("roles");

     for (let index = 0; index < user.roles.length; index++) {
         if(user.roles[index].name === "admin")
         {
             next();
             return;
         }
         
     }
     
     return res.status(403).json({message: "Require Admin role"})

}

export const isTrainer = async (req, res, next) => {
    const user = await User.findById(req.userId).populate("roles");

    for (let index = 0; index < user.roles.length; index++) {
        if(user.roles[index].name === "trainer")
        {
            next();
            return;
        }
        
    }
    
    return res.status(403).json({message: "Require Trainer role"})
}
import User from './../models/User'


export const createUser = async (req, res) => {
    const { name, lastname, username, email, password, roles } = req.body

    const newUser = new User({
        name, lastname, username, email, password, roles
    })

    const saverdUser = await newUser.save();
    res.json("create user")
}
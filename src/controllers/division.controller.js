import Division from '../models/Division';
import User from './../models/User'


export const cerateDivision = async (req, res) => {
    const { name, slug } = req.body

    const newDivision = new Division({
        name, slug
    })

    const savedDivision = await newDivision.save();
    res.status(200).json(savedDivision)
}

export const getDivisions = async (req, res) => {
    const divisions = await Division.find();
    res.status(200).json(divisions)
}
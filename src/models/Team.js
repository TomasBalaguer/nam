import { Schema, model } from "mongoose";


const teamSchema = new Schema({
    name: String,
    address: String,
    largeName: String,
    image: String
}, {
    versionKey: false
})

export default model('Team', teamSchema);
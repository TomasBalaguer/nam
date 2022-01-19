import { Schema, model } from "mongoose";


const groupSchema = new Schema({
    name: String
}, {
    versionKey: false
})

export default model('Group', groupSchema);
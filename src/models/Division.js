import { Schema, model } from "mongoose";


const divisionSchema = new Schema({
    name: String,
    slug: String
}, {
    versionKey: false
})

export default model('Division', divisionSchema);
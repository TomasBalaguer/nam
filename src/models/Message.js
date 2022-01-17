import { Schema, model } from "mongoose";

const messageSchema = new Schema({
    title: String,
    message: String,
    group: Array
}, {
    timestamps: true,
    versionKey: false
})

export default model('Message', messageSchema);
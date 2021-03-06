import { Schema, model } from "mongoose";

const messageSchema = new Schema({
    title: String,
    message: String,
    user: {
        ref: "User",
        type: Schema.Types.ObjectId
    },
    groups: [{
        ref: "Group",
        type: Schema.Types.ObjectId
    }]
}, {
    timestamps: true,
    versionKey: false
})

export default model('Message', messageSchema);
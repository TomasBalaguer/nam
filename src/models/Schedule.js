import { Schema, model } from "mongoose";

const scheduleSchema = new Schema({
    title: String,
    description: String,
    date: String,
    time: String,
    type: String,
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

export default model('Schedule', scheduleSchema);
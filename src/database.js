import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1/apinode",{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(db => console.log("Database connected"))
    .catch(error => console.log(error))
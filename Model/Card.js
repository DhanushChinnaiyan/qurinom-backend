const mongoose = require("mongoose")

const cardSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    userName:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    }
});

const Card = mongoose.model("cards",cardSchema)

module.exports = Card
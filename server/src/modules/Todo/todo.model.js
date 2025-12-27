const mongoose = require("mongoose")
const listSchmea = new mongoose.Schema({
   
    title: {
        type: String,
        min: 3,
        required: true
    },
    slug:{
        type: String,
    },
    description: {
        type: String,
        required: true
    },
    duedate:{
        type:Date,
        required:true
    },
    
    status:{
        type:String,
        enum:["pending","completed"],
        required:true

    }


}, {
    timestamps: true,
    autoCreate: true,
    autoIndex: true
})

const listModel = mongoose.model("List", listSchmea)

module.exports = listModel
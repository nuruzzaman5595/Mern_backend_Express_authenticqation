import mongoose from "mongoose";
 
// for message Schema
const messageSchema = new mongoose.Schema({
        role: {
            type: String,
            enum: ['user', 'assistant'],
            required: true,
    },
        text: {
            type: String,
            required: true,

        },
        

});
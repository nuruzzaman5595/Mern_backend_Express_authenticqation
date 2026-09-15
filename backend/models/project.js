import mongoose from "mongoose";
 
const messageSchema = new mongoose.Schema({
    role: {
        type: String,
        enum: ["user", "assistant"],
        required: true
    },
    text: {
        type: String,
        required: true
    }
});

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    messages: {
        type: [messageSchema],
        default: []
    }
}, { timestamps: true });

const Project = mongoose.model("Project", projectSchema);

export default Project;
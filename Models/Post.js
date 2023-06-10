import { Schema,model } from "mongoose"; 

const PostSchema = new Schema({
    date: {
        type: Date,
        default: Date.now,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }

}, {
    collection: 'posts',
    timestamps: true
});

export default model('Post',PostSchema);
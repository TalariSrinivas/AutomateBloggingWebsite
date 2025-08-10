import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
    title: String,
    content: String,
    link: String,
    imageUrl: String,
    date: { type: Date, default: Date.now }
});

export default mongoose.model('Blog', blogSchema);

const mongoose = require('mongoose');

const { Schema } = mongoose;

const blogSchema = new Schema({
    title: {
        type: String,
        maxLength: 256,
        required: true
    },
    body: {
        type: String,
        maxLength: 256,
        default: ''
    },
    photo: {
        type: String,
        maxLength: 256,
    },

    author: String,
    tags: [String],
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    updatedAt: Date,
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
});

const blogModuel = mongoose.model('Blog', blogSchema);

module.exports = blogModuel;
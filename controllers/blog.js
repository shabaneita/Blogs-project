const Blog = require('../models/Blog');

const create = (blog) => Blog.create(blog);

const getAll = (query) => Blog.find(query).exec();

const getById = ({ userid, id }) => Blog.findOne({ _id: id, userId: userid }).exec();

const editOne = ({ id, body, userid }) => Blog.findOneAndUpdate({ _id: id, userId: userid }, body, { new: true }).exec();

const deleteOne = ({ userid, id }) => Blog.findOneAndDelete({ _id: id, userId: userid }).exec();

module.exports = {
    create,
    getAll,
    getById,
    editOne,
    deleteOne
}
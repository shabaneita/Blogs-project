const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const asyncSign = promisify(jwt.sign);

const User = require('../models/User');

const create = (user) => User.create(user);

const login = async({ username, password }) => {
    //find user name
    const user = await User.findOne({ username: username }).exec();
    if (!user) {
        throw Error('UN-AUTHENTICATED');
    }
    //compare password
    const isValidpassword = await user.validatePassword(password);
    if (!isValidpassword) {
        throw Error('UN-AUTHENTICATED');
    }
    const token = await asyncSign({
        exp: Math.floor(Date.now() / 1000) + (60 * 60),
        username: user.username,
        id: user.id
    }, 'SECRITKEY');

    return {...user.toJSON(), token };
}

const getAll = () => User.find({}).exec();

const editOne = (id, data) => User.findByIdAndUpdate(id, data, { new: true }).exec();
module.exports = {
    create,
    login,
    getAll,
    editOne,
};
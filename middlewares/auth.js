const jwt = require('jsonwebtoken');
const User = require('../models/User');

const { promisify } = require('util');

const asyncVerify = promisify(jwt.verify);

const auth = async(req, res, next) => {
    const { headers: { authorization } } = req;
    if (!authorization) {
        debugger
        next(new Error('UN-AUTHENTICATED'));
    }
    try {
        const { id } = await asyncVerify(authorization, 'SECRITKEY');
        const user = await User.findById(id).exec();
        req.user = user;
        next();
    } catch (e) {
        debugger
        next(e);
    }
};

module.exports = auth;
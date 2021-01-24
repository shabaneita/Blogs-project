const express = require('express');
const { create, getAll, getById, editOne, deleteOne } = require('../controllers/blog');

const router = express.Router();


router.post('/', async(req, res, next) => {
    const { body, user: { id, username } } = req;
    // debugger
    try {
        const blog = await create({...body, userId: id, author: username });
        res.json(blog);
    } catch (e) {
        next(e);
    }
});


router.get('/', async(req, res, next) => {
    const { user: { id } } = req;
    try {
        const blogs = await getAll({ userId: id });
        res.json(blogs);
    } catch (e) {
        next(e);
    }
});

router.get('/:id', async(req, res, next) => {
    const { user: { id: userid, username }, params: { id } } = req;
    try {
        const blog = await getById({ userid, id, username });
        res.json(blog)
    } catch (e) {
        next(e);
    }
})

router.patch('/:id', async(req, res, next) => {
    const { params: { id }, body, user: { id: userid } } = req;

    try {
        const blog = await editOne({ id, userid, body });
        // debugger;
        res.json(blog)
    } catch (e) {
        console.log(e);
        next(e);
    }
})

router.delete('/:id', async(req, res, next) => {
    const { params: { id }, user: { id: userid } } = req;
    try {
        const blog = await deleteOne({ id, userid });
        res.json(blog)
    } catch (e) {
        next(e);
    }
})

module.exports = router;
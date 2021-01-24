const express = require('express');
const authMiddleware = require('../middlewares/auth');

const { create, login, getAll, editOne, } = require('../controllers/user');

const router = express.Router();

router.get('/', async(req, res, next) => {
    try {
        const users = await getAll();
        res.json(users);
    } catch (e) {
        next(e)
    }
})

router.post('/', async(req, res, next) => {
    const { body } = req;
    try {
        const user = await create(body);
        res.json(user)
    } catch (e) {
        next(e)
    }
})

router.post('/login', async(req, res, next) => {
    const { body } = req;
    try {
        const user = await login(body);
        res.json(user);
    } catch (e) {
        next(e)
    }
});

router.patch('/:id', async(req, res, next) => {
    const { params: { id }, body } = req;
    try {
        const user = await editOne(id, body);
        res.json(user);
    } catch (e) {
        next(e)
    }
});

// when user loged in

// router.patch('/edit', authMiddleware, async(req, res, next) => {
//     const { user: { id }, body } = req;
//     try {
//         const user = await edit(id, body);
//         res.json(user);
//     } catch (e) {
//         next(e)
//     }
// });


// router.delete('/delete', authMiddleware, async(req, res, next) => {
//     const { body } = req;
//     try {
//         const user = await dele(id);
//         res.json({ deleted: 'done' });
//     } catch (e) {
//         next(e)
//     }
// });
// router.post('/follow', authMiddleware, async(req, res, next) => {
//     const { body } = req;
//     try {
//         const user = await follow({ id, f_id });
//         res.json(user);
//     } catch (e) {
//         next(e)
//     }
// });












module.exports = router;
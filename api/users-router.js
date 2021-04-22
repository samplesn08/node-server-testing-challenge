const router = require('express').Router();
const Users = require('./users-model');


router.get('/', (req, res) => {
    Users.find()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
})

router.get('/:id', (req, res) => {
    const {id} = req.params;
    Users.findById(id)
        .then(user => {
            res.status(200).json(user)
        })
        .catch(err => {
            res.status(401).json({ message: err.message })
        })
})

router.post('/', (req, res) => {
    const newUser = req.body;
    Users.add(newUser)
        .then(user => {
            res.status(201).json(user)
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
})

router.put('/:id', (req, res) => {
    const {id} = req.params;
    const newInfo = req.body;
    Users.edit(id, newInfo)
        .then(user => {
            res.status(200).json(user)
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
})

router.delete('/:id', (req, res) => {
    const {id} = req.params;
    Users.remove(id)
        .then(() => {
            res.send("User deleted successfully")
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
})

module.exports = router;
const db = require('../data/db-config')

const find = () => {
    return db('users');
}

const findById = (id) => {
    return db('users')
        .where({ user_id: id }).first()
}

const add = async (newUser) => {
    const [id] = await db('users')
        .insert(newUser)
    return db('users')
        .where('user_id', id).first()
}

const edit = (id, newInfo) => {
    return db('users')
        .where('user_id', id)
        .update(newInfo)
}

const remove = (id) => {
    return db('users')
        .where('user_id', id)
        .del()
}

module.exports = {
    find,
    findById,
    add,
    edit,
    remove
}
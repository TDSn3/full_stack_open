const User = require('../models/user')

const initialUsers = [
    {
        username: 'one',
        password: '1234', // before Hashing
        name: 'test1',
    },
    {
        username: 'two',
        password: 'qwerty', // before Hashing
        name: 'test2',
    },
]

const usersInDb = async () => {
    const users = await User.find({})
    return (users.map((user) => user.toJSON()))
}

module.exports = {
    initialUsers,
    usersInDb,
}

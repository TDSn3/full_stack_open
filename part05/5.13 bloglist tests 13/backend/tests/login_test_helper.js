const jwt = require('jsonwebtoken')

const creatToken = (user) => {
    const userForToken = {
        username: user.username,
        id: user.id,
    }
    return (jwt.sign(userForToken, process.env.SECRET, { expiresIn: 60 * 60 * 24 }))
}

module.exports = {
    creatToken,
}

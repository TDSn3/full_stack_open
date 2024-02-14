require('dotenv').config()

const databaseUsername = process.env.DATABASE_USERNAME
const databasePassword = process.env.DATABASE_PASSWORD
const databaseName = process.env.DATABASE_NAME
const databaseTestName = process.env.DATABASE_TEST_NAME
const databaseUrl = (process.env.NODE_ENV === 'test')
    ? `mongodb+srv://${databaseUsername}:${databasePassword}@cluster0.eqahmbr.mongodb.net/${databaseTestName}?retryWrites=true&w=majority`
    : `mongodb+srv://${databaseUsername}:${databasePassword}@cluster0.eqahmbr.mongodb.net/${databaseName}?retryWrites=true&w=majority`
const port = process.env.PORT

module.exports = {
    databaseUsername,
    databasePassword,
    databaseName,
    databaseUrl,
    port,
}

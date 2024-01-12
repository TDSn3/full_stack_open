const mongoose = require('mongoose')

if (process.argv.length != 5 && process.argv.length != 3)
{
    console.log('need 3 or 1 arguments:')
    console.log('1) node mongo.js <password> <personName> <personNumber>')
    console.log('2) node mongo.js <password>')
    process.exit(1)
}

const password = process.argv[2]
const username = "fullstack"
const dataBaseName = "personApp"

const url = `mongodb+srv://${username}:${password}@cluster0.eqahmbr.mongodb.net/${dataBaseName}?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)
mongoose.connect(url)

const personSchema = new mongoose.Schema(
{
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length == 5)       // add a person
{
    const person = new Person(
    {
        name: process.argv[3],
        number: process.argv[4],
    })
    
    person
        .save()
        .then(result =>
        {
            console.log(`added ${result.name} number ${result.number} to phonebook`)
            mongoose.connection.close()
        })
        .catch(error =>
        {
            console.log(error)
            mongoose.connection.close()
        })
}
else if (process.argv.length == 3)  // print all person
{
    console.log('phonebook:')

    Person
        .find({})
        .then(result =>
        {
            result.forEach(personValue => { console.log(personValue) })
            mongoose.connection.close()
        })
        .catch(error =>
        {
            console.log(error)
            mongoose.connection.close()
        })
}

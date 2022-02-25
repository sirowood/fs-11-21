const mongoose = require('mongoose')


if (process.argv.length < 3) {
  console.log('node mongo.js password')
  console.log('or')
  console.log('node mongo.js password name number')
  process.exit(1)
}

const password = process.argv[2]

const url =
    `mongodb+srv://sirowood:${password}@cluster0.zz8vp.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

const addNewPerson = (name, number) => {
  const person = new Person({
    name: name,
    number: number
  })

  person.save().then(() => {
    console.log(`added ${name} ${number}`)
    mongoose.connection.close()
  })
}

const listAllPersons = () => {
  console.log('phonebook:')
  Person
    .find({})
    .then(result => {
      result.forEach(person => {
        console.log(`${person.name} ${person.number}`)
      })
      mongoose.connection.close()
    })
}

if (process.argv.length === 5) {
  addNewPerson(process.argv[3], process.argv[4])
} else if (process.argv.length === 3) {
  listAllPersons()
}
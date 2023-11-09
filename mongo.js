const mongoose = require('mongoose')

if (process.argv.length !== 2 && process.argv.length !== 4) {
  console.log(`Please input 2 arguments to view phonebook, 
or 4 arguments to add a new person`)

  process.exit(1)
}

const name = process.argv[2]
const number = process.argv[3]

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 2) {
  Person.find({}).then(persons => {
    console.log('phonebook:')
    persons.forEach(person => {
      console.log(person.name, person.number)
    })

    mongoose.connection.close()
  })
} else {
  const person = new Person({
    name,
    number,
  })

  person.save().then(() => {
    console.log(`added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
  })
}
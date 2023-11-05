const mongoose = require('mongoose')

if (process.argv.length !== 3 && process.argv.length !== 5) {
  console.log(`Please input 3 arguments to view phonebook, 
or 5 arguments to add a new person`)

  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url = 
  `mongodb+srv://inshal:${password}@cluster0.2yboitq.mongodb.net/phonebookApp?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
  Person.find({}).then(persons => {
    console.log('phonebook:');
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
  
  person.save().then(result => {
    console.log(`added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
  })
}
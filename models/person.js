const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB', error.message)
  })


// if (process.argv.length !== 2 && process.argv.length !== 4) {
//   console.log(`Please input 2 arguments to view phonebook, 
// or 4 arguments to add a new person`)

//   process.exit(1)
// }

// const name = process.argv[2]
// const number = process.argv[3]

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

// const Person = mongoose.model('Person', personSchema)

// if (process.argv.length === 2) {
//   Person.find({}).then(persons => {
//     console.log('phonebook:');
//     persons.forEach(person => {
//       console.log(person.name, person.number)
//     })

//     mongoose.connection.close()
//   })
// } else {
//   const person = new Person({
//     name,
//     number,
//   })
  
//   person.save().then(result => {
//     console.log(`added ${name} number ${number} to phonebook`)
//     mongoose.connection.close()
//   })
// }

module.exports = mongoose.model('Person', personSchema)
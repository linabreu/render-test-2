const mongoose = require('mongoose')

const password = process.argv[2]

const url =
 `mongodb+srv://fullstack:${password}@fullstackopen.zebosum.mongodb.net/persons-db?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  Name: String,
  Number: String,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  Name: process.argv[3],
  Number: process.argv[4],
})

const getAllEntries = () => {
  Person.find({}).then(result => {
    result.forEach(note => {
      console.log(note)
    })
    mongoose.connection.close()
  })
}

const savePerson = () => {
  const person = new Person(
  {
    Name: process.argv[3],
    Number: process.argv[4],
  })

  person.save().then(result => 
  {
    console.log(`added ${person.Name} with number ${person.Number} to the phone book!`)
    mongoose.connection.close()
  })
}


if (process.argv.length<3) 
  {
    console.log('give password as argument')
    process.exit(1)
  }
if (process.argv.length == 3) 
  {
    getAllEntries();
  }
if (process.argv.length == 5)
{
    savePerson()
}


/*person.save().then(result => {
  console.log(`added ${person.Name} with number ${person.Number} to the phone book!`)
  mongoose.connection.close()
})*/




/*Person.find({}).then(result => {
  result.forEach(note => {
    console.log(note)
  })
  mongoose.connection.close()
})*/
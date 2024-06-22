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

app.get('/api/notes', (request, response) => {
    Note.find({}).then(notes => {
      response.json(notes)
    })
  })
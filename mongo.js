const mongoose = require('mongoose')

const password = process.argv[2]

const url =
 `mongodb+srv://fullstack:${password}@fullstackopen.zebosum.mongodb.net/persons-db?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  Name: 
  {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    minlength: 4,
    maxlength: 15
  },
  Number:
  {
    type: String,
    minlength: 1,
    required: [true, 'Contact phone number is required!']
  }
})

const Person = mongoose.model('Person', personSchema)

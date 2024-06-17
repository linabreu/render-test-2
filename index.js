
const express = require('express');
const app = express();
app.use(express.json());
//app.use(json())
app.use(express.static('dist'))

//const cors = require('cors');
//app.use(cors());

//const morgan = require('morgan');
//app.use(morgan(':method  :response-time ms :url :body'));

//url https://render-test-2-jrci.onrender.com/api/persons


let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    },
    { 
      "id": 5,
      "name": "Contact from backend", 
      "number": "39-23-4444"
    }
]

app.get('/', (request, response) => { //this is an endpoint
    response.send('<h1>Hello World!</h1>')
  })

app.get('/api/info', (request, response) => {
    const date = new Date();
    response.send(`
        <p>Phonebook has info for ${persons.length} contact(s)</p>
        <p>contact info requested at ${date}`)})
  
  app.get('/api/persons', (request, response) => { //this is also an endpoint
    response.json(persons)
  })

  app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if (person) 
    {
        response.send(`
            <p>Contact Name: ${person.name}</p>
            <p>Contact Number: ${person.number}`)
    } 
    else 
    {
        response.status(404)
        response.send(`
            <h2>404 PAGE NOT FOUND</h2>`)
    }

    console.log(person)
    response.json(person)
  })

  app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
  
    response.status(204).end()
  })

  const generateId = () => {
    const maxId = persons.length > 0
      ? Math.max(...persons.map(n => n.id))
      : 0
    return maxId + 1
  }
  
  app.post('/api/persons', (request, response) => {
    const body = request.body
  
    if ((!body.name) || (!body.number))
    {
      return response.status(400).json({ 
        error: 'Missing contact information' 
      })
    }
    else if (persons.find(person => person.name === body.name))
    {
      return response.status(400).json({ 
        error: 'Contact already exists!' 
      })
    }

  
    const person = 
    {
      name: body.name,
      number: body.number,
      id: generateId(),
    }
  
    persons = persons.concat(person)
  
    response.json(person)
    //morgan.token('body', request => JSON.stringify(body))
  })


  const PORT = process.env.PORT || 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })


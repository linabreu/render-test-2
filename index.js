
require('dotenv').config()
const express = require('express');
const app = express();
app.use(express.json());
app.use(express.static('dist'))
const Person = require('./models/person')


//get all persons
app.get('/api/persons', (request, response) => 
  {
    Person.find({}).then(persons => {
      response.json(persons)
      console.log(persons)
    })
  })

  //create a new person entry
  app.post('/api/persons', (request, response, next) => 
    {
      const body = request.body
      console.log(body)
      console.log(body.Name)
    
      /*if (body.Name === undefined || body.Number === undefined) 
      {
        return response.status(400).json({ error: 'content missing' })
      }*/
    
      const person = new Person({
        Name: body.Name,
        Number: body.Number
      })
    
      person.save().then(savedPerson => {
        response.json(savedPerson)
      })
      .catch(error => next(error))
    })

    //get a specific person
    app.get('/api/persons/:id', (request, response, next) => 
      {
        Person.findById(request.params.id)
          .then(person => {
      
            if (person) 
            {
              response.json(person)
            } else
            {
              response.status(404).end()
            }
          })
          .catch(error => next(error))
      })

    //delete
    app.delete('/api/persons/:id', (request, response, next) => 
    {
      Person.findByIdAndDelete(request.params.id)
        .then(result => 
        {
          response.status(204).end()
        })
        .catch(error => next(error))
    }) 

    //update
    app.put('/api/persons/:id', (request, response, next) => 
    {
      const body = request.body
    
      const person = 
      {
        Name: body.Name,
        Number: body.Name,
      }
    
      Note.findByIdAndUpdate(request.params.id, person, { new: true })
        .then(updatedPerson => 
        {
          response.json(updatedPerson)
        })
        .catch(error => next(error))
    })

    const unknownEndpoint = (request, response) => 
    {
      response.status(404).send({ error: 'unknown endpoint' })
    }
    app.use(unknownEndpoint)

    const errorHandler = (error, request, response, next) => 
      {
        console.error(error.message)
      
        if (error.name === 'CastError') 
        {
          return response.status(400).send({ error: 'malformatted id' })
        }
        else if (error.name === 'ValidationError') 
        {
          return response.status(400).json({ error: error.message })
        }
        next(error)
      }
      app.use(errorHandler)




/*

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



  
  /*app.post('/api/persons', (request, response) => {
    const body = request.body
  
    if ((!body.name) || (!body.number))
    {
      return response.status(400).json({ 
        error: 'Missing contact information' 
      })
    }
    else if (Person.find(person => person.name === body.name))
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
  })*/

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})


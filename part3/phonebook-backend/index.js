const express = require('express')
const morgan = require('morgan')
const app=express()
app.use(express.json())


morgan.token('body', (req)=> { return JSON.stringify(req.body)})
app.use(morgan(`:method :url :status - :response-time ms :body`))


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
    }
]

app.get('/',(request,response)=>{
    response.send('<h1>API implementation for phonebook</h1>')
})

app.get('/info',(request,response)=>{
    response.end(
    `<div>
        <p>Phonebook has info for ${persons.length} people</p>
        <p>${new Date}</p>
    </div>`)
})

app.get('/api/persons',(request,response)=>{
    response.json(persons)
    console.log(persons);
})

app.get('/api/persons/:id',(request,response)=>{
    const id=Number(request.params.id)
    const person=persons.find(person=>person.id===id)
    
    if (person){
        response.json(person)
        console.log(person)
    }   
    else {
        console.log('404 Not Found')
        response.status(404).end() 
    }
})

app.post('/api/persons',(request,response)=>{
    const id=Math.floor(Math.random()*1000)
    const body=request.body

    if((!body.name)||(!body.number)){
        console.log(body);
        return response.status(400).json({
            error:'content missing'
        })
    }
    else if(persons.find(person=>person.name===body.name)){
        return response.status(400).json({
            error:'name must be unique'
        })
    }
    body.id=id
    persons=persons.concat(body)
    response.json(body)
    console.log(`Added ${body.name}`);
})

app.delete('/api/persons/:id',(request,response)=>{
    const id=Number(request.params.id)
    const person=persons.find(person=>person.id===id)

    if (person){
        persons=persons.filter(p=>p.id!==id)
        response.status(204).end()
        console.log('204 Deleted');
    }
})


const PORT = 3001
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
})
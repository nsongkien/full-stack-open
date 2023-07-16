const path=require('path')
const express = require('express')
const cors=require('cors')


const app=express()
app.use(cors())
app.use(express.json())
app.use(express.static('build'))


//morgan
/*if (process.env.NODE_ENV === 'development') {
    const morgan = require('morgan');
    morgan.token('body', (req)=> { return JSON.stringify(req.body)})
    app.use(morgan(`:method :url :status - :response-time ms :body`))
}*/


let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "phone": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "phone": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "phone": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "phone": "39-23-6423122"
    }
]

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
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

    if((!body.name)||(!body.phone)){
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


const PORT = process.env.PORT || 3001
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
})
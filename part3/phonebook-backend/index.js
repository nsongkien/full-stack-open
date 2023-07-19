const path=require('path')
const express = require('express')
const cors=require('cors')

require('dotenv').config()
const Person=require('./models/person')

const app=express()
app.use(cors())
app.use(express.json())
app.use(express.static('build'))






app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
})

app.get('/api/persons',(request,response)=>{
    Person.find({}).then(person=>{
        response.json(person)
    })
})

app.get('/api/persons/:id',(request,response)=>{
    Person.findById(request.params.id).then(person=>{
        response.json(person)
    })
})

app.post('/api/persons',(request,response)=>{
    const body=request.body

    if((!body.name)||(!body.phone)){
        console.log(body);
        return response.status(400).json({
            error:'content missing'
        })
    }

    const person = new Person({
        name:body.name,
        phone:body.phone,
    })

    person.save().then(savedPerson=>{
        response.json(savedPerson)
    })
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


const PORT = process.env.PORT
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
})
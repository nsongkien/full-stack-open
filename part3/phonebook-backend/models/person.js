const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

mongoose.set('strictQuery',false)

mongoose.connect(url)

const personSchema=new mongoose.Schema({
    name:String,
    phone:String,
})

personSchema.set('toJSON',{
    transform:(document,returendObject)=>{
        returendObject.id=returendObject._id.toString()
        delete returendObject._id
        delete returendObject.__v
    }
})

module.exports = mongoose.model('Person',personSchema)


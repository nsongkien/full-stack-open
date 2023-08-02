const Blog = require('../models/blog')
const router = require('express').Router()

router.get('/',(request,response)=>{
    Blog
        .find({})
        .then(result=>{
            response.json(result)
        })
})

router.post('/',(request,response)=>{
    const newBlog = new Blog(request.body)
    
    newBlog
        .save()
        .then(result=>{
            response.status(201).json(result)
        }) 
})

module.exports=router
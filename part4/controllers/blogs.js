const Blog = require('../models/blog')
const router = require('express').Router()

router.get('/', async (request,response)=>{
    const blogs = await Blog.find({})
    response.json(blogs)
})

router.post('/', async (request,response,next)=>{
    const newBlog = new Blog(request.body)

    if (!newBlog.likes)
        newBlog.likes=0
    else if (!newBlog.title || !newBlog.url)
        return response.status(400).end()

    const savedBlog = await newBlog.save()
    response.status(201).json(savedBlog)
})

router.delete('/:id', async(request,response,next)=>{
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
})

router.put('/:id', async(request,response,next)=>{
    const body = request.body

    const blog ={
        title:body.title,
        url:body.url,
        author:body.author,
        likes:body.likes
    }

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id,updatedBlog, ({new:true}))
    response.json(updatedBlog)
})

module.exports=router
const Blog = require('../models/blog')
const User = require('../models/user')
const loginRouter = require('../controllers/login')
const router = require('express').Router()
const jwt  = require('jsonwebtoken')


router.get('/', async (request,response) => {
  const blogs = await Blog.find({})
    .populate('user', { username:1,name:1 })
  response.json(blogs)
})



const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')){
    return authorization.replace('Bearer ', '')
  }
  return null
}

router.post('/', async (request,response) => {
  const body = request.body

  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
  if (!decodedToken.id)
    return response.status(401).json({error: 'token invalid'})
  const user = await User.findById(decodedToken.id)

  if (!body.likes)
    body.likes=0
  else if (!body.title || !body.url)
    return response.status(400).end()

  const newBlog = new Blog({
    title : body.title,
    author: body.author,
    url: body.url,
    user: user.id
  })

  console.log(newBlog);
  const savedBlog = await newBlog.save()
  response.status(201).json(savedBlog)
})

router.delete('/:id', async(request,response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

router.put('/:id', async(request,response) => {
  const body = request.body

  const blog ={
    title:body.title,
    url:body.url,
    author:body.author,
    likes:body.likes
  }


  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new:true })
  response.json(updatedBlog)
})

module.exports=router
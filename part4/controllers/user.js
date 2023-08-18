const userRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

userRouter.get('/', async(request,response)=>{
    const users = await User.find({})
    response.json(users)
})

userRouter.post('/', async(request,response)=>{
    const {username,name,password} = request.body

    if (password === undefined || password.length<3) {
        return response.status(400).json({error:'password must be at least 3 characters'})
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const hashedUser = new User({
        username,
        name,
        passwordHash,
    })

    const savedUser = await hashedUser.save()

    response.status(201).json(savedUser)
})

module.exports = userRouter
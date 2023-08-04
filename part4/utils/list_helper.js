const _ = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) =>{
    const reducer = (sum,item)=>{
        return sum+item
    }
    return blogs.map(blog=>blog.likes).reduce(reducer ,0)
}

const mostLikes = (blogs) => {
    let countAuthorLike = _(blogs)
        .groupBy('author')
        .map((authors, id)=>({
            author: id,
            likes: _.sumBy(authors,'likes')
        }))
        .value()
        
        countAuthorLike = _.maxBy(countAuthorLike,(object)=>(object.likes))

    console.log(countAuthorLike)
    return countAuthorLike
}

module.exports={
    dummy,
    totalLikes,
    mostLikes,
}


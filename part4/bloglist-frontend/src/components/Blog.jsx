import { useState } from "react"

const Blog = ({ blog , users}) => {
  const [visible, setVisible] = useState(false)

  const showWhenVisibleFalse = {display: visible ? 'none' : ''}
  const showWhenVisibleTrue = {display: visible ? '' : 'none'}

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const uploadedUser = blog.user !== null
    ? blog.user.username
    : null

  return (
    <div className="blog" >
      <div style={showWhenVisibleFalse}>
        {blog.title} - {blog.author} <button onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenVisibleTrue}>
        {blog.title} - {blog.author}  
        <button onClick={toggleVisibility}>hide</button> <br />
        {<a href={blog.url}>{blog.url}</a>} <br />
        {blog.likes} <button>like</button> <br />
        {uploadedUser}
      </div>
    </div>
  )
}

export default Blog
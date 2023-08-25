import { useState } from "react"


const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)

  const showWhenVisibleFalse = {display: visible ? 'none' : ''}
  const showWhenVisibleTrue = {display: visible ? '' : 'none'}

  const toggleVisibility = () => {
    setVisible(!visible)
  }
  return (
    <div className="blog" >
      <div style={showWhenVisibleFalse}>
        {blog.title} - {blog.author} <button onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenVisibleTrue}>
        {blog.title} - {blog.author} <br />
        {blog.url} <br />
        {blog.likes} <button>like</button> <br />
        {}
        <button onClick={toggleVisibility}>hide</button>
      </div>
    </div>
  )
}

export default Blog
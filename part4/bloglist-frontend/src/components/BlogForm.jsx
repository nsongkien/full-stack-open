import { useState } from "react"



const BlogForm = ({postBlog}) => {
    const [title,setTitle]= useState('')
    const [author,setAuthor]=useState('')
    const [url, setUrl] = useState('')
    const [visible, setVisible] = useState(false)

    const showWhenVisibleTrue = {display: visible ? 'none' : ''}
    const showWhenVisibleFalse = {display: visible ? '' : 'none'}

    const createBlog = (event) => {
      event.preventDefault()
      postBlog ({
        title: title,
        author: author,
        url: url
      })
      setAuthor('')
      setTitle('')  
      setUrl('')
    }

    const toggleVisibility = () => {
      setVisible(!visible)
    }

    return (
        <>
          <div style={showWhenVisibleFalse}>
            <button onClick={toggleVisibility}>create blog</button>
          </div>
          <div style={showWhenVisibleTrue}>
            Create A Post:
            <form onSubmit={createBlog}>
              <div>
                Title: 
                <input
                  type="text" 
                  value={title}
                  name="Title"
                  onChange={({target})=> setTitle(target.value)}
                />
              </div>
              <div>
                Author: 
                <input
                  type="text"
                  value={author}
                  name='Author'
                  onChange={({target})=> setAuthor(target.value)}
                />
              </div>
              <div>
                Url: 
                <input
                  type="text"
                  value={url}
                  name='Url'
                  onChange={({target})=>setUrl(target.value)}
                />
              </div>
              <button type='submit'>Post</button>
              <br />
              <button onClick={toggleVisibility}>cancel</button>
            </form>
          </div>
          
      </>
    )
}
    
    
    

export default BlogForm
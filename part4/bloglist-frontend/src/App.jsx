import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import SuccessNotification from './components/SuccessNotification'
import ErrorNotification from './components/ErrorNotification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title,setTitle]= useState('')
  const [author,setAuthor]=useState('')
  const [url, setUrl] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  

    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if(loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const renderBlogList = () => (
    blogs.map(blog =>
      <Blog key={blog.id} blog={blog} />
    )
  )

  const addBlog = async (event) => {
    event.preventDefault()
    const addedBlog = await blogService.create({title, author, url})
    if (addedBlog !== null) {
          setSuccessMessage(`Added: ${addedBlog.title}`)
          setAuthor('')
          setTitle('')
          setUrl('')
          setBlogs(blogs.concat(addedBlog))
    }
    else setErrorMessage(`Error, blog could not be added`)

    setTimeout(() => {
      setSuccessMessage(null)
      setErrorMessage(null)
    }, 5000);
  }

  const loginForm = ()=> (
    <>
    Log into your account
    <form onSubmit={handleLogin}>
      <div>
        username
        <input 
          type="text" 
          value={username}
          name="Username"
          onChange={({target})=> setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input 
          type="password" 
          value={password}
          name='Password'
          onChange={({target})=> setPassword(target.value)}
        />
      </div>
      <button type='submit'>Log in</button>
    </form>
    </> 
  )

  const newBlogForm = () => (
    <>
      Create A Post:
      <form onSubmit={addBlog}>
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
      </form>
    </>
  )

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({username,password})
      blogService.setToken(user.token)
      
      setUser(user)
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      setUsername('')
      setPassword('')
    }
    catch (exceptions) {
      setErrorMessage('Wrong Username or Password')
      console.log('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000);
    }
  }

  const handleLogout = async () => {
    window.localStorage.removeItem('loggedBlogappUser')
    location.reload()
  }

  return (
    <div>
      <h1>Favorite Blogs</h1>
      <SuccessNotification successMessage={successMessage}/>
      <ErrorNotification errorMessage={errorMessage}/>

      {
        !user
          ? loginForm()
          : <div>
              <p>
                {user.name} logged in
                <button onClick={handleLogout}>log out</button>
              </p>

              {newBlogForm()}

              
              {renderBlogList()}
              
            </div>
              
            
      }

    </div>
  )
}

export default App
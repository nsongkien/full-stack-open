import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const renderBlogList = () => (
    blogs.map(blog =>
      <Blog key={blog.id} blog={blog} />
    )
  )

  const loginForm = ()=> (
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
  )

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({username,password})
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    }
    catch (exceptions) {
      setErrorMessage('Wrong Credentials')
      console.log('wrong credentials');
      setTimeout(() => {
        setErrorMessage('')
      }, 5000);
    }
    
  }

  return (
    <div>
      <h2>blogs</h2>
      {
        user === null
          ? loginForm()
          : <div>
              <p>{user.name} logged in</p>
              {renderBlogList()}
            </div>
              
            
      }

    </div>
  )
}

export default App
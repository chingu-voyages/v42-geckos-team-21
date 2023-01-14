import React from 'react'
import { Link } from 'react-router-dom'
import './Login.css'
const Login = () => {

  const handleSubmit = () => {
    document.querySelector('.login-form').preventDefault()
  }
  return (
    <main className='login-container'>
      <form className='login-content' onSubmit={() => handleSubmit()}>
        <h3>Login</h3>
        <input type='text' name='username' />
        <label htmlFor='username'>Username</label>
        <input type='text' name='password' />
        <label htmlFor='username'>Password</label>
        <button type='submit' className='login-submit'>Log In</button>
        <p>Not a member? <Link to='/signup'>Sign up now</Link></p>
        </form>
    </main>
  )
}

export default Login
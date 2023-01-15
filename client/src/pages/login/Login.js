import React, {useRef, useState} from 'react'
import { Link } from 'react-router-dom'
import './Login.css'
const Login = () => {
  const usernameField = useRef()
  const passwordField = useRef()
  const [formErrors, setFormErrors] = useState({})

  const handleSubmit = (ev) => {
    ev.preventDefault();
    console.log('handle form here');
    const username = usernameField.current.value;
    const password = passwordField.current.value;

    const errors = {};
    if(!username){
      errors.username= 'Username must not be empty.';
    }
    if(!password) {
      errors.password = 'Password must not be empty.';
    }
    setFormErrors(errors);
    if(Object.keys(errors).length > 0) {
      return
    }
  }
  return (
    <main className='login-container'>
      <form className='login-content' onSubmit={handleSubmit}>
        <h3>Login</h3>
        <label htmlFor='username'>Username</label>
        <input ref={usernameField} type='text' name='username' required/>
        <p className='error'>{formErrors.username}</p>
        <label htmlFor='username'>Password</label>
        <input ref={passwordField} type='text' name='password' required/>
        <p className='error'>{formErrors.password}</p>
        <button type='submit' className='login-submit'>Log In</button>
        <p>Not a member? <Link to='/signup'>Sign up now</Link></p>
        </form>
    </main>
  )
}

export default Login
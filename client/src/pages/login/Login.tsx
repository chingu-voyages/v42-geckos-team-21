import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import './Login.css'
const Login = () => {
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');

 
  return (
    <main className='login-container'>
      <form className='login-content' onSubmit={handleSubmit}>
        <h3>Login</h3>
        <input type='text' name='email' onChange={(e) => {
          setInputEmail(e.target.value);
        }}/>
        <label htmlFor='email'>Email</label>
        <input type='text' name='password' onChange={(e) => {
          setInputPassword(e.target.value);
        }}/>
        <label htmlFor='email'>Password</label>
        <button type='submit' className='login-submit'>Log In</button>
        <p>Not a member? <Link to='/signup'>Sign up now</Link></p>
        </form>
    </main>
  )


  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    
    axios.post('http://localhost:3001/api/login', {email: inputEmail, password: inputPassword})
      .then(res => {
        console.log(res.data);
        if (res.data.msg === 'success!' ) {
          console.log(res.headers);
          // document.cookie = ;
          return axios.get('http://localhost:3001/api/user/getloggedinuser', {withCredentials: true})
        }
      })
      .then(res => {
        console.log(res!.data);
      })
      .catch(err => console.error(err.message))

  }
}



export default Login
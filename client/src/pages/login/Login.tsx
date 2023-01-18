import React, {useState} from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios';
import './Login.css'
import { IfcUser } from '../..';

interface IfcProps {
  user: IfcUser | null,
  setUser: React.SetStateAction<Function>
}

const Login = (props: IfcProps) => {
  const navigate = useNavigate();
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
        <input type='password' name='password' onChange={(e) => {
          setInputPassword(e.target.value);
        }}/>
        <label htmlFor='password'>Password</label>
        <button type='submit' className='login-submit'>Log In</button>
        <p>Not a member? <Link to='/signup'>Sign up now</Link></p>
        </form>
    </main>
  )


  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    
    axios.post('http://localhost:3001/api/login', {email: inputEmail, password: inputPassword}, {withCredentials: true})
      .then(res => {
        if (res.data.msg === 'success!' ) {
          console.log(res.headers);
          console.log(document.cookie);
          return axios.get('http://localhost:3001/api/user/getloggedinuser', {withCredentials: true})
        }
      })
      .then(res => {
        console.log('setting user: ', res!.data[0]);
        props.setUser(res!.data[0]);
        navigate('/table-view')
      })
      .catch((err) => console.error(err.message))

  }
}



export default Login
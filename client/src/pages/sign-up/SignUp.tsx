import React, {useState} from 'react'
import axios from 'axios';
import './SignUp.css'
import { Link } from 'react-router-dom';
const SignUp = () => {
  const [newFirstName, setNewFirstName] = useState('');
  const [registered, setRegistered] = useState(false);
  const [newLastName, setNewLastName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPassword2, setNewPassword2] = useState('');
  const [formErrors, setFormErrors]: any = useState({})
  axios.get('http://localhost:3001/api/users')
          .then(res => {
            console.log(res!.data);
          })
          .catch((err) => console.error(err.message))

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const errors: any = {}
    
    if(newFirstName.length === 0) {
      errors.first = 'First name required'
    }
    if(newLastName.length === 0) {
      errors.last = 'Last name required'
    }
    if(newEmail.includes('@') !== true) {
      errors.email = 'Please enter a valid email'
    }
    if(newPassword.length < 8) {
      errors.password = 'Password must be 8 characters'
    }
    if(newPassword2 !== newPassword) {
      errors.password2 = 'Passwords must match'
    }

    setFormErrors(errors)

    if(Object.keys(errors).length === 0) {
      console.log('no error')
      axios.post('http://localhost:3001/api/register', {
firstName: newFirstName,
      lastName: newLastName,
      email: newEmail,
      password: newPassword,
      confirmPassword: newPassword2
    },)
      .then(res => {
        console.log(res!.data);
        setRegistered(true)
      })
      .catch((err) => console.error(err.message))
    }

  }
  return (
    <main className='sign-up row'>
      {!registered ? 
        <form className='sign-up-content' onSubmit={handleSubmit}>
        <h3>Sign Up</h3>        
        <label htmlFor='first-name'>First name</label>
        <input required type='text' name='first-name' onChange={(e) => {
          setNewFirstName(e.target.value);
        }}/>
        <p className='error'> {formErrors.first}</p>
        <label htmlFor='last-name'>Last name</label>
        <input required type='text' name='last-name' onChange={(e) => {
          setNewLastName(e.target.value);
        }}/>
        <p className='error'> {formErrors.last}</p>
        <label htmlFor='email'>Email</label>
        <input required type='text' name='email' onChange={(e) => {
          setNewEmail(e.target.value);
        }}/>
                <p className='error'>{formErrors.email}</p>

        <label htmlFor='password'>Password</label>
        <input required type='password' name='password' onChange={(e) => {
          setNewPassword(e.target.value);
        }}/>
                <p className='error'>{formErrors.password}</p>

        <label htmlFor='password2'>Confirm Password</label>
        <input required type='password' name='password2' onChange={(e) => {
          setNewPassword2(e.target.value);
        }}/>
                <p className='error'>{formErrors.password2}</p>

        <button type='submit' className='sign-up-submit'>Sign Up</button>
        </form> : 
        <div className='sign-up-success'>
        <h2>Hello, {newFirstName}</h2>
        <h3>You're good to go!</h3>
        <p>continue to <Link to='/login'>Login</Link></p>
        </div>}
    </main>
  )
}

export default SignUp
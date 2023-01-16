import React, {useState} from 'react'
// import axios from 'axios';
import './SignUp.css'
const SignUp = () => {
  const [newUsername, setNewUsername] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPassword2, setNewPassword2] = useState('');
  const [formErrors, setFormErrors]: any = useState({})

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(newUsername, newEmail, newPassword, newPassword2)
    const errors: any = {}
    
    if(newUsername.length < 8) {
      errors.username = 'Username must be 8 characters'
    }
    if(newEmail.includes('@') !== true) {
      errors.email = 'Please enter a valid email'
    }
    if(newPassword.length < 8) {
      errors.password = 'Password must be 8 characters'
    }
    if(newPassword2 !== newPassword) {
      errors.password2 = 'Passwords do not match'
    }

    setFormErrors(errors)
    // axios.post('http://localhost:3001/api/login', {email: inputEmail, password: inputPassword}, {withCredentials: true})
    //   .then(res => {
    //     if (res.data.msg === 'success!' ) {
    //       console.log(res.headers);
    //       console.log(document.cookie);
    //       // document.cookie = ;
    //       return axios.get('http://localhost:3001/api/user/getloggedinuser', {withCredentials: true})
    //     }
    //   })
    //   .then(res => {
    //     console.log(res!.data);
    //   })
    //   .catch((err) => console.error(err.message))

  }
  return (
    <main className='sign-in'>
        <form className='sign-in-content' onSubmit={handleSubmit}>
        <h3>Sign Up</h3>        
        <label htmlFor='username'>Username</label>
        <input required type='text' name='username' onChange={(e) => {
          setNewUsername(e.target.value);
        }}/>
        <p className='error'> {formErrors.username}</p>
        <label htmlFor='email'>Email</label>
        <input required type='text' name='email' onChange={(e) => {
          setNewEmail(e.target.value);
        }}/>
                <p className='error'>{formErrors.email}</p>

        <label htmlFor='password'>Password</label>
        <input required type='text' name='password' onChange={(e) => {
          setNewPassword(e.target.value);
        }}/>
                <p className='error'>{formErrors.password}</p>

        <label htmlFor='password2'>Confirm Password</label>
        <input required type='text' name='password2' onChange={(e) => {
          setNewPassword2(e.target.value);
        }}/>
                <p className='error'>{formErrors.password2}</p>

        <button type='submit' className='sign-up-submit'>Sign Up</button>
        </form>
    </main>
  )
}

export default SignUp
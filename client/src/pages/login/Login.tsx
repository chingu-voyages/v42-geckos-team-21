import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios';
import './Login.css'
import { IfcUser } from '../..';
import { MONGOOSE_API_HOST } from '../../index'
import Alert from '../../components/Alert/Alert';

interface IfcProps {
  user: IfcUser | null,
  setUser: React.SetStateAction<Function>
}

const Login = (props: IfcProps) => {
  const navigate = useNavigate();
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  interface IfcErrors {
    inputEmail?: string,
    inputPassword?: string
  }
  const [formErrors, setFormErrors] = useState<IfcErrors>({});
  const [alertText, setAlertText] = useState<React.ReactNode>('');
  const [alertKey, setAlertKey] = useState(0);

  return (
    <>
      <main className='login-container row'>
        <form className='login-content' onSubmit={handleSubmit}>
          <h3>Login</h3>
          <input required type='text' name='email' onChange={(e) => {
            setInputEmail(e.target.value);
          }} />
          <label htmlFor='email'>Email <span className='error'>{formErrors.inputEmail}</span></label>
          <input required type='password' name='password' onChange={(e) => {
            setInputPassword(e.target.value);
          }} />
          <label htmlFor='password'>Password <span className='error'>{formErrors.inputPassword}</span></label>
          <button type='submit' className='login-submit'>Log In</button>
          <p>Not a member? <Link to='/sign-up'>Sign up now</Link></p>
        </form>
      </main>
      <Alert text={alertText} exitAfterDuration={10000} alertKey={alertKey}
        setAlertKey={setAlertKey} />
    </>
  )


  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();





    const errors: IfcErrors = {};
    if (inputEmail.length === 0) {
      errors.inputEmail = 'required'
    }
    if (inputPassword.length === 0) {
      errors.inputPassword = 'required'
    }

    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      axios.post(MONGOOSE_API_HOST + '/api/login', { email: inputEmail, password: inputPassword }, { withCredentials: true })
        .then(res => {
          if (res.data.msg === 'success!') {
            console.log(res.headers);
            console.log(document.cookie);
            return axios.get(MONGOOSE_API_HOST + '/api/user/getloggedinuser', { withCredentials: true })
          }
        })
        .then(res => {
          if (res!.status === 200) {
            console.log('setting user: ', res!.data[0]);
            props.setUser(res!.data[0]);
            navigate('/table-view')
          } else {
            throw new Error(res!.statusText);
          }
        })
        .catch((err) => {
          console.error(err.message);
          setAlertKey(oldAlertKey => ++oldAlertKey);
          setAlertText(
            <>
              <strong>Verify your username and password are correct</strong>
              <p>{err.message}</p>
            </>);
        })

    }
  }
}



export default Login
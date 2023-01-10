import './Landing.css';
<<<<<<< HEAD:client/src/pages/landing/Landing.tsx
import LandingImg from "./landing.png"
=======
import LandingImg from "../../../src/assets/landing.png"
>>>>>>> e426c2f8 (restructuring files):src/pages/landing/Landing.tsx
import { Link } from 'react-router-dom';
function Landing() {
  return (
    <div className="landing centered-column">
      <h1 className='landing-title-one'>Make your job search easy.</h1> 
      
     <img src={LandingImg} alt="landing" className='landing-image'/> <h2 className='landing-title-two'>Keep all your applications in one place.</h2>
       <Link to="/table-view" className='login-btn'>Login</Link>
       <p>New here? <Link to="/login" className='sign-up-btn'>Sign up</Link></p>
    </div>
  );
}

export default Landing;

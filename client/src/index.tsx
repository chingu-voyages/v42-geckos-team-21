import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import './index.css';
import Landing from './pages/landing/Landing';
import Login from './pages/login/Login';
import TableView from './pages/table-view/TableView';
import NavigationBar from './components/NavigationBar/NavigationBar'
import Footer from './components/Footer/Footer'
import KanbanView from './pages/kanban-view/KanbanView';
import NotFound from './pages/404/not-found';
import SignUp from './pages/sign-up/SignUp';
// import reportWebVitals from './reportWebVitals';

export interface IfcUser {
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  applications: [],
  _id: string
}

interface IfcCookieObj {
  [key: string]: string
}

var MONGOOSE_API_HOST: string;
// You can define this env variable in shell arguments during build
// e.g. if api is relative to host of react app
// use [ set REACT_APP_MONGOOSE_API_HOST="<<relative>>" npm run build ] 
if (process.env.REACT_APP_MONGOOSE_API_HOST === "<<relative>>") {
  MONGOOSE_API_HOST = '';
  console.log('Using current host (of React client) as api host.');
} else if (process.env.REACT_APP_MONGOOSE_API_HOST) {
  MONGOOSE_API_HOST = process.env.REACT_APP_MONGOOSE_API_HOST;
  console.log('Using '+ '"' + MONGOOSE_API_HOST + '"' + ' as api host.');
}
else {
  // For local development (when you're likely using create-react-app's webpack
  // server for the frontend)
  MONGOOSE_API_HOST = 'http://localhost:3001';
  console.log('Using default api host:', MONGOOSE_API_HOST);
}

export { MONGOOSE_API_HOST };

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <App />
);


function App() {

  let cookieObj: IfcCookieObj = {};
  document.cookie.split(/;\s*/).forEach((element) => {
    let keyValueArr = element.split('=');
    cookieObj[keyValueArr[0]] = keyValueArr[1];
  });
  console.log(cookieObj);

  let [user, setUser] = useState<IfcUser | null>(null);
  
  useEffect(() => {
    if (cookieObj.is_logged_in === 'true' && user === null) {
      axios.get(
        MONGOOSE_API_HOST + '/api/user/getloggedinuser',
        { withCredentials: true }
      ).then(res => {
        setUser(res.data[0]);
      })
    }
  }, [])



  if (!user && !cookieObj.is_logged_in) {
    return (
      <>
        <React.StrictMode>
          <Router>
            <NavigationBar />
            <Routes>
              <Route path='/' element={<Landing />} />
              <Route path='/login' element={<Login user={user} setUser={setUser} />} />
              <Route path='/sign-up' element={<SignUp />} />
              <Route path='*' element={<NotFound />} />
            </Routes>
          </Router>
          <Footer />
        </React.StrictMode>
      </>
    )
  }  else {
    return (
      <>
        <React.StrictMode>
          <Router>
            <NavigationBar />
            <Routes>
              <Route path='/' element={<Landing />} />
              <Route path='/table-view' element={<TableView user={user} />} />
              <Route path='/kanban-view' element={<KanbanView />} />
              <Route path='/login' element={<Login user={user} setUser={setUser} />} />
              <Route path='*' element={<NotFound />} />
            </Routes>
          </Router>
          <Footer />
        </React.StrictMode>
      </>
    )
  }
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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




const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <App />
);


function App() {



  let [user, setUser] = useState<IfcUser | null>(null);
  console.log({user});

  if (!user) {
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
  } else {
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

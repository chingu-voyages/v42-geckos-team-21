import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import Landing from './pages/landing/Landing';
import TableView from './pages/table-view/TableView';
import NavigationBar from './components/NavigationBar/NavigationBar'
import Footer from './components/Footer/Footer'
// import reportWebVitals from './reportWebVitals';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Router>
      <NavigationBar />
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/table-view' element={<TableView />} />
      </Routes>
    </Router>
    <Footer />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

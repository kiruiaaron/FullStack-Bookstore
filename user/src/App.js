import React from 'react';
import Register from './components/regLogin/register';
import Login from './components/regLogin/login';
import Home from './pages/home/home';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Main from './pages/account/main';
import Admin from './pages/Admin/admin';



function App() {
  return (

    <Router>
      <Routes>
        <Route index element={<Home />}/>
        <Route path='/register' element= {<Register />}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/main' element={<Main/>}/>
        <Route path ='/admin' element ={<Admin/>}/>
      </Routes>
    </Router>
  );
}

export default App;

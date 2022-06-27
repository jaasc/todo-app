import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import SignIn from './components/Signin';
import SignUp from './components/Signup';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loadUser } from './components/store/actions/authAction';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"

function App() {
  const [mode, setMode] = useState(+true);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser())
  }, [dispatch])

  return (
      <BrowserRouter>
      <ToastContainer/>
        <Navbar mode={mode} setMode={setMode}/>
        <Routes>
          <Route exact path='/' element={<Home mode={mode}/>}/>
          <Route path='/signin' element={<SignIn mode={mode}/>}/>
          <Route path='/signup' element={<SignUp mode={mode}/>}/>
        </Routes>
      </BrowserRouter>
  );
}

export default App;

import { useEffect, useState } from 'react'

import './App.css'

import Header from './components/Header/Header'
import SignInPage from './pages/SignInPage'
import FileCard from './components/FileCard/FileCard'
import FilePage from './pages/FilePage'
import { BrowserRouter, Route, Routes, redirect } from 'react-router-dom'
import { getReturedParamsFromSpotifyAuth } from './services/util'
import { getUserId } from './services/spotifyServices'
import Query from './components/Query/Query'
import Footer from './components/Footer/Footer'


function App() {
  useEffect(() => {
    if(window.location.hash) {
      const { access_token, expires_in, token_type } = getReturedParamsFromSpotifyAuth(window.location.hash);
    
      localStorage.clear();
      localStorage.setItem('accessToken', access_token);
      localStorage.setItem('tokenType', token_type);
      localStorage.setItem('expiresIn', expires_in);
    }
  }, [])

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
  
    if (accessToken === null) {
      if (window.location.pathname !== '/signin') {
        window.location.href = '/signin';
      }
    } else {
      if (window.location.pathname !== '/app') {
        window.location.href = '/app';
      }
    }
  }, []);

  return (
    <>
      <Header />
      <BrowserRouter>
        <Routes>
            <Route path='/signin' element={<SignInPage />}/>
            <Route path='/app' element={<FilePage/>}/>
        </Routes>
      </BrowserRouter>
      <Query />
      <Footer />
    </>
  )
}

export default App

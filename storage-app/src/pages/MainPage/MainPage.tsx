import React, { Component } from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '../../components/NavBar/NavBar'
import Home from '../Home/Home'
import './MainPage.css'
const MainPage = () => {
  return (
    <div className='MainPage'>
      <NavBar />
      <Outlet />
    </div>
  )
}

export default MainPage
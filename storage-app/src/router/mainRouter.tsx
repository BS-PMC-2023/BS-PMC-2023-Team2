import React, { FC } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from '../pages/Home/Home';
import LogIn from '../pages/LogIn/LogIn';
import MainPage from '../pages/MainPage/MainPage';


const MainRouter: FC = ({  }) => {
  return (
    <BrowserRouter>
    <Routes>
        <Route path='/' element={<MainPage />}>
          <Route index element={<Home />}/>
          <Route path="/loginsignup/:is" element={<LogIn />} />
        </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default MainRouter;
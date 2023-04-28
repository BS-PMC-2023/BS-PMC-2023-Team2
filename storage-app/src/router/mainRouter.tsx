import React, { FC } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from '../pages/Home/Home';
import LogIn from '../pages/LogIn/LogIn';
import MainPage from '../pages/MainPage/MainPage';
import Student from '../pages/Student/Student';
import Teacher from '../pages/Teacher/Teacher';
import Admin from '../pages/Admin/Admin';
import Exl from '../components/Exl/Exl';
import AddOrder from '../components/AddOrder/AddOrder';
import AddOrderGroup from '../components/AddOrderGroup/AddOrderGroup';


const MainRouter: FC = ({  }) => {
  return (
    <BrowserRouter>
    <Routes>
        <Route path='/' element={<MainPage />}>
          <Route index element={<Home />}/>
          <Route path="/loginsignup/:is" element={<LogIn />} />
          <Route path="/Student" element={<Student />} />
          <Route path="/Student/AddOrder" element={<AddOrder />} />
          <Route path="/Student/AddOrderGroup" element={<AddOrderGroup />} />
          <Route path="/Teacher" element={<Teacher />} />
          <Route path="/Admin" element={<Admin />} />
          <Route path="/Admin/Exl" element={<Admin />} />
          <Route path="*" element={<Home />}/>
        </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default MainRouter;
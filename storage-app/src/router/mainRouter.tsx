import React, { FC } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from '../pages/Home/Home';


const MainRouter: FC = ({  }) => {
  return (
    <BrowserRouter>
    <Routes>
        <Route index element={<Home />} />
    </Routes>
    </BrowserRouter>
  )
}

export default MainRouter;
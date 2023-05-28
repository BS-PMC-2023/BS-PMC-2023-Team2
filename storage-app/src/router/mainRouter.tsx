import React, { FC } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import LogIn from "../pages/LogIn/LogIn";
import MainPage from "../pages/MainPage/MainPage";
import Student from "../pages/Student/Student";
import Teacher from "../pages/Teacher/Teacher";
import Admin from "../pages/Admin/Admin";
import AdminLayout from "../pages/AdminLayout/AdminLayout";
import AddOrder from "../components/AddOrder/AddOrder";
import AddOrderGroup from "../components/AddOrderGroup/AddOrderGroup";
import Error from "../pages/404/Error";
import AddProduct from "../components/AddProduct/AddProduct";
import Exl from "../components/Exl/Exl";
import FoultyItems from "../components/FoultyItems/FoultyItems";
import Summery from "../components/Summery/Summery";
import ManageOrders from "../components/ManageOrders/ManageOrders";
import StudentOrders from "../components/StudentsOrders/StudentOrders";
import ReturnProduct from "../components/RerutnProduct/ReturnProduct";

const MainRouter: FC = ({}) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />}>
          {/* <Route  element={<Home />} /> */}
          <Route index element={<LogIn />} />
          <Route path="/loginsignup/:is" element={<LogIn />} />
          <Route path="Student" element={<Home />}>
            <Route
              path="studentGetOrders"
              element={<StudentOrders />}
            />
            <Route path="AddOrder" element={<AddOrder />} />
            <Route path="ReturnProduct" element={<ReturnProduct />} />
            <Route path="AddOrderGroup" element={<AddOrderGroup />} />
          </Route>
          <Route path="/Teacher" element={<Teacher />} />
          <Route path="Admin" element={<AdminLayout />}>
            <Route index element={<Admin />} />
            <Route path="AddProducts" element={<AddProduct />} />
            <Route path="Exl" element={<Exl />} />
            <Route path="FaultyPtod" element={<FoultyItems />} />
            <Route path="summery" element={<Summery />} />
            <Route path="manageorders" element={<ManageOrders />} />
          </Route>
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default MainRouter;

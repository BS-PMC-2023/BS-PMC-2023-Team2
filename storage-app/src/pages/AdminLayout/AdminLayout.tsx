import React, { FC, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./AdminLayout.css";

const AdminLayout: FC = ({}) => {
  //@ts-ignore
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user.isAdmin == "false") {    
      navigate("/");
    }
  }, [])

  return (
    <div className="adminCont">
      <div className="HeaderA">
        <div className="left">
          <p>Welcome to the Admin page</p>
          <div className="headerButtonsA">
            <span className="btnOrange" onClick={() => navigate("/admin/manageorders")}>
              Manage orders
            </span>
            <span
              className="btnOrange"
              onClick={() => navigate("/Admin/AddProducts")}
            >
              add Products
            </span>
            <span className="btnOrange" onClick={() => navigate("/Admin/Exl")}>
              add Students
            </span>
            {/* <span
              className="btnOrange"
              onClick={() => navigate("/Admin/AddProducts")}
            >
              display All Products
            </span> */}
            <span
              className="btnOrange"
              onClick={() => navigate("/Admin/summery")}
            >
              display All Products
            </span>
            <span
              className="btnOrange"
              onClick={() => navigate("/Admin/FaultyPtod")}
            >
              display Faulty Products
            </span>
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default AdminLayout;

import React, { FC } from "react";
import { useAppSelector } from "../../redux/Store";
import { IUser } from "../../redux/userSlice";
import "./home.css";
import { Outlet, useNavigate } from "react-router-dom";
import { Outlet, useNavigate } from "react-router-dom";
import Exl from "../../components/Exl/Exl";
import AddWatingList from "../../components/AddWatingList/AddWatingList";

const Home: FC = ({}) => {
  // @ts-ignore
  const user: IUser = useAppSelector((state) => state.user);
  const navigate = useNavigate();

  return (
    <div>
      <div className="Header">
        <div className="left">
          <p>Your Way To</p>
          <p>Order Products</p>
          <div className="headerButtons">
            {user.isAdmin == "false" ? (
              <>
                <span
                  className="btnOrange"
                  onClick={() => navigate("/Student/addOrder")}
                >
                  Make Order
                </span>
                <span
                  className="btnOrange"
                  onClick={() => navigate("/Student/studentGetOrders")}
                >
                  Your Orders
                </span>
              </>
            ) : (
              <>
                <span
                  className="btnOrange"
                  onClick={() => navigate("/Student")}
                >
                  see orders
                </span>
                <span
                  className="btnOrange"
                  onClick={() => navigate("/admin")}
                >
                  add Products
                </span>
              </>
            )}
          </div>
        </div>
      </div>
      <Outlet />
      {/* <AddWatingList /> */}
    </div>
  );
};

export default Home;

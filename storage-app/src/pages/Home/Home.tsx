import React, { FC, useEffect } from "react";
import { useAppSelector } from "../../redux/Store";
import { IUser } from "../../redux/userSlice";
import "./home.css";
import { Outlet, useNavigate } from "react-router-dom";
import EmailForm from "../../components/EmailForm/EmailForm";
import { useSelector } from "react-redux";

const Home: FC = ({}) => {
  // @ts-ignore
  const user: IUser = useSelector((state:any) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if(user.isAdmin !== 'false') {
      navigate('/admin');
    }
  }, [])

  return (
    <div>
      <div className="Header">
        <div className="left">
          <p>Your Way To</p>
          <p>Order Products</p>
          <div className="headerButtons">
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
          </div>
        </div>
      </div>
      <Outlet />
      <EmailForm />
    </div>
  );
};

export default Home;

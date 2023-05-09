import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/Store";
import { LOGOUT } from "../../redux/userSlice";
import React from "react";
import "./NavBar.css";
import logo from "../../Imeges/logoSCE.png"


const NavBar = () => {
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(LOGOUT());
    navigate("/");
  };

  const handleClick = (e:any) => {
    navigate(`loginsignup/${e.target.id}`);
  };

  return (
    <div className="container">
      <div className="navContainer">
        <img
          className="logo"
          src={logo}
          alt="logo"
          onClick={() => navigate("/")}
        />
        <div className="buttons">
          {user.token !== "" ? (
            <div>
              <button className="btn" onClick={handleLogout}>
                Log Out
              </button>
            </div>
          ) : (
            <div>
              <button className="btn" id="login" onClick={handleClick}>
                Log In
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
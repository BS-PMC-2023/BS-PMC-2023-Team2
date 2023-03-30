import React, { FC, useRef, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../../redux/Store";
import axios from "axios";
import { LOGIN } from "../../redux/userSlice";
import "./LogIn.css";

const LogIn : FC= () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const userParams = useRef({
      firstName: "",
      lastName: "",
      password: "",
      copassword: "",
      email: "",
    });
    const [errors, setErrors] = useState({
      firstName: "",
      lastName: "",
      password: "",
      copassword: "",
      email: "",
    });
  
    //@ts-ignore
    const handleChange = (e) => {
      //@ts-ignore
      userParams.current[e.target.id] = e.target.value;
    };
  
  
    const handleSubmit = async () => {
      try {
console.log(process.env.REACT_APP_URL);

          // const res = await axios.post(
          const res = await axios.post(
            // `http://localhost:${process.env.REACT_APP_URL}/user/login`,
            `http://localhost:4000/user/login`,
            {
              sceName: userParams.current.email,
              password: userParams.current.password,
            }
          );
          
          localStorage.setItem("token", res.data.token);
          // localStorage.setItem("name", res.data.user.userName);
          const redux_promiss = () => {
            return new Promise((resolve) => {
              dispatch(
                LOGIN({
                  name: res.data.user.userName,
                  token: res.data.token,
                })
              );
              resolve("resolved");
            });
          };
          await redux_promiss();
          if(res.data.user.isAdmin){
            navigate("/");
          }else{//not admin
            navigate("/");
          }
      } catch (err) {
        console.log(err);
      }
    };
  
    return (
      <div className="LoginContainer">
        <div id="login" className="login-form-container">
          <header>{"login"}</header>
          <fieldset>
            <div className="input-wrapper">
              <input
                type="text"
                id="email"
                placeholder="your@email.com"
                onChange={handleChange}
              />
            </div>
            {errors.email !== null && <p>{errors.email}</p>}
            <div className="input-wrapper">
              <input
                type="password"
                id="password"
                placeholder="password"
                onChange={handleChange}
              />
            </div>
            {errors.password !== null && <p>{errors.password}</p>}
            <button id="continue" type="button" onClick={handleSubmit}>
              <b>CONTINUE</b>
            </button>
          </fieldset>
        </div>
      </div>
    );
}

export default LogIn
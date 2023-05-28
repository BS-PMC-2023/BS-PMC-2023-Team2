import React, { FC, useRef, useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from "../../redux/Store";
import axios from "axios";
import { LOGIN } from "../../redux/userSlice";
import "./LogIn.css";

const LogIn : FC= () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(state => state.user)
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

    //Check if there is user logged in
    useEffect(()=> {
      if(user.token){    
        if(user.isAdmin == 'true'){
          console.log("admin");
          navigate('/Admin') 
        }else{
          console.log("student");
          navigate('/Student')
        }
      }
    }, [])
  
  
    const handleSubmit = async () => {
      try {
          const res = await axios.post(
            `http://localhost:${process.env.REACT_APP_URL}/user/login`,
            {
              sceName: userParams.current.email,
              password: userParams.current.password,
            }
          );
          
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("name", res.data.user.userName);
          localStorage.setItem("isAdmin", res.data.user.isAdmin ? 'true' : 'false');
          const redux_promiss = () => {
            return new Promise((resolve) => {
              dispatch(
                LOGIN({
                  name: res.data.user.userName,
                  token: res.data.token,
                  isAdmin: res.data.user.isAdmin ? 'true' : 'false'
                })
              );
              resolve("resolved");
            });
          };
          await redux_promiss();
          if(res.data.user.isAdmin){
            navigate("/admin");
          }else{//not admin
            navigate("/student");
          }
      } catch (err) {
        console.log(err);
      }
    };
  
    return (
      <div className="LoginContainer">
        <div id="login" className="login-form-container">
          <header>{"Login"}</header>
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

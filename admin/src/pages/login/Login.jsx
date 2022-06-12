import React, { useState } from "react";
import "./login.css";
import Axios from "axios";
import { API } from "../../constants/env";
import { useDispatch } from "react-redux";
import { addUser } from "../../app/features/userSlide";
export default function Login() {
  const [adminname, setadminname] = useState("");
  const [password, setpassword] = useState("");
  const [error, seterror] = useState("");
  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();
    Axios.post(API + "auth/login", {
      username: adminname,
      password: password,
    })
      .then((result) => {
        if (result.data.level == "admin") {
          const action = addUser(result.data);
          dispatch(action);
          console.log(action);
        } else {
          seterror("Bạn không có quyền");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="container">
      <div className="screen">
        <div className="screen__content">
          <form className="login" onSubmit={handleLogin}>
            <div
              style={{ color: "red", fontWeight: "bold", fontStyle: "italic" }}
            >
              {error}
            </div>
            <div className="login__field">
              <i className="login__icon fas fa-user"></i>
              <input
                value={adminname}
                type="text"
                className="login__input"
                placeholder="User name / Email"
                onChange={(e) => setadminname(e.target.value)}
              />
            </div>
            <div className="login__field">
              <i className="login__icon fas fa-lock"></i>
              <input
                value={password}
                type="password"
                className="login__input"
                placeholder="Password"
                onChange={(e) => setpassword(e.target.value)}
              />
            </div>
            <button className="button login__submit">
              <span className="button__text">Log In Now</span>
              <i className="button__icon fas fa-chevron-right"></i>
            </button>
          </form>
          <div className="social-login">
            <h3>NQH Shop</h3>
            <div className="social-icons">
              <a href="#" className="social-login__icon fab fa-instagram"></a>
              <a href="#" className="social-login__icon fab fa-facebook"></a>
              <a href="#" className="social-login__icon fab fa-twitter"></a>
            </div>
          </div>
        </div>
        <div className="screen__background">
          <span className="screen__background__shape screen__background__shape4"></span>
          <span className="screen__background__shape screen__background__shape3"></span>
          <span className="screen__background__shape screen__background__shape2"></span>
          <span className="screen__background__shape screen__background__shape1"></span>
        </div>
      </div>
    </div>
  );
}

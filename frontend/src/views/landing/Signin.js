import React, { useState, useEffect } from "react";
import "../../css/signin.css";
import Toast from "../../componets/Toast";
import * as ToastMessages from "../../componets/ToastMessages";
import { Axios_user } from "../../api/Axios";
import * as API_ENDPOINTS from "../../api/ApiEndpoints";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { SetUserAction, SetUserId } from "../../actions/UserActions";
import Typewriter from "typewriter-effect";
import io from "socket.io-client";
const socket = io.connect("http://localhost:5001");
export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [IsDisabled, setIsDisabled] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const showToast = (data) => {
    // console.log("showToast :" + data);

    if (data.type == "success") {
      ToastMessages.success(data.message);
      ToastMessages.info("Redirecting to OTP verification");
      localStorage.setItem("otpmail", email);
      setIsDisabled(true);

      // setEmail('');
      // setPassword('');
      // // resetFormData();
      // setIsDisabled(true);

      setTimeout(function () {
        navigate("/otp");
      }, 1000);
    } else if (data.type == "error") {
      ToastMessages.error(data.message);
    } else if (data.type == "warning") {
      localStorage.setItem("otpmail", email);
      ToastMessages.warning(data.message);
      ToastMessages.info("Redirecting to OTP verification");
      setTimeout(function () {
        navigate("/otp");
      }, 1000);
    }
  };
  const handleSubmit = (e) => {
    try {
      if (email == "" || password == "") {
        ToastMessages.error("Please fill required fields");
        return;
      }

      e.preventDefault();
      Axios_user.post(API_ENDPOINTS.SIGNIN_URL, {
        email: email,
        password: password,
      }).then((response) => {
        if (response.data.type == "success") {
          // console.log(response.data.user);

          if (response.data.user) {
            // console.log(response.data.user);

            dispatch(SetUserAction(response.data.user));
            dispatch(SetUserId(response.data.id));
            localStorage.setItem("user_id", response.data.id);
            navigate("/home");
          } else {
            showToast(response.data);
          }
        } else {
          showToast(response.data);
        }
      });
    } catch (e) {
      console.log("e.error");
    }
  };
  return (
    <div className="signInOuterContainer">
      <div
        style={{
          width:"50%",
          height:"60%",
          backgroundColor:"white",
          display:"flex",
          flexDirection:"column",
          justifyContent:"center",
          alignItems:"center",
          borderRadius:"30px",

        }}
      >
        <h1 className="Title">SriTel Communications Service</h1>
        <div className="signInInnerContainer">
          <div className="formFields">
            <div className="signinrow">
              <input
                  className="signInInput"
                  type="text"
                  onChange={(event) => setEmail(event.target.value)}
                  value={email}
                  required
              ></input>
              <label className="signInPlaceholder">User name</label>
            </div>
            <div className="signinrow">
              <input
                  className="signInInput"
                  type="password"
                  onChange={(event) => setPassword(event.target.value)}
                  value={password}
                  required
              ></input>
              <label className="signInPlaceholder">Password</label>
            </div>
            {IsDisabled ? (
                <div className="submitButton">Sign In</div>
            ) : (
                <div className="submitButton" onClick={handleSubmit}>
                  Sign In
                </div>
            )}

            <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginTop: "10px",
                  gap: "10px",
                  textDecoration: "none",
                }}
            >
              <span className="notregisteredtext">Not registered?</span>
              <span
                  className="signInText"
                  style={{ textDecoration: "underline", color: "rgb(0, 66, 131)",fontFamily:"poppins-regular" }}
                  onClick={() => navigate("/signup")}
              >
              Sign up
            </span>
            </div>
          </div>
        </div>
      </div>

      {/* <div className='aboutus' style={{width: '40%'}}>
				<div className='Title' style={{width: '80%'}}>
					About us
				</div>
				<div className='content'>
					<Typewriter
						onInit={(typewriter) => {
							typewriter.typeString('GeeksForGeeks').pauseFor(1000).deleteAll().typeString('Welcomes You').start();
						}}
					/>
				</div>
			</div> */}

      {/* <div className='signInInnerContainer'>
				<div className='formFields'>
					<div className='signinrow'>
						<input className='signInInput' type='text' onChange={(event) => setEmail(event.target.value)} value={email} required></input>
						<label className='signInPlaceholder'>User name*</label>
					</div>
					<div className='signinrow'>
						<input className='signInInput' type='password' onChange={(event) => setPassword(event.target.value)} value={password} required></input>
						<label className='signInPlaceholder'>Password*</label>
					</div>
					{IsDisabled ? (
						<div className='submitButton'>Sign In</div>
					) : (
						<div className='submitButton' onClick={handleSubmit}>
							Sign In
						</div>
					)}

					<div style={{display: 'flex', flexDirection: 'row'}}>
						<span>Not registered?</span>
						<span className='signInText' style={{textDecoration: 'underline', color: 'dodgerblue'}} onClick={() => navigate('/signup')}>
							Sign up
						</span>
					</div>
				</div>
			</div> */}
      <Toast duration={3000} />
    </div>
  );
}

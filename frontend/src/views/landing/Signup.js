import React, { useState } from "react";
import "../../css/signup.css";
import Toast from "../../componets/Toast";
import * as ToastMessages from "../../componets/ToastMessages";
import { Axios_user } from "../../api/Axios";
import * as API_ENDPOINTS from "../../api/ApiEndpoints";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const navigate = useNavigate();

  const showToast = (data) => {
    if (data.type === "success") {
      ToastMessages.success(data.message);
      ToastMessages.info("Redirecting to OTP verification");
      localStorage.setItem("otpmail", email);
      setIsDisabled(true);
      setTimeout(() => {
        navigate("/otp");
      }, 1000);
    } else {
      ToastMessages[data.type](data.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password || !confirmpassword) {
      ToastMessages.error("Please fill in all required fields");
      return;
    }

    if (password !== confirmpassword) {
      ToastMessages.warning("Passwords do not match");
      return;
    }

    try {
      const response = await Axios_user.post(API_ENDPOINTS.SIGNUP_URL, {
        email,
        password,
      });
      showToast(response.data);
    } catch (error) {
      ToastMessages.warning("Something went wrong. Try again later!");
    }
  };

  return (
    <div className="signupOuterContainer">
      <div className="signupCard">
        <h1 className="title">Sri Care Communications Service - Sign Up</h1>
        <div className="signupInnerContainer">
          <form className="formFields" onSubmit={handleSubmit}>
            <div className="signupRow">
              <input
                className="signupInput"
                type="text"
                placeholder="Username"
                onChange={(event) => setEmail(event.target.value)}
                value={email}
                required
              />
            </div>
            <div className="signupRow">
              <input
                className="signupInput"
                type="password"
                placeholder="Password"
                onChange={(event) => setPassword(event.target.value)}
                value={password}
                required
              />
            </div>
            <div className="signupRow">
              <input
                className="signupInput"
                type="password"
                placeholder="Confirm Password"
                onChange={(event) => setConfirmPassword(event.target.value)}
                value={confirmpassword}
                required
              />
            </div>
            <button
              type="submit"
              className={`submitButton ${isDisabled ? "disabled" : ""}`}
              disabled={isDisabled}
            >
              Sign Up
            </button>

            <div className="signInText">
              <span>Already registered?</span>
              <span
                className="signInLink"
                onClick={() => navigate("/")}
              >
                Sign In
              </span>
            </div>
          </form>
        </div>
      </div>
      <Toast duration={3000} />
    </div>
  );
}

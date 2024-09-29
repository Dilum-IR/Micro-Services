import React, { useState } from "react";
import "../../css/signin.css";
import Toast from "../../componets/Toast";
import * as ToastMessages from "../../componets/ToastMessages";
import { Axios_user } from "../../api/Axios";
import * as API_ENDPOINTS from "../../api/ApiEndpoints";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SetUserAction, SetUserId } from "../../actions/UserActions";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
    if (!email || !password) {
      ToastMessages.error("Please fill in all required fields");
      return;
    }

    try {
      const response = await Axios_user.post(API_ENDPOINTS.SIGNIN_URL, {
        email,
        password,
      });

      if (response.data.type === "success") {
        if (response.data.user) {
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
    } catch (error) {
      console.error("Error during sign in:", error);
    }
  };

  return (
    <div className="signInOuterContainer">
      <div className="signInCard">
        <h1 className="title">Sri Care Communications Service</h1>
        <div className="signInInnerContainer">
          <form className="formFields" onSubmit={handleSubmit}>
            <div className="signinRow">
              <input
                className="signInInput"
                type="text"
                placeholder="Username"
                onChange={(event) => setEmail(event.target.value)}
                value={email}
                required
              />
            </div>
            <div className="signinRow">
              <input
                className="signInInput"
                type="password"
                placeholder="Password"
                onChange={(event) => setPassword(event.target.value)}
                value={password}
                required
              />
            </div>
            <button
              type="submit"
              className={`submitButton ${isDisabled ? "disabled" : ""}`}
              disabled={isDisabled}
            >
              Sign In
            </button>

            <div className="signUpText">
              <span>Not registered?</span>
              <span
                className="signUpLink"
                onClick={() => navigate("/signup")}
              >
                Sign up
              </span>
            </div>
          </form>
        </div>
      </div>
      <Toast duration={3000} />
    </div>
  );
}

import { facebookSignIn } from "../../config/firebase-config";
import { useNavigate } from "react-router-dom";
// calling action (redux store)
import { useDispatch } from "react-redux";
import loginBanner from "../../assets/img/login-banner-img.svg";
import logo from "../../assets/img/logo.png";
import "./index.css";
import { useState } from "react";

export default function Login() {
  const [isLoading,setIsLoading] = useState(true);
  const navigate = useNavigate();

  const signInWithFacebook = async () => {
    try {
      await facebookSignIn();
      alert("SignUp Successfull");
      navigate("/home");
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    
    <div className="container login_container">
      <div className="row login_row">
        <div className="col-12 col-md-6 login_info text-center p-5 order-1 order-md-0">
          <h1 className="pb-3 color pt-5">Login To Continue</h1>
          <button
            className="SignIn_Btn"
            style={{ color: "#fff" }}
            onClick={signInWithFacebook}
          >
            Continue With Facebook
          </button>
        </div>
        <div className="col-12 col-md-6 login_banner text-center pt-0 pt-md-5 order-0 order-md-1">

          {isLoading && <div className="spinner-border text-primary" role="status">
  <span className="visually-hidden">Loading...</span>
</div>}
          <img
          src={logo}
          alt=""
          className="banner_img"
          onLoad={() => setIsLoading(false)}
          style={{ display: isLoading ? 'none' : 'inline' }}
          />
          {/* <img className="banner_img" src={logo} alt="" /> */}
          <h1 className="color">Welcome to Q app</h1>
        </div>
      </div>
    </div>
  
  );
}

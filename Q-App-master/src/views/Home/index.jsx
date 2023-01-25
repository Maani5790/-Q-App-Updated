// // 2. Home: Provide two buttons
// Are you a company? (Company)

import { signOut } from "firebase/auth";
import { authentication } from "../../config/firebase-config";
import { useNavigate } from "react-router-dom";
import "./style.css";
import companyPic from "../../assets/img/company.svg";
import userPic from "../../assets/img/findToke.svg";

// Are you finding/waiting for tokens? (Normal User)

export default function Home() {
  const navigate = useNavigate();
  const signOutUser = () => {
    signOut(authentication)
      .then(() => {
        alert("signOut successfull");
      })
      .catch((error) => {
        alert("Error in SignOut" + error);
      });
  };
  return (
    <div className="container pt-5">
      <div
        style={{ width: "1000px", margin: "auto" }}
        className="row company_row"
      >
        <div className="col-8 text-center">
          <img width={"350px"} src={companyPic} alt="" />
          <h1 className="color">Are you a company?</h1>
        </div>
        <div className="col-4 pt-5">
          <button
            className="btn btn-dark color mt-5"
            onClick={() => {
              navigate("/home/company");
            }}
          >
            Click here (company)
          </button>
        </div>
      </div>
      {/* fidings tokens */}
      <div
        className="row"
        style={{ width: "1000px", margin: "auto", border: "2px solid #4ecbc7" }}
      >
        <div className="col-4 text-center pt-5">
          <button
            onClick={() => {
              navigate("/user");
            }}
            className="btn btn-dark color mt-5"
          >
            Click here (Normal User)
          </button>
        </div>
        <div className="col-8 text-center">
          <img width={"300px"} src={userPic} alt="" />
          <h1 className="color" style={{ fontSize: "28px" }}>
            Are you finding/waiting for tokens?
          </h1>
        </div>
      </div>
      <div className="text-center mt-5">
        <button className="btn btn-danger" onClick={signOutUser}>
          SignOut
        </button>
      </div>
    </div>
  );
}

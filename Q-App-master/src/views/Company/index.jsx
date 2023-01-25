import { useState, useEffect } from "react";
import RegisterComp from "../../components/RegisterComp";
import {
  uploadImage,
  addCompanyToDb,
  getCompaniesFromDb,
  authentication,
} from "../../config/firebase-config";

import "./style.css";

const Company = () => {
  let [viewForm, setViewForm] = useState(false);
  let [cName, setCName] = useState("");
  let [since, setSince] = useState("");
  let [fileSelect, setFileSelect] = useState({});
  let [openTime, setOpenTime] = useState("");
  let [closeTime, setCloseTime] = useState("");
  // for registered company
  const [comp, setComp] = useState([]);

  const addCompanytoFirebase = async () => {
    try {
      const imgUrl = await uploadImage(fileSelect);
      await addCompanyToDb(cName, since, openTime, closeTime, imgUrl);
      alert("add Company Successfull");
      setViewForm(false);
    } catch (error) {
      alert(error.message);
    }
  };
  const getCompanyData = async () => {
    const rCompanies = await getCompaniesFromDb();
    setComp(rCompanies);
    console.log("return: " + rCompanies);
  };

  useEffect(() => {
    getCompanyData();
  }, [viewForm]);
  // view companies and add new company
  if (viewForm === false) {
    return (
      <div className="container">
        <div className="text-center">
          <h2 style={{ color: "#4ecbc7" }}>Register New Company</h2>
          <div>
            <button
              className="btn btn-dark color"
              onClick={() => {
                setViewForm(true);
              }}
            >
              Click here
            </button>
          </div>
        </div>

        <h2
          style={{ paddingTop: "50px", color: "#4ecbc7", textAlign: "center" }}
        >
          Registered Companies
        </h2>
        <div className="container company_div_container">
          {comp.length == 0 ? (
            <p>No Registered Company</p>
          ) : (
            comp.map((item) => {
              const { cName, closeTime, openTime, since, id, userId } = item;
              return (
                <RegisterComp
                  cName={cName}
                  closeTime={closeTime}
                  openTime={openTime}
                  since={since}
                  id={id}
                  userId={userId}
                ></RegisterComp>
              );
            })
          )}
        </div>
      </div>
    );
  }
  //   view form of add a company
  if (viewForm) {
    return (
      <div
        style={{
          width: "600px",
          margin: "auto",
          textAlign: "left",
          border: "1px solid grey",
        }}
      >
        <h1 className="color">Add Company</h1>
        <label>
          Enter Your Company Name:
          <input
            type="text"
            placeholder="xyz clinic"
            value={cName}
            onChange={(e) => {
              setCName(e.target.value);
            }}
          />
        </label>
        <br />
        <label>
          Since:
          <input
            type="date"
            placeholder="12-12-2001"
            value={since}
            onChange={(e) => {
              setSince(e.target.value);
            }}
          />
        </label>
        <br />
        <label>
          Certificate of Company
          <input
            type="file"
            //   value={fileSelect}
            onChange={(e) => {
              setFileSelect(e.target.files[0]);
            }}
          />
        </label>
        <br />
        Timing: <br />
        Open:
        <input
          type="time"
          value={openTime}
          onChange={(e) => {
            setOpenTime(e.target.value);
          }}
        />
        Close:
        <input
          type="time"
          value={closeTime}
          onChange={(e) => {
            setCloseTime(e.target.value);
          }}
        />
        <br />
        <button className="btn btn-dark color" onClick={addCompanytoFirebase}>
          Submit
        </button>
      </div>
    );
  }
};

export default Company;

// 3. Company: Here comes a Plus button initially to add your company, after adding the companies list will shown here.
//  Plus Button: This will open a Modal with form consisting of
// Name of company
// Since
// Certificates (Max 3 Images)
// Timings
// Address (Should be searched via foursquare API & can be seen on map)

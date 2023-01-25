import { useEffect, useState } from "react";
import Companies from "../../components/Companies";
import { getAllCompaniesFromDb } from "../../config/firebase-config";
import "./style.css";

const User = () => {
  const [companies, setCompanies] = useState([]);
  // for render-------------------
  const [demo, setDemo] = useState(0);
  const forRender = (randomNum) => { setDemo(randomNum) }
  // -----------------------------  
  const getAllCompFromDB = async () => {
    const companies = await getAllCompaniesFromDb();
    setCompanies(companies);
    console.log("return: " + companies);
  };
  useEffect(() => {
    getAllCompFromDB();

  }, [demo]);
  let x = 0;
  return (
    <div className="container">
      <h1>Buy Tokens</h1>
      <div className="row">
        <div className="col-4 user_section">
          <h3 className="p-1 color">Your Tokens</h3>
        </div>

        <div className="col-8">
          {companies.map((item) => {
            x++;
            const {
              cName,
              openTime,
              closeTime,
              currentToken,
              tokenDate,
              tokenLimit,
              tokenSold,
              tokenTime,
              userId,
              id,
            } = item;

            return (
              <Companies
                cName={cName}
                openTime={openTime}
                closeTme={closeTime}
                currentToken={currentToken}
                tokenTime={tokenTime}
                tokenLimit={tokenLimit}
                tokenSold={tokenSold}
                tokenDate={tokenDate}
                userId={userId}
                id={id}
                x={x}
                forRender={forRender}
              />
            );
          })}

        </div>
      </div>
    </div>
  );
};

export default User;


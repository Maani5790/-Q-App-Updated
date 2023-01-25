import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { authentication } from "../../config/firebase-config";

const RegisterComp = (props) => {
  const { cName, closeTime, openTime, since, id, userId } = props;
  const navigate = useNavigate();
  const goToToken = (id, userId) => {
    navigate(`/home/company/${id}/${userId}`);
  };
  return (
    <div
      className="card"
      style={{
        width: "400px",
        height: "260px",
        border: "4px solid #4ECBC7",
        marginLeft: "5px",
        marginBottom: "5px",
        backgroundColor: "black",
      }}
    >
      <div className="card-body text-center pt-5">
        <h3 className="card-title">{cName}</h3>
        <button
          style={{ color: "#4ecbc7" }}
          type="button"
          className="btn btn-dark mt-3"
          onClick={() => {
            authentication.currentUser.uid == userId
              ? goToToken(id, userId)
              : swal("Sorry!", "Only Owner Of Company Manage Tokens!", "error");
          }}
        >
          Manage Tokens
        </button>
        <p className="card-text mt-3">
          <span>Open: {openTime} </span> | <span> Close: {closeTime}</span>
        </p>
        <p style={{ marginBottom: "0px", fontSize: "14px", color: "grey" }}>
          Since: {since}
        </p>
        {/* <button
          className="btn btn-danger"
          style={{ position: "absolute", top: "0" }}
        >
          Delete Company
        </button> */}
      </div>
    </div>
  );
};

export default RegisterComp;

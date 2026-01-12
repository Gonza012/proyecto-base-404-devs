import React from "react";
import { Link } from "react-router-dom";
import "./Error404.css";

function Error404() {
  return (
    <div className="reContainer">
      <div className="fadeInText">
        <h1 className="youDiedText">YOU DIED</h1>
        <h2 className="errorCode">404 - Page Not Found</h2>

        <p className="reDescription">
          Este camino está cerrado por Los Iluminados.
        </p>
        <Link to="/home" className="reBtn">
          CONTINUE?
        </Link>
      </div>
    </div>
  );
}
export default Error404;

import React from "react";
import Image from "../assets/HamtaroN.webp";

function Card(props) {
  return (
    <div className="col">
      {" "}
      <div className="card text-bg-dark border-light mb-3">
        <div className="card-header">
          <img
            src={props.image}
            className="card-img-top opacity-25 w-25"
            alt="noImage"
          />
        </div>
        <div className="card-body">
          <h5 className="card-title text-truncate">{props.name}</h5>
          <p className="card-text text-truncate">{props.title ? props.title : "No Title"}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
import React from "react";
import { Link } from "react-router-dom";
import '../styles/Link.css'

function Card(props) {
  return (
    <Link to={{pathname: "/player", search: `?player=${props.id}`}} className="noline">
      <div className="col">
        <div className="card text-bg-dark border-light mb-4">
          <div className="card-header">
            <img
              src={props.image}
              className="card-img-top w-25 border border-light"
              alt="noImage"
            />
          </div>
          <div className="card-body">
            <h5 className="card-title text-truncate">{props.name}</h5>
            <p className="card-text text-truncate">
              {props.title ? props.title : "No Title"}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Card;

import React, { useState, useContext, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import { DataContext } from "../helper/DataContext";

function Header() {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");
  const { handleDataChange } = useContext(DataContext);

  const HandleClick = () => {
    console.log("Input value: ", inputValue);
    navigate("/search");
  };

  const HandleInputChange = (e) => {
    e.preventDefault();
    setInputValue(e.target.value);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <h3 className="text-light">Hammy</h3>
          </Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  <h6 className="text-light">Home</h6>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">
                  <h6 className="text-light">About</h6>
                </Link>
              </li>
            </ul>
          </div>
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              name="name"
              value={inputValue}
              placeholder="Search"
              aria-label="Search"
              onChange={HandleInputChange}
            />
            <button
              className="btn btn-outline-success"
              type="submit"
              onClick={HandleClick}
            >
              Search
            </button>
          </form>
        </div>
      </nav>
    </>
  );
}

export default Header;
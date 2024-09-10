import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { createSearchParams, Link, useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");

  const HandleClick = (e) => {
    e.preventDefault();
    console.log("Input value: ", inputValue);
    navigate({
      pathname: "/search",
      search: createSearchParams({ name : inputValue}).toString()
    });
  };

  const HandleInputChange = (e) => {
    e.preventDefault();
    setInputValue(e.target.value);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-dark border-bottom border-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <h3 className="text-light">OverCheck</h3>
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
          <form className="d-flex" role="search" onSubmit={HandleClick}>
            <input
              className="form-control me-2"
              type="text"
              name="name"
              value={inputValue}
              placeholder="Search"
              aria-label="Search"
              onChange={HandleInputChange}
            />
            <button
              className="btn btn-outline-success"
              type="submit"
              disabled={inputValue.length == 0}
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

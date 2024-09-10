import React, { useState } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import '../styles/Home.css'

function Home() {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");

  const HandleClick = (e) => {
    e.preventDefault();
    console.log("Input value: ", inputValue);
    navigate({
      pathname: "/search",
      search: createSearchParams({ name: inputValue }).toString(),
    });
  };

  const HandleInputChange = (e) => {
    e.preventDefault();
    setInputValue(e.target.value);
  };

  return (
    <div className="container min-100">
      <div className="text-light p-5">
        <h1 className="text-light">
          <strong>Welcome to OverCheck</strong>
        </h1>
        <h2 className="text-light p-5">
          A website for searching overwatch data
        </h2>
      </div>
      <div className="container w-75">
        <form className="d-flex py-4 px-2 mx-50" role="search" onSubmit={HandleClick}>
          <input
            className="form-control me-2"
            type="text"
            name="name"
            value={inputValue}
            placeholder="Search Player"
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
    </div>
  );
}

export default Home;

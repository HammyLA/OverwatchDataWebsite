import React, { useContext, useEffect, useState } from "react";
import Card from "../components/Card";
import { DataContext } from "../helper/DataContext";
import { useSearchParams } from "react-router-dom";
import { OverfastClient } from "overfast-api-client";
import "../styles/Home.css";

function Data() {
  const [params, setParams] = useSearchParams();
  const name = params.get("name");
  const ovfast = new OverfastClient();
  const [list, setList] = useState();
  const [offset, setOffset] = useState(0);
  const [total, setTotal] = useState(0);

  const updateVals = (val) => {
    setList([]);
    setOffset((offset) => offset + val);
  };

  useEffect(() => {
    setList(null)
    console.log("received: ", {name})
    ovfast.players
      .searchPlayers(`${name}`, { offset: offset })
      .then((players) => {
        setTotal(players.total);
        setList(players.results);
      });
  }, [offset, name]);

  if (list == null || name != params.get("name")) {
    return (
      <div className="p-5 min-100">
        <div
          class="spinner-grow position-absolute bottom-50 end-50"
          role="status"
        >
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  console.log(offset);

  console.log(list);

  return (
    <div className="p-5 min-100">
      <div className="container-md border border-light rounded bg-dark text-white p-4">
        <h1 className="p-1">Searched for: {name}</h1>
        <h3 className="p-1 text-secondary">{total} Results</h3>
        <div className="row p-3">
          <button
            type="button"
            className="col-2 btn btn-outline-primary"
            disabled={offset <= 0}
            onClick={() => updateVals(-20)}
          >
            Prev
          </button>
          <h3 className="col">
            {offset} - {offset + list.length}
          </h3>
          <button
            type="button"
            className="col-2 btn btn-outline-primary"
            disabled={list.length < 20}
            onClick={() => updateVals(20)}
          >
            Next
          </button>
        </div>
        <ul className="row g-4 row-cols-1 row-cols-md-4">
          {list.map((item, index) => (
            <Card
              key={index}
              id={item.player_id}
              name={item.name}
              image={item.avatar}
              title={item.title}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Data;

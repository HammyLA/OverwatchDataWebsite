import React, { useContext, useEffect, useState } from "react";
import Card from "../components/Card";
import { DataContext } from "../helper/DataContext";
import { useSearchParams } from "react-router-dom";
import { OverfastClient } from "overfast-api-client";

function Data() {
  const [params, setParams] = useSearchParams();
  const name = params.get("name");
  const ovfast = new OverfastClient();
  const [list, setList] = useState([]);
  const [offset, setOffset] = useState(0);
  const [total, setTotal] = useState(0);

  const updateVals = (val) => {
    setList([]);
    setOffset((offset) => offset + val);
  };

  useEffect(() => {
    ovfast.players
      .searchPlayers(`${name}`, { offset: offset })
      .then((players) => {
        setTotal(players.total)
        setList(players.results);
      });
  }, [offset]);

  console.log(offset);

  console.log(list);

  return (
    <div className="p-5">
      <div className="container-fluid bg-dark text-white p-4">
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

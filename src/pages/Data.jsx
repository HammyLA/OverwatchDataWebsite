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
  var play = [];

  useEffect(() => {
    ovfast.players.searchPlayers(`${name}`, {offset : offset}).then((players) => {
      console.log(offset)
      setList(players.results);
    });
  }, []);

  function update(val) {
    
  }


  console.log(list);

  return (
    <div className="p-5">
      <div className="container-fluid bg-dark text-white p-4">
        <h1>{name}</h1>
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
        <div class="btn-group" role="group" aria-label="Basic outlined example">
          <button type="button" class="btn btn-outline-primary">
            Left
          </button>
          <button type="button" class="btn btn-outline-primary">
            Right
          </button>
        </div>
      </div>
    </div>
  );
}

export default Data;

import React from "react";
import PlayerListFormat from "./PlayerListFormat";

function AverageList(props) {
  const data = props.data;

  return (
    <>
      <h2 className="border border-light rounded">Average Per 10 Min</h2>
      <ul className="list-group">
        <li className="list-group-item bg-dark text-white align-start">
          <PlayerListFormat data={data.eliminations} text={"Eliminations"} />
        </li>
        <li className="list-group-item bg-dark text-white">
          <PlayerListFormat data={data.deaths} text={"Deaths"} />
        </li>
        <li className="list-group-item bg-dark text-white">
          <PlayerListFormat data={data.assists} text={"Assists"} />
        </li>
        <li className="list-group-item bg-dark text-white">
          <PlayerListFormat data={data.damage} text={"Damage"} />
        </li>
        <li className="list-group-item bg-dark text-white">
          <PlayerListFormat data={data.healing} text={"Healing"} />
        </li>
      </ul>
    </>
  );
}

export default AverageList;

import React from "react";

function AverageList(props) {
  const data = props.data;

  return (
    <>
      <h2 className="border border-light rounded">Average Per 10 Min</h2>
      <ul className="list-group">
        <li className="list-group-item bg-dark text-white align-start">
          Eliminations: {data.eliminations}
        </li>
        <li className="list-group-item bg-dark text-white">
          Deaths: {data.deaths}
        </li>
        <li className="list-group-item bg-dark text-white">
          Assists: {data.assists}
        </li>
        <li className="list-group-item bg-dark text-white">
          Damage: {data.damage}
        </li>
        <li className="list-group-item bg-dark text-white">
          Healing: {data.healing}
        </li>
      </ul>
    </>
  );
}

export default AverageList;

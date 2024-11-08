import React from "react";
import PlayerListFormat from "./PlayerListFormat";

function CombatList(props) {
  return (
    <div>
      <>
        <h2 className="border border-light rounded">Lifetime Total</h2>
        <ul className="list-group">
          <li className="list-group-item bg-dark text-white">
            <PlayerListFormat
              data={props.data.eliminations}
              text={"Eliminations"}
            />
          </li>
          <li className="list-group-item bg-dark text-white">
            <PlayerListFormat data={props.data.deaths} text={"Deaths"} />
          </li>
          <li className="list-group-item bg-dark text-white">
            <PlayerListFormat data={props.data.assists} text={"Assists"} />
          </li>
          <li className="list-group-item bg-dark text-white">
            <PlayerListFormat data={props.data.damage} text={"Damage"} />
          </li>
          <li className="list-group-item bg-dark text-white">
            <PlayerListFormat data={props.data.healing} text={"Healing"} />
          </li>
        </ul>
      </>
    </div>
  );
}

export default CombatList;

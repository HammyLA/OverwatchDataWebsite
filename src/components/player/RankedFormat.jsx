import React from "react";
import { firstToUpper } from "../../helper/Utility";

function RankedFormat(props) {
  if (props.data.competitive) {
    if (props.data.competitive.pc) {
      return (
        <ul className="list-group">
          <li className="list-group-item bg-dark text-white">
            {props.data.competitive.pc.tank
              ? firstToUpper(props.data.competitive.pc.tank.division) +
                " " +
                props.data.competitive.pc.tank.tier
              : "Unranked"}
          </li>
          <li className="list-group-item bg-dark text-white">
            {props.data.competitive.pc.damage
              ? firstToUpper(props.data.competitive.pc.damage.division) +
                " " +
                props.data.competitive.pc.damage.tier
              : "Unranked"}
          </li>
          <li className="list-group-item bg-dark text-white">
            {props.data.competitive.pc.support
              ? firstToUpper(props.data.competitive.pc.support.division) +
                " " +
                props.data.competitive.pc.support.tier
              : "Unranked"}
          </li>
        </ul>
      );
    } else if (props.data.competitive.console) {
      return (
        <ul className="list-group">
          <li className="list-group-item bg-dark text-white">
            {props.data.competitive.console.tank
              ? props.data.competitive.console.tank.division +
                " " +
                props.data.competitive.console.tank.tier
              : "Unranked"}
          </li>
          <li className="list-group-item bg-dark text-white">
            {props.data.competitive.console.damage
              ? props.data.competitive.console.damage.division +
                " " +
                props.data.competitive.console.damage.tier
              : "Unranked"}
          </li>
          <li className="list-group-item bg-dark text-white">
            {props.data.competitive.console.support
              ? props.data.competitive.console.support.division +
                " " +
                props.data.competitive.console.support.tier
              : "Unranked"}
          </li>
        </ul>
      );
    }
  } else {
    return (
      <ul className="list-group">
        <li className="list-group-item bg-dark text-white">Unranked</li>
        <li className="list-group-item bg-dark text-white">Unranked</li>
        <li className="list-group-item bg-dark text-white">Unranked</li>
      </ul>
    );
  }
}

export default RankedFormat;

import React from "react";

function AverageList(props) {
  return (
    <>
      <h2 className="border border-light rounded">AVG / 10 Min</h2>
      <ul className="list-group">
        <li className="list-group-item bg-dark text-white align-start">
          assists: {props.data.assists_avg_per_10_min}
        </li>
        <li className="list-group-item bg-dark text-white">
          deaths: {props.data.deaths_avg_per_10_min}
        </li>
        <li className="list-group-item bg-dark text-white">
          elims: {props.data.eliminations_avg_per_10_min}
        </li>
        <li className="list-group-item bg-dark text-white">
          final blows: {props.data.final_blows_avg_per_10_min}
        </li>
        <li className="list-group-item bg-dark text-white">
          healing: {props.data.healing_done_avg_per_10_min}
        </li>
        <li className="list-group-item bg-dark text-white">
          damage: {props.data.hero_damage_done_avg_per_10_min}
        </li>
        <li className="list-group-item bg-dark text-white">
          obj contest: {props.data.objective_contest_time_avg_per_10_min}
        </li>
        <li className="list-group-item bg-dark text-white">
          obj elims: {props.data.objective_kills_avg_per_10_min}
        </li>
        <li className="list-group-item bg-dark text-white">
          obj time: {props.data.objective_time_avg_per_10_min}
        </li>
        <li className="list-group-item bg-dark text-white">
          solo elims: {props.data.solo_kills_avg_per_10_min}
        </li>
        <li className="list-group-item bg-dark text-white">
          time on fire: {props.data.time_spent_on_fire_avg_per_10_min}
        </li>
      </ul>
    </>
  );
}

export default AverageList;

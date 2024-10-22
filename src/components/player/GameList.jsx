import React from "react";

function GameList(props) {
  return (
    <>
      <h2 className="border border-light rounded">Game Stats</h2>
      <ul className="list-group">
      <li className="list-group-item bg-dark text-white align-start">
          Hours Players: {props.gamedat.time_played / 3600}
        </li>
        <li className="list-group-item bg-dark text-white align-start">
          Games Played: {props.gamedat.games_played}
        </li>
        <li className="list-group-item bg-dark text-white">
          Games Won: {props.gamedat.games_won}
        </li>
        <li className="list-group-item bg-dark text-white">
          Games Lost: {props.gamedat.games_lost}
        </li>
        <li className="list-group-item bg-dark text-white">
          Win Rate:{" "}
          {(
            (props.gamedat.games_won / props.gamedat.games_played) *
            100
          ).toFixed(2)}
          %
        </li>
        <li className="list-group-item bg-dark text-white">
          KDA:{" "}
          {(
            (props.avgdat.eliminations_avg_per_10_min +
              props.avgdat.assists_avg_per_10_min) /
            props.avgdat.deaths_avg_per_10_min
          ).toFixed(2)}
        </li>
      </ul>
    </>
  );
}

export default GameList;

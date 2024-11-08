import React from "react";
import PlayerListFormat from "./PlayerListFormat";

function GameList(props) {
  const gamedat = props.gamedat;

  return (
    <>
      <h2 className="border border-light rounded">Game Stats</h2>
      <ul className="list-group">
        <li className="list-group-item bg-dark text-white align-start">
          <PlayerListFormat
            data={(gamedat.time_played / 3600).toFixed(0)}
            text={"Hours Played"}
          />
        </li>
        <li className="list-group-item bg-dark text-white align-start">
          <PlayerListFormat
            data={gamedat.games_played}
            text={"Games Played"}
          />
        </li>
        <li className="list-group-item bg-dark text-white">
          <PlayerListFormat data={gamedat.games_won} text={"Games Won"} />
        </li>
        <li className="list-group-item bg-dark text-white">
          <PlayerListFormat data={gamedat.games_lost} text={"Games Lost"} />
        </li>
        <li className="list-group-item bg-dark text-white">
          <PlayerListFormat
            data={gamedat.winrate}
            text={"Win Rate"}
            extra={"%"}
          />
        </li>
        <li className="list-group-item bg-dark text-white">
          <PlayerListFormat data={gamedat.kda} text={"KDA"} />
        </li>
      </ul>
    </>
  );
}

export default GameList;

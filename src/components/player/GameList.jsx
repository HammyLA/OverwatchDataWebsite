import React from "react";

function GameList(props) {
  const gamedat = props.gamedat

  return (
    <>
      <h2 className="border border-light rounded">Game Stats</h2>
      <ul className="list-group">
      <li className="list-group-item bg-dark text-white align-start">
          Hours Played: {(gamedat.time_played / 3600).toFixed(0)}
        </li>
        <li className="list-group-item bg-dark text-white align-start">
          Games Played: {gamedat.games_played}
        </li>
        <li className="list-group-item bg-dark text-white">
          Games Won: {gamedat.games_won}
        </li>
        <li className="list-group-item bg-dark text-white">
          Games Lost: {gamedat.games_lost}
        </li>
        <li className="list-group-item bg-dark text-white">
          Win Rate: {gamedat.winrate}%
        </li>
        <li className="list-group-item bg-dark text-white">
          KDA: {gamedat.kda}
        </li>
      </ul>
    </>
  );
}

export default GameList;

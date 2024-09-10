import React, { useEffect, useMemo, useState } from "react";
import "../styles/Home.css";
import { OverfastClient } from "overfast-api-client";
import { useSearchParams } from "react-router-dom";

function Player() {
  const overfast = new OverfastClient();
  const [params, setParams] = useSearchParams();
  const [data, setData] = useState();
  const [average, setAverage] = useState();
  const [gameData, setGameData] = useState();
  const id = params.get("player");
  useEffect(() => {
    overfast.players
      .player(id)
      .summary()
      .then((summary) => {
        console.log(summary);
        setData(summary);
      });
    overfast.players
      .player(id)
      .career()
      .then((career) => {
        console.log(career["all-heroes"]);
        if (career["all-heroes"]) {
          setAverage(career["all-heroes"].average);
          setGameData(career["all-heroes"].game);
        }
      });
  }, [id]);

  if (!data) {
    return (
      <div className="min-100 ">
        <div
          class="spinner-grow position-absolute bottom-50 end-50"
          role="status"
        >
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  } else if (!average) {
    return (
      <div className="min-100 ">
        <h1>No Data Available</h1>
      </div>
    );
  } else {
    function rankedFormat() {
      console.log("ran through");
      if (data.competitive) {
        if (data.competitive.pc) {
          return (
            <ul className="list-group">
              <li className="list-group-item bg-dark text-white">
                {data.competitive.pc.tank
                  ? data.competitive.pc.tank.division +
                    " " +
                    data.competitive.pc.tank.tier
                  : "Unranked"}
              </li>
              <li className="list-group-item bg-dark text-white">
                {data.competitive.pc.damage
                  ? data.competitive.pc.damage.division +
                    " " +
                    data.competitive.pc.damage.tier
                  : "Unranked"}
              </li>
              <li className="list-group-item bg-dark text-white">
                {data.competitive.pc.support
                  ? data.competitive.pc.support.division +
                    " " +
                    data.competitive.pc.support.tier
                  : "Unranked"}
              </li>
            </ul>
          );
        } else if (data.competitive.console) {
          return (
            <ul className="list-group">
              <li className="list-group-item bg-dark text-white">
                {data.competitive.console.tank
                  ? data.competitive.console.tank.division +
                    " " +
                    data.competitive.console.tank.tier
                  : "Unranked"}
              </li>
              <li className="list-group-item bg-dark text-white">
                {data.competitive.console.damage
                  ? data.competitive.console.damage.division +
                    " " +
                    data.competitive.console.damage.tier
                  : "Unranked"}
              </li>
              <li className="list-group-item bg-dark text-white">
                {data.competitive.console.support
                  ? data.competitive.console.support.division +
                    " " +
                    data.competitive.console.support.tier
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

    const averageList = () => {
      return (
        <>
          <h2 className="border border-light rounded">AVG / 10 Min</h2>
          <ul className="list-group">
            <li className="list-group-item bg-dark text-white align-start">
              assists: {average.assists_avg_per_10_min}
            </li>
            <li className="list-group-item bg-dark text-white">
              deaths: {average.deaths_avg_per_10_min}
            </li>
            <li className="list-group-item bg-dark text-white">
              elims: {average.eliminations_avg_per_10_min}
            </li>
            <li className="list-group-item bg-dark text-white">
              final blows: {average.final_blows_avg_per_10_min}
            </li>
            <li className="list-group-item bg-dark text-white">
              healing: {average.healing_done_avg_per_10_min}
            </li>
            <li className="list-group-item bg-dark text-white">
              damage: {average.hero_damage_done_avg_per_10_min}
            </li>
            <li className="list-group-item bg-dark text-white">
              obj contest: {average.objective_contest_time_avg_per_10_min}
            </li>
            <li className="list-group-item bg-dark text-white">
              obj elims: {average.objective_kills_avg_per_10_min}
            </li>
            <li className="list-group-item bg-dark text-white">
              obj time: {average.objective_time_avg_per_10_min}
            </li>
            <li className="list-group-item bg-dark text-white">
              solo elims: {average.solo_kills_avg_per_10_min}
            </li>
            <li className="list-group-item bg-dark text-white">
              time on fire: {average.time_spent_on_fire_avg_per_10_min}
            </li>
          </ul>
        </>
      );
    };

    const gameList = () => {
      return (
        <>
          <h2 className="border border-light rounded">Game Stats</h2>
          <ul className="list-group">
            <li className="list-group-item bg-dark text-white align-start">
              Games Played: {gameData.games_played}
            </li>
            <li className="list-group-item bg-dark text-white">
              Games Won: {gameData.games_won}
            </li>
            <li className="list-group-item bg-dark text-white">
              Games Lost: {gameData.games_lost}
            </li>
            <li className="list-group-item bg-dark text-white">
              Win Rate:{" "}
              {Math.round((gameData.games_won / gameData.games_played) * 100)}%
            </li>
          </ul>
        </>
      );
    };

    return (
      <div className="min-100">
        <div class="container border border-light bg-dark rounded my-5">
          <div class="row">
            <div class="col-sm-8">
              <div
                className="row border border-light"
                style={{
                  backgroundImage: `linear-gradient(rgba(25,25,25,0.2), rgba(25,25,25,0.7)), url(${data.namecard}`,
                  backgroundSize: "contain",
                }}
              >
                <div className="row p-3">
                  <img
                    src={data.endorsement ? data.endorsement.frame : ""}
                    className="col-2"
                  />
                  <img
                    src={data.avatar}
                    className="col-2 p-1 border border-light"
                  />
                  <div className="col-5 ">
                    <h1>{id}</h1>
                    <h2>{data.title ? data.title : "No Title"}</h2>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-sm-4">
              <div className="row">
                <h2>Ranks</h2>
                <div className="col-4">
                  <ul className="list-group">
                    <li className="list-group-item bg-dark text-white">Tank</li>
                    <li className="list-group-item bg-dark text-white">
                      Damage
                    </li>
                    <li className="list-group-item bg-dark text-white">
                      Support
                    </li>
                  </ul>
                </div>
                <div className="col">{rankedFormat()}</div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-sm">{averageList()}</div>
            <div class="col-sm">{gameList()}</div>
            <div class="col-sm">col-sm</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Player;

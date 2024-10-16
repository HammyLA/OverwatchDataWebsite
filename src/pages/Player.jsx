import React, { useEffect, useMemo, useState } from "react";
import "../styles/Home.css";
import { OverfastClient } from "overfast-api-client";
import { useSearchParams } from "react-router-dom";
import AverageList from "../components/player/AverageList";
import GameList from "../components/player/GameList";
import RankedFormat from "../components/player/RankedFormat";

function Player() {
  const overfast = new OverfastClient();
  const [params, setParams] = useSearchParams();
  const [data, setData] = useState();
  const [average, setAverage] = useState();
  const [gameData, setGameData] = useState();
  const [combat, setCombat] = useState();
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
      .career({ gamemode: "quickplay" })
      .then((career) => {
        console.log(career["all-heroes"]);
        if (career["all-heroes"]) {
          setAverage(career["all-heroes"].average);
          setGameData(career["all-heroes"].game);
          setCombat(career["all-heroes"].combat);
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
                <div className="col"><RankedFormat data={data}/></div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-sm">
              <AverageList data={average} />
            </div>
            <div class="col-sm">
              <GameList avgdat={average} gamedat={gameData} />
            </div>
            <div class="col-sm">col-sm</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Player;

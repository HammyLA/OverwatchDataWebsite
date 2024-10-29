import React, { useEffect, useState } from "react";
import "../styles/Home.css";
import { OverfastClient } from "overfast-api-client";
import { useSearchParams } from "react-router-dom";
import AverageList from "../components/player/AverageList";
import GameList from "../components/player/GameList";
import RankedFormat from "../components/player/RankedFormat";
import CombatList from "../components/player/CombatList";
import axios from "axios";

function Player() {
  const overfast = new OverfastClient();
  const [params, setParams] = useSearchParams();
  const [dataParam, setDataParam] = useState({ gamemode : "quickplay"})
  const [data, setData] = useState();
  const [average, setAverage] = useState();
  const [gameData, setGameData] = useState();
  const [combat, setCombat] = useState();
  const [test, setTest] = useState();
  const id = params.get("player");

  useEffect(() => {
    if (!id) return;
    const url = `https://overfast-api.tekrop.fr/players/${id}/stats/summary`;

    axios.get(url, {params : { gamemode : dataParam.gamemode }}).then((d) => {
      console.log(d.data);
      setGameData(d.data.general);
      setCombat(d.data.general.total);
      setAverage(d.data.general.average);
    });
    overfast.players
      .player(id)
      .summary()
      .then((summary) => {
        setData(summary);
        console.log(data);
      });
  }, [dataParam]);

  function changeMode(mode) {
    console.log(mode)
    setDataParam(prev => ({
      ...prev,
      gamemode : mode
    }))
  }

  if (!data) {
    return (
      <div className="min-100 ">
        <div class="position-absolute bottom-50 end-50">
          <div class="spinner-grow" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <div class="p-4">Fetching Data</div>
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
                className="row-5 m-2 border border-light"
                style={{
                  backgroundImage: `linear-gradient(rgba(25,25,25,0.2), rgba(25,25,25,0.7)), url(${data.namecard}`,
                  backgroundSize: "contain",
                }}
              >
                <div className="row p-3 position-relative">
                  <img
                    src={data.endorsement ? data.endorsement.frame : ""}
                    className="col-2"
                  />
                  <img
                    src={data.avatar}
                    className="col-2 p-1 border border-light"
                  />
                  <div className="col-5">
                    <h1>{id}</h1>
                    <h2>{data.title ? data.title : "No Title"}</h2>
                    <div class="dropdown position-absolute end-0 mx-4" data-bs-theme="dark">
                      <a
                        class="btn btn-dark dropdown-toggle border-secondary"
                        href="#"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        {dataParam.gamemode.toUpperCase()}
                      </a>
                      <ul class="dropdown-menu">
                        <li>
                          <button class="dropdown-item" href="#" type="button" onClick={() => changeMode("quickplay")}>
                            Quickplay
                          </button>
                        </li>
                        <li>
                          <button class="dropdown-item" href="#" type="button" onClick={() => changeMode("competitive")}>
                            Competitive
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-sm-4">
              <div className="row">
                <h2>Season {data.competitive.pc.season} Rank</h2>
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
                <div className="col">
                  <RankedFormat data={data} />
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-sm">
              <AverageList data={average} />
            </div>
            <div class="col-sm">
              {" "}
              <CombatList data={combat} />
            </div>
            <div class="col-sm">
              <GameList gamedat={gameData} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Player;

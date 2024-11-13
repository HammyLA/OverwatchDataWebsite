import React, { useEffect, useState } from "react";
import "../styles/Home.css";
import { OverfastClient } from "overfast-api-client";
import { useSearchParams } from "react-router-dom";
import AverageList from "../components/player/AverageList";
import GameList from "../components/player/GameList";
import RankedFormat from "../components/player/RankedFormat";
import CombatList from "../components/player/CombatList";
import axios from "axios";
import CharacterCard from "../components/player/CharacterCard";

function Player() {
  const overfast = new OverfastClient();
  const [params, setParams] = useSearchParams();
  const [dataParam, setDataParam] = useState({ gamemode: "quickplay" });
  const [summaryData, setSummaryData] = useState();
  const [statsData, setStatsData] = useState();
  const [average, setAverage] = useState();
  const [gameData, setGameData] = useState();
  const [combat, setCombat] = useState();
  const [role, setRole] = useState("any");
  const id = params.get("player");

  useEffect(() => {
    if (!id) return;
    const url = `https://overfast-api.tekrop.fr/players/${id}/stats/summary`;

    axios.get(url, { params: { gamemode: dataParam.gamemode } }).then((d) => {
      console.log(d.data);
      setStatsData(d.data);
    });
    overfast.players
      .player(id)
      .summary()
      .then((summary) => {
        setSummaryData(summary);
        console.log(summaryData);
      });
  }, [dataParam]);

  useEffect(() => {
    if (statsData) {
      if (role == "any") {
        setGameData(statsData.general);
        setCombat(statsData.general.total);
        setAverage(statsData.general.average);
      } else if (role == "damage" && statsData.roles.damage) {
        setGameData(statsData.roles.damage);
        setCombat(statsData.roles.damage.total);
        setAverage(statsData.roles.damage.average);
      } else if (role == "support" && statsData.roles.support) {
        setGameData(statsData.roles.support);
        setCombat(statsData.roles.support.total);
        setAverage(statsData.roles.support.average);
      } else if (role == "tank" && statsData.roles.tank) {
        setGameData(statsData.roles.tank);
        setCombat(statsData.roles.tank.total);
        setAverage(statsData.roles.tank.average);
      }
    }
  }, [statsData, role]);

  function changeMode(mode) {
    console.log(mode);
    setDataParam((prev) => ({
      ...prev,
      gamemode: mode,
    }));
  }

  function changeRole(newrole) {
    console.log(newrole);
    setRole(newrole);
  }

  function seasonNumber(competitiveData) {
    if (competitiveData) {
      if (competitiveData.console) {
        return competitiveData.console.season;
      } else if (competitiveData.pc) {
        return competitiveData.pc.season;
      }
    } else {
      return null;
    }
  }

  if (!summaryData) {
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
  } else if (!statsData || !gameData || !average || !combat) {
    return (
      <div className="min-100">
        <h1>NO DATA AVAILABLE</h1>
      </div>
    );
  } else {
    return (
      <div className="min-100">
        <div class="container border border-light bg-dark rounded my-5">
          <div class="row">
            <div class="col-sm-8">
              <div
                className="container border border-light position-relative"
                style={{
                  backgroundImage: `linear-gradient(rgba(25,25,25,0.2), rgba(25,25,25,0.7)), url(${summaryData.namecard})`,
                  backgroundSize: "contain",
                }}
              >
                <div className="row p-3 position-relative">
                  <img
                    src={
                      summaryData.endorsement
                        ? summaryData.endorsement.frame
                        : ""
                    }
                    className="col-2"
                  />
                  <img
                    src={summaryData.avatar}
                    className="col-2 p-2 border border-light"
                  />
                  <div className="col position-absolute end-25">
                    <h1>{id}</h1>
                    <h2>
                      {summaryData.title ? summaryData.title : "No Title"}
                    </h2>
                    <div className="row position-absolute end-0 mx-4">
                      <div class="dropdown col" data-bs-theme="dark">
                        <a
                          class="btn btn-dark dropdown-toggle border-secondary"
                          href="#"
                          role="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          {role.toUpperCase()}
                        </a>
                        <ul class="dropdown-menu">
                          <li>
                            <button
                              class="dropdown-item"
                              href="#"
                              type="button"
                              onClick={() => changeRole("any")}
                            >
                              Any
                            </button>
                          </li>
                          <li>
                            <button
                              class="dropdown-item"
                              href="#"
                              type="button"
                              onClick={() => changeRole("tank")}
                            >
                              Tank
                            </button>
                          </li>
                          <li>
                            <button
                              class="dropdown-item"
                              href="#"
                              type="button"
                              onClick={() => changeRole("damage")}
                            >
                              Damage
                            </button>
                          </li>
                          <li>
                            <button
                              class="dropdown-item"
                              href="#"
                              type="button"
                              onClick={() => changeRole("support")}
                            >
                              Support
                            </button>
                          </li>
                        </ul>
                      </div>
                      <div class="dropdown col" data-bs-theme="dark">
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
                            <button
                              class="dropdown-item"
                              href="#"
                              type="button"
                              onClick={() => changeMode("quickplay")}
                            >
                              Quickplay
                            </button>
                          </li>
                          <li>
                            <button
                              class="dropdown-item"
                              href="#"
                              type="button"
                              onClick={() => changeMode("competitive")}
                            >
                              Competitive
                            </button>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-sm-4">
              <div className="row">
                <h2>{seasonNumber(summaryData.competitive) ? `Season ${seasonNumber(summaryData.competitive)} Ranked` : "Not Ranked"}</h2>
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
                  <RankedFormat data={summaryData} />
                </div>
              </div>
            </div>
          </div>
          <div class="row my-3">
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
          <div className="my-5">
            <CharacterCard data={statsData.heroes}/>
          </div>
        </div>
      </div>
    );
  }
}

export default Player;

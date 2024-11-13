import React, { useEffect, useState } from "react";
import AverageList from "./AverageList";
import GameList from "./GameList";
import CombatList from "./CombatList";
import { firstToUpper, hyphenToUpper } from "../../helper/Utility";

function CharacterCard(props) {
  const heroList = props.data;
  const [heroData, setHeroData] = useState();
  const [hero, setHero] = useState();

  useEffect(() => {
    var max = 0;
    for (const hero in heroList) {
      if (heroList[hero].games_played > max) {
        max = heroList[hero].games_played;
        setHero(hero);
      }
    }
  }, [heroList]);

  useEffect(() => {
    setHeroData(heroList[hero]);
  }, [hero]);

  if (heroData) {
    return (
      <div className="col">
        <div className="card text-bg-dark border-light mb-4">
          <div className="card-body">
            <h2 className="card-title text-truncate">{hyphenToUpper(hero)}</h2>
            <div class="dropdown col" data-bs-theme="dark">
              <a
                class="btn btn-dark dropdown-toggle border-secondary"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {hyphenToUpper(hero)}
              </a>
              <ul class="dropdown-menu">
                {Object.keys(heroList).map((character) => {
                  return (
                    <li key={character}>
                      <button
                        class="dropdown-item"
                        href="#"
                        type="button"
                        onClick={() => setHero(character)}
                      >
                        {hyphenToUpper(character)}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div class="row my-3">
              <div class="col-sm">
                <AverageList data={heroData.average} />
              </div>
              <div class="col-sm">
                {" "}
                <CombatList data={heroData.total} />
              </div>
              <div class="col-sm">
                <GameList gamedat={heroData} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else
    return (
      <div>
        <h1>None</h1>
      </div>
    );
}

export default CharacterCard;

import React, { useEffect, useState } from "react";
import AverageList from "./AverageList";
import GameList from "./GameList";
import CombatList from "./CombatList";
import { firstToUpper } from "../../helper/Utility";

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
    setHeroData(heroList[hero]);
  }, [heroList, hero]);

  if (heroData) {
    return (
      <div className="col">
        <div className="card text-bg-dark border-light mb-4">
          <div className="card-body">
            <h2 className="card-title text-truncate">{firstToUpper(hero)}</h2>
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

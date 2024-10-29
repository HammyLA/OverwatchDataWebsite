import React from 'react'

function CombatList(props) {
  return (
    <div>
      <>
      <h2 className="border border-light rounded">Lifetime Total</h2>
      <ul className="list-group">
        <li className="list-group-item bg-dark text-white">
          Eliminations: {props.data.eliminations}
        </li>
        <li className="list-group-item bg-dark text-white">
          Deaths: {props.data.deaths}
        </li>
        <li className="list-group-item bg-dark text-white">
          Assists: {props.data.assists}
        </li>
        <li className="list-group-item bg-dark text-white">
          Damage: {props.data.damage}
        </li>
        <li className="list-group-item bg-dark text-white">
          Healing: {props.data.healing}
        </li>
      </ul>
    </>
    </div>
  )
}

export default CombatList

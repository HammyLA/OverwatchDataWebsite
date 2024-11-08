import React from "react";

function PlayerListFormat(props) {
    
  return (
    <div className="row">
      <div className="col">{props.text}</div>
      <div className="col">{props.data}{props.extra}</div>
    </div>
  );
}

export default PlayerListFormat;

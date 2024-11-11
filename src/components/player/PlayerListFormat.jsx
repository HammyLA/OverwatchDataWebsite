import React from "react";

function PlayerListFormat(props) {
  return (
    <div className="d-flex justify-content-between">
      <div>{props.text}</div>
      <div>
        {props.data ? props.data : "0"}
        {props.extra}
      </div>
    </div>
  );
}

export default PlayerListFormat;

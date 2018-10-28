import React from "react";

const TopInfo = props => {
  let areInfo = true;
  let infoList = [];
  if (props.info.length !== 0) {
    areInfo = true;
    infoList = props.info[0];
  }
  return (
    <div>
      {areInfo && props.showInfo ? (
        <ol>
          {infoList.map((info, index) => (
            <li key={info.id}>{info.name}</li>
          ))}
        </ol>
      ) : null}
    </div>
  );
};

export default TopInfo;

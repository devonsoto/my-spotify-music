import React from "react";
import PropTypes from "prop-types";
import MediaCard from "../../Components/MediaCard/MediaCard";

const TopInfo = props => {
  const { showInfo, info, type } = props;
  let areInfo = true;
  let infoList = [];
  if (info.length !== 0) {
    areInfo = true;
    infoList = info[0];
  }

  if (type === "tracks") {
    return (
      <div>
        {areInfo && showInfo ? (
          <div>
            {infoList.map((info, index) => (
              <MediaCard
                key={info.id}
                songName={info.name}
                img={info.album.images[0].url}
                artistName={info.artists[0].name}
              />
            ))}
          </div>
        ) : null}

        {/* {areInfo && pro} */}
      </div>
    );
  } else {
    return (
      <div>
        {areInfo && showInfo ? (
          <div>
            {infoList.map((info, index) => (
              <MediaCard
                key={info.id}
                img={info.images[1].url}
                artistName={info.name}
              />
            ))}
          </div>
        ) : null}

        {/* {areInfo && pro} */}
      </div>
    );
  }
};

TopInfo.propTypes = {
  info: PropTypes.array.isRequired,
  showInfo: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired
};

export default TopInfo;

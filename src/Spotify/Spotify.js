import React, { Component } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import ArtistInfo from "./artistInfo/ArtistInfo";
import PillButton from "../Components/PillButton/PillButton";
import TopInfo from "./topInfo/TopInfo";
import UserInfo from "./userInfo/UserInfo";
import LogInScreen from "../Components/LogInScreen/LogInScreen";
import Header from "../Components/Header/Header";

import "./Spotify.less";

const spotifyApi = new SpotifyWebApi();

class Spotify extends Component {
  constructor() {
    super();
    this.handleArtistButtonClick = this.handleArtistButtonClick.bind(this);
    const params = this.getHashParams();
    const token = params.access_token;
    if (token) {
      spotifyApi.setAccessToken(token);
    }
    this.state = {
      loggedIn: token ? true : false,
      nowPlaying: { name: "Not Checked", albumArt: "" },
      myInfo: { name: "-", followers: "-", myPage: "-" },
      topArtists: [],
      topTracks: [],
      showArtist: false,
      showTracks: false
    };
  }
  getHashParams = () => {
    var hashParams = {};
    var e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    e = r.exec(q);
    while (e) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
      e = r.exec(q);
    }
    return hashParams;
  };

  // start right away
  componentDidMount() {
    this.getNowPlaying();
    this.getMyInfo();
    this.getTopTracks();
    this.getTopArtist();
  }

  getNowPlaying = () => {
    spotifyApi.getMyCurrentPlaybackState().then(response => {
      this.setState({
        nowPlaying: {
          name: response.item.name,
          albumArt: response.item.album.images[0].url
        }
      });
    });
  };

  getMyInfo = () => {
    spotifyApi.getMe().then(response => {
      this.setState({
        myInfo: {
          name: response.id,
          followers: response.followers.total,
          myPage: response.href
        }
      });
    });
  };

  getTopTracks = () => {
    const options = {
      time_range: "short_term"
      // time_range: 'medium_term'
    };
    spotifyApi.getMyTopTracks(options).then(response => {
      this.setState({
        topTracks: [response.items]
      });
    });
  };

  getTopArtist = () => {
    const options = {
      time_range: "short_term"
      // time_range: 'medium_term'
    };
    spotifyApi.getMyTopArtists(options).then(response => {
      this.setState({
        topArtists: [response.items]
      });
    });
  };

  handleArtistButtonClick = () => {
    this.setState({
      showArtist: !this.state.showArtist,
      showTracks: false
    });
  };

  handleTracksButtonClick = () => {
    this.setState({
      showTracks: !this.state.showTracks,
      showArtist: false
    });
  };

  handleLogIn = () => {
    this.setState({
      loggedIn: true
    });
  };

  render() {
    return (
      <div>
        {this.state.loggedIn ? (
          <div>
            <Header />
            <UserInfo
              name={this.state.myInfo.name}
              followers={this.state.myInfo.followers}
            />
            <ArtistInfo
              loggedIn={this.state.loggedIn}
              artistName={this.state.nowPlaying.name}
              albumArt={this.state.nowPlaying.albumArt}
            />
          </div>
        ) : (
          <div>
            <LogInScreen onClick={this.handleLogIn} />
          </div>
        )}

        <div className="Show-Top-Btn">
          <PillButton
            name="Check Now Playing"
            color="secondary"
            onClick={this.getNowPlaying}
            loggedIn={this.state.loggedIn}
          />
        </div>

        <div className="Show-Top-Btn">
          <PillButton
            onClick={this.handleArtistButtonClick}
            color="secondary"
            loggedIn={this.state.loggedIn}
            name="Show Top Artist"
          />
          <PillButton
            onClick={this.handleTracksButtonClick}
            color="secondary"
            loggedIn={this.state.loggedIn}
            name="Show Top Songs"
          />
        </div>

        <div>
          <TopInfo
            info={this.state.topArtists}
            showInfo={this.state.showArtist}
            type="artist"
          />
          <TopInfo
            info={this.state.topTracks}
            showInfo={this.state.showTracks}
            type="tracks"
          />
        </div>
      </div>
    );
  }
}

export default Spotify;

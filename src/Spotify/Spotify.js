import React, { Component } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import LoggedIn from "./logginButton/LogInButton";
import ArtistInfo from "./artistInfo/ArtistInfo";
import UserInfo from "./userInfo/UserInfo";
import TopInfoButton from "./topInfoButton/TopInfoButton";
import TopInfo from "./topInfo/TopInfo";

import "./Spotify.css";

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
    console.log("params: ", params);
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
      console.log("My info:\n", response);
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
      console.log("top tracks:\n", response);
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
      console.log("top artist:\n", response);
      this.setState({
        topArtists: [response.items]
      });
    });
  };

  handleArtistButtonClick = () => {
    this.setState({
      showArtist: !this.state.showArtist
    });
  };

  handleTracksButtonClick = () => {
    this.setState({
      showTracks: !this.state.showTracks
    });
  };

  handleLogIn = () => {
    console.log("test");
    this.setState({
      loggedIn: true
    });
  };

  render() {
    return (
      <div>
        {this.state.loggedIn ? (
          <div>
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
          <LoggedIn onClick={this.handleLogIn} />
        )}

        <div>
          {this.state.loggedIn && (
            <button onClick={() => this.getNowPlaying()}>
              Check Now Playing
            </button>
          )}
        </div>

        <div>
          <TopInfoButton
            onClick={this.handleArtistButtonClick}
            loggedIn={this.state.loggedIn}
            name="Show Top Artist"
          />
          <TopInfoButton
            onClick={this.handleTracksButtonClick}
            loggedIn={this.state.loggedIn}
            name="Show Top Songs"
          />
        </div>

        <div>
          <TopInfo
            info={this.state.topArtists}
            loggedIn={this.state.loggedIn}
            showInfo={this.state.showArtist}
          />
          <TopInfo
            info={this.state.topTracks}
            loggedIn={this.state.loggedIn}
            showInfo={this.state.showTracks}
          />
        </div>
      </div>
    );
  }
}

export default Spotify;

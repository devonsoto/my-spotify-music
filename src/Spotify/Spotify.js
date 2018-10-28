import React, { Component } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import ArtistInfo from "./artistInfo/ArtistInfo";
import PillButton from "../Components/PillButton";
import TopInfo from "./topInfo/TopInfo";
import UserInfo from "./userInfo/UserInfo";

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
      showArtist: !this.state.showArtist
    });
  };

  handleTracksButtonClick = () => {
    this.setState({
      showTracks: !this.state.showTracks
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
          <PillButton
            onClick={this.handleLogIn}
            loggedIn={true}
            name="Log into Spotify"
            color="primary"
            href="http://localhost:8888"
          />
        )}

        <div>
          <PillButton
            name="Check Now Playing"
            color="secondary"
            onClick={this.getNowPlaying}
            loggedIn={this.state.loggedIn}
          />
        </div>

        <div>
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

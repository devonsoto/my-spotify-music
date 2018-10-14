import React, { Component } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import LoggedIn from "./LogInButton";
import ArtistInfo from "./ArtistCover";
import UserInfo from "./UserInfo";
import TopArtist from "./TopArtist";
import TopTracks from "./TopTracks";
import TopTracksButton from "./TopTracksButton";
import TopArtistButton from "./TopArtistButton";
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
      TopTracks: [],
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
        TopTracks: [response.items]
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
          <LoggedIn />
        )}

        <div>
          {this.state.loggedIn && (
            <button onClick={() => this.getNowPlaying()}>
              Check Now Playing
            </button>
          )}
        </div>

        <div className="Buttons">
          <TopArtistButton
            onClick={this.handleArtistButtonClick}
            loggedIn={this.state.loggedIn}
          />
          <TopTracksButton
            onClick={this.handleTracksButtonClick}
            loggedIn={this.state.loggedIn}
          />
        </div>

        <div>
          <TopArtist
            artists={this.state.topArtists}
            loggedIn={this.state.loggedIn}
            showArtist={this.state.showArtist}
          />
          <TopTracks
            tracks={this.state.TopTracks}
            loggedIn={this.state.loggedIn}
            showTracks={this.state.showTracks}
          />
        </div>
      </div>
    );
  }
}

export default Spotify;

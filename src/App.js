import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SignIn from './components/SignIn'
import MapDisplay from './containers/MapDisplay'
import {Route, Switch} from 'react-router-dom'
import Navbar from './containers/Navbar'

const API = 'http://localhost:3001'

class App extends Component {
  constructor(props) {
    super(props)

    this.state={
      myFavCourts: [],
      allCourts: [],
      current_user: false,
      players: []
    }
  }

  render() {
    return (
      <div>
        <Navbar />
        <MapDisplay current_user={this.state.current_user} allCourts={this.state.allCourts}/>
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SignIn from './components/SignIn'
import MapDisplay from './containers/MapDisplay'
import {Route, Switch} from 'react-router-dom'
import Navbar from './containers/Navbar'
import Home from './components/Home'

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

  componentDidMount() {
    fetch(`${API}/courts`)
    .then(res => res.json())
    .then(courtArr => {
      this.setState({
        allCourts: courtArr
      })
    })
  }

  render() {
    return (
      <div>
        <Navbar />
        <Switch>
          <Route path="/map" render={(props) => {
            return (<MapDisplay
              current_user={this.state.current_user}
              allCourts={this.state.allCourts}
              />
            )
          }} />
          <Route component={Home}/>
        </Switch>
      </div>
    );
  }
}

export default App;

// <Switch>
//           <Route path="/napsites/:id" render={(props) => {
//             let napIdInUrl = parseInt(props.match.params.id)
//             let nap = this.state.allNaps.find(nap => nap.id === napIdInUrl)
//             return (<NapDetails
//               setSelectedNap={this.setSelectedNap}
//               nap={nap}
//               onStarClick={this.onStarClick}
//               rating={this.state.rating}
//               />
//             )
//           }} />
//           <Route path="/mynaps" render={() => {
//             return(
//               <MyNapList
//                 clickNap={this.handleRemoveNap}
//                 setSelectedNap={this.setSelectedNap}
//                 myNaps={this.state.myNaps}
//               />
//             )
//           }} />
//           <Route path="/napsites" render={() => {
//             return (
//               <NapList
//                 napsArray={this.state.allNaps}
//                 onSelectNap={this.onSelectNap}
//                 setSelectedNap={this.setSelectedNap}
//               />
//             )
//           }} />
//           <Route component={Home}/>
//         </Switch>

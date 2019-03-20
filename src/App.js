import React, { Component } from 'react';
import './App.css';
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import MapDisplay from './containers/MapDisplay'
import {Route, Switch, Redirect} from 'react-router-dom'
import Navbar from './containers/Navbar'
import About from './components/About'
import MyCourts from './containers/MyCourts'

const API = 'http://localhost:3001'

class App extends Component {
  constructor(props) {
    super(props)

    this.state={
      myCourts: [],
      allCourts: [],
      current_user: null,
      allPlayers: [],
      username: "",
      password: "",
    }
  }

///// updates current_user state to accurately reflect
///// user_courts element upon checking in
  updateCurrentUserState = (updatedUser) => {
    this.setState({
      current_user: {...this.state.current_user, user_courts: [updatedUser.user_courts]}
    })
  }
/////

/////favorites a court by sending POST request to backend and sets
///// myCourts state to have an array of all liked court objects
  favCourt = (courtObj, current_user) => {
    fetch(`${API}/favorite_courts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        user_id: current_user.id,
        court_id: courtObj.id
      })
    })
    this.setState({
      myCourts: [...this.state.myCourts, courtObj]
    })
  }
/////

///// Sends DELETE fetch to backend using custom route to find_by user_id and
///// court_id and delete that instance from favorite_courts table
  unFavCourt = (courtObj, current_user) => {
    console.log(courtObj, current_user)
    fetch(`http://localhost:3001/favorite_courts/${courtObj.id}/${current_user.id}`, {
      method: "DELETE"
    })
    let copyOfState = this.state.myCourts
    let index = copyOfState.findIndex(court => court.id === courtObj.id)
    copyOfState.splice(index, 1)
    this.setState({
      myCourts: copyOfState
    })
  }
/////

    // if (!this.state.myCourts.includes(courtObj)){
    //   this.setState({
    //     myCourts: [...this.state.myCourts, courtObj]
    //   })
    // } else {
    //   let copyOfState = this.state.myCourts
    //   let index = copyOfState.findIndex(court => court.id === courtObj.id)
    //   copyOfState.splice(index, 1)
    //   this.setState({
    //     myCourts: copyOfState
    //   })
    // }


///// checks if user is already checked in at a court and if so returns true and passes it down as a props
///// to CourtCard where courtCard utilizes it in onCheckInClick(line 87)
///// filter creates a new array with all elements that pass the test
  checkIfAtCourt = () => {
    const courts = this.state.allCourts.filter(court => {
      const users = court.users.filter(user => user.id === this.state.current_user.id)
      if (users.length > 0) {
        return users
      }
    })
    if (courts.length > 0) {
      return courts
    } else {
      return false
    }
  }
/////

///// Component Lifecycle for courts and users
  componentDidMount() {
    fetch(`${API}/courts`)
    .then(res => res.json())
    .then(courtArr => {
      this.setState({
        allCourts: courtArr
      })
    })
    fetch(`${API}/users`)
    .then(res => res.json())
    .then(usersArr => {
      this.setState({
        allPlayers: usersArr
      })
    })
  }
/////

///// Changes state in App to reflect user's typed in username and password
  setUserState = (e) => {
    this.setState({
      username: e.target.value
    })
  }

  setPassState = (e) => {
    this.setState({
      password: e.target.value
    })
  }
/////

///// POST fetch to backend to set current_user state as player that is signed in
  handleUserSignIn = (e) => {
    fetch(`${API}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      })
    })
    .then(res => res.json())
    .then(player => {
      if (player === null) {
        alert("Username/password combination does not exist!")
      } else {
        this.setState({
          current_user: player,
          myCourts: player.my_courts
        })
      }
    })
  }
/////

/////Log user out
  handleUserSignOut = () => {
    this.setState({
      current_user: null
    })
  }
/////

  render() {
    return (
      <div className="pages">
      { this.state.current_user ?
        <div>
          <Navbar current_user={this.state.current_user} logout={this.handleUserSignOut}/>
          <Redirect to="/map" />
          <div id="widget" class="scorestream-widget-container" data-ss_widget_type="horzScoreboard" data-user-widget-id="28787"></div>
          <Switch>
            <Route path="/map" render={(props) => {
              return (<MapDisplay
                unFavCourt={this.unFavCourt}
                favCourt={this.favCourt}
                myCourts={this.state.myCourts}
                checkIfAtCourt={this.checkIfAtCourt}
                allPlayers={this.state.allPlayers}
                current_user={this.state.current_user}
                allCourts={this.state.allCourts}
                updateCurrentUserState={this.updateCurrentUserState}
                />
              )
            }} />
            <Route path="/mycourts" render={() => {
              return(
                <MyCourts
                favCourt={this.favCourt}
                unFavCourt={this.unFavCourt}
                updateMyCourts={this.updateMyCourts}
                myCourts={this.state.myCourts}
                checkIfAtCourt={this.checkIfAtCourt}
                allPlayers={this.state.allPlayers}
                current_user={this.state.current_user}
                allCourts={this.state.allCourts}
                updateCurrentUserState={this.updateCurrentUserState}
                />
              )
            }} />
            <Route path="/" render={(props) => {
              return (<About
                current_user={this.state.current_user}
                />
              )
            }}/>
          </Switch>
        </div>
        :
        <div>
          <Navbar current_user={this.state.current_user}/>
          <Switch>
            <Route path="/about" component={About}/>
            <Route path="/signup" component={SignUp}/>
            <Route path="/" render={(props) => {
              return (<SignIn
                username={this.state.username}
                password={this.state.password}
                setUser={this.setUserState}
                setPass={this.setPassState}
                handleUserSignIn={this.handleUserSignIn}
                current_user={this.state.current_user}
                />
              )
            }} />
          </Switch>
        </div>
      }
      </div>
    );
  }
}

export default App;

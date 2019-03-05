import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SignIn from './components/SignIn'
import MapDisplay from './containers/MapDisplay'
import {Route, Switch, Redirect} from 'react-router-dom'
import Navbar from './containers/Navbar'
import About from './components/About'
import SignUp from './components/SignUp'
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

  updateCurrentUserState = (updatedUser) => {
    this.setState({
      current_user: {...this.state.current_user, user_courts: [updatedUser.user_courts]}
    })
  }

  updateMyCourts = (courtObj) => {
    if (!this.state.myCourts.includes(courtObj)){
      this.setState({
        myCourts: [...this.state.myCourts, courtObj]
      })
    } else {
      alert("Already favorited!")
    }
  }

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
          current_user: player
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
          <Switch>
            <Route path="/map" render={(props) => {
              return (<MapDisplay
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
            <Route path="/mycourts" render={() => {
              return(
                <MyCourts
                myCourts={this.state.myCourts}
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

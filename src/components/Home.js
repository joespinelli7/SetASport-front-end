import React from 'react'
import {Route, Link} from 'react-router-dom'

const Home = (props) => {
  return(
    <div>
      {props.current_user ?
        <Link to="/map">Map</Link>
        :
        <Link to="/signin">Signin</Link>
      }
    </div>
  )
}

export default Home

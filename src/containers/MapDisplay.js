import React from 'react'
import ReactMapboxGl, { Layer, Feature, Popup } from "react-mapbox-gl";
// import ReactMapGL, {Popup} from 'react-map-gl';
import Button from '@material-ui/core/Button';
import CourtCard from '../components/CourtCard'
import './MapDisplay.css';
import CourtName from '../components/CourtName'

const Map = ReactMapboxGl({
   accessToken: process.env.REACT_APP_SETASPORT_ACCESS_KEY
})

const API = 'http://localhost:3001'

class MapDisplay extends React.Component {
  constructor(props) {
    super(props)

    this.state={
      center: [-77.031964, 38.8907338],
      zoom: [12],
      courtDetails: {},
      expanded: false,
      hover: false
    }
  }

/////handles Current players here btn by dropping down a list of all players playing at that location
  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };
/////

/////renders courtCard component and resizes map
  handleOnClick = (focusObj) => {
    this.setState({
      courtDetails: focusObj,
      center: [focusObj.longitude, focusObj.latitude],
      zoom: [15]
    })
  }
/////

/////clears CourtCard off page
  handleClearCourt = () => {
    this.setState({
      courtDetails: {}
    })
  }
/////

/////changes state of hover to in
  changeHoverStateIn = (courtObj) => {
    this.setState({
      hover: true
    })
    console.log(this.state.hover)
  }
/////

/////changes state of hover to out
  changeHoverStateOut = () => {
    this.setState({
      hover: false,
    })
    console.log(this.state.hover)
  }
/////

  render() {
    return(
      <Map
        //style of map
        style="mapbox://styles/joespinelli7/cjsf209ls27js1fmvwmnh29gf"
        containerStyle={{
          height: "100vh",
          width: "100vw"
        }}
        center={this.state.center}
        zoom={this.state.zoom}
      >
      <div className="featureCard">
        {this.state.courtDetails.name ?
          <CourtCard
            current_user={this.props.current_user}
            featureToShow={this.state.courtDetails}
            clearFeature={this.handleClearCourt}
            expanded={this.state.expanded}
            handleExpandClick={this.handleExpandClick}
            checkIfAtCourt={this.props.checkIfAtCourt}
          />
          :
          null
        }
      </div>
      <Layer type="circle" id="marker" paint={{
         'circle-color': "blue",
         'circle-stroke-width': 2.5,
         'circle-stroke-color': 'blue',
         'circle-stroke-opacity': 1
      }}>
        {this.props.allCourts.map(courtObj =>
          <Feature
            key={courtObj.id}
            coordinates={[courtObj.longitude, courtObj.latitude]}
            onClick={() =>
              {this.handleOnClick(courtObj)}
            }
            onMouseEnter={() => this.changeHoverStateIn()}
            onMouseLeave={() => this.changeHoverStateOut()}
          />
        )}
      </Layer>
      </Map>
    )
  }
}

export default MapDisplay

//for hover
// {this.state.hover ?
//   <div>
//   {console.log("hey")}
//   <Popup latitude={38.909034} longitude={77.0215468} closeButton={true} closeOnClick={false} anchor="top">
//     <div>You are here</div>
//   </Popup>
//   </div>
//   :
//   null
// }

// <CourtCard courtObj={courtObj} clickFeature={this.clickFeature}/>
// <Feature coordinates={[-77.0465759, 38.8949789]}/>
// <CourtCard courtObJId={courtObj.id} showCard={this.state.courtPop}/>

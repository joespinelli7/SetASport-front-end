import React from 'react'
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";
import Button from '@material-ui/core/Button';
import CourtCard from '../components/CourtCard'
import './MapDisplay.css';

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
      courtDetails: {}
    }
  }

  //renders courtCard component and resizes map
  handleOnClick = (focusObj) => {
    this.setState({
      courtDetails: focusObj,
      center: [focusObj.longitude, focusObj.latitude],
      zoom: [15]
    })
  }

  //clears CourtCard off page
  handleClearCourt = () => {
    this.setState({
      courtDetails: {}
    })
    console.log(this.state.courtDetails)
  }

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
        {this.state.courtDetails.name ? <CourtCard featureToShow={this.state.courtDetails} clearFeature={this.handleClearCourt}/> : null}
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
          />
        )}
      </Layer>
      </Map>
    )
  }
}

// <CourtCard courtObj={courtObj} clickFeature={this.clickFeature}/>
// <Feature coordinates={[-77.0465759, 38.8949789]}/>
// <CourtCard courtObJId={courtObj.id} showCard={this.state.courtPop}/>

export default MapDisplay

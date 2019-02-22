import React from 'react'
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";

const Map = ReactMapboxGl({
   accessToken: process.env.REACT_APP_SETASPORT_ACCESS_KEY
})

class MapDisplay extends React.Component {
  constructor(props) {
    super(props)

    this.state={
      center: [-77.031964, 38.8907338],
      zoom: [12.8],
    }
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
      <Layer type="circle" id="marker" paint={{
         'circle-color': "blue",
         'circle-stroke-width': 1,
         'circle-stroke-color': '#fff',
         'circle-stroke-opacity': 1
      }}>
        {this.props.allCourts.map(courtObj =>
          <Feature coordinates={[courtObj.longitude, courtObj.latitude]}/>
        )}
      </Layer>
      </Map>
    )
  }
}
// <Feature coordinates={[-77.0465759, 38.8949789]}/>

export default MapDisplay

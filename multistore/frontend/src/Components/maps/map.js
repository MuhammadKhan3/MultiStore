import React from 'react'
import {GoogleMap,useLoadScript} from '@react-google-maps/api'
const center={
  lat:31.5204,
  lng:74.3587,
};
const libraries=["places"];
const mapContainerStyle={
  width:"100%",
  height:"100%",
};
function Maps() {
  const {isLoaded,loadError}=useLoadScript({
    googleMapsApiKey:'https://maps.googleapis.com/maps/api/js?sensor=false&callback=myMap',
    libraries,
  });

  if(loadError){
    return "loading error in map";
  }
  if(!isLoaded){
   return   "loading map";
  }

  return (<div>
    <GoogleMap
    zoom={8}
    center={center}
    mapContainerStyle={mapContainerStyle}
    >
    </GoogleMap>
    </div>)
}
export default Maps;
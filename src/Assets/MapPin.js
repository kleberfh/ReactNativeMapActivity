import React from "react";
import {Svg, Path, Circle} from "react-native-svg";

const MapPin = ({color = '#2986cc'}) => {
 return (
   <Svg
     xmlns="http://www.w3.org/2000/svg"
     width="32"
     height="32"
     viewBox="0 0 24 24"
     fill={color}
     stroke={color === '#000' ? '#666' : '#000'}
     strokeWidth="2"
     strokeLinecap="round"
     strokeLinejoin="round"
     className="feather feather-map-pin"
   >
     <Path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
     <Circle cx="12" cy="10" r="3"/>
   </Svg>
 )
}

export default MapPin;
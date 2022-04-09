import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css'


const createRoutineMachineLayer = (props) => {  
  const data = props.data;  
  const startTrip = JSON.parse(data.startCoord) 
  const endTrip = JSON.parse(data.endCoord)

  const greenIcon = new L.Icon({
    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.4/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
  const blueIcon = new L.Icon({
    iconUrl: 'https://cdn.jsdelivr.net/gh/pointhi/leaflet-color-markers@master/img/marker-icon-blue.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.4/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
  const instance = L.Routing.control({
    position: 'topleft', // Where to place control on the map
    waypoints: [
      // L.latLng(18.50530527841973, 73.9452629693118), // Start Point
      // L.latLng(18.941161114051003, 72.82725365323981) // End Point
      L.latLng(startTrip[0], startTrip[1]),
      L.latLng(endTrip[0], endTrip[1])
    ],
    lineOptions: { // Options for the routing line
      styles: [
        {
          color: '#757de8',
        },
      ],
    },
    createMarker: function (i, wp, nWps) {
      if (i === 0 || i === nWps - 1) {        
        return L.marker(wp.latLng, { icon: greenIcon });
      } else {
        return L.marker(wp.latLng, { icon: blueIcon });
      }
    },          
  });

  return instance;
};
const RoutingMachine = createControlComponent(createRoutineMachineLayer);

export default RoutingMachine;
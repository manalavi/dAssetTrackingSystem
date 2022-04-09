import blueC from '../images/blueC.png'
import darkgreenC from '../images/darkgreen.png'
import greenC from '../images/greenC.png'
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { RoutingMachine, RoutingMachine2, RoutingMachine3 } from "./MainRouteControl";
import { delivery } from "../utils/firebase"
import { useEffect, useState } from 'react';
import deliveryIcon from '../images/delivery.png'

//console.info(delivery.d1.currentLat);
const coordFirebase = [ //just garbage data
    [21.4975, 74.7898],
    [19.0760, 72.8777],
    [19.5204, 73.8567]
];

export default function Map(props) {
    const [map, setMap] = useState(null);
    const d1Icon = new L.icon({
        iconUrl: blueC,                
        iconSize: [30, 50],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
        // className: 'leaflet-div-icon'
    })
    const d2Icon = new L.icon({
        iconUrl: darkgreenC,
        iconSize: [30, 50],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
        // className: 'leaflet-div-icon'
    })
    const d3Icon = new L.icon({
        iconUrl: greenC,
        iconSize: [30, 50],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
        // className: 'leaflet-div-icon'
    })


    //data for popups. need to connect with your dashboard to get data of product to deliver
    const delData = {
        d1: { name: "Vinay", code: "d1", status: "False", color:'red'},
        d2: { name: "Yash", code: "d2", status: "False", color:'green' },
        d3: { name: "Om", code: "d3", status: "False", color:'voilet'},
    };
    // console.log(delivery.d1, "data",props.data.d1)
    const [cord1, setCord1] = useState([coordFirebase]);
    const [cord2, setCord2] = useState([coordFirebase]);
    const [cord3, setCord3] = useState([coordFirebase]);

    // const[stat1, setStat1] = useState([delData.d1.status])
    // const[stat2, setStat2] = useState([delData.d2.status])
    // const[stat3, setStat3] = useState([delData.d3.status])
    //console.log(props.data)
    // const delivery = {};
    //useEffect(() => {
    setInterval(() => {

        //let coordArray = [props.data]
        coordFirebase[0] = [props.data.d1.currentLat, props.data.d1.currentLong]
        coordFirebase[1] = [props.data.d2.currentLat, props.data.d2.currentLong]
        coordFirebase[2] = [props.data.d3.currentLat, props.data.d3.currentLong]
        //setCord(coordArray)
        // console.log(cord[0].d1.currentLat)
        setCord1(coordFirebase[0])
        setCord2(coordFirebase[1])
        setCord3(coordFirebase[2])

        // delData.d1.status = [props.data.d1.status]
        // delData.d2.status = [props.data.d2.status]
        // delData.d3.status = [props.data.d3.status]

        // setStat1(delData.d1.status)
        // setStat2(delData.d2.status)
        // setStat3(delData.d3.status)
        // console.info(coordFirebase[0])
        // console.info(coordFirebase[1])
        // console.info(coordFirebase[2])


    }, 3000)
    const maps = {
        base: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    };

    return (
        <MapContainer
            center={[19.760658172566412, 74.77601941145802]}
            zoom={20}
            zoomControl={true}
            style={{ height: "100vh", width: "100%", padding: 0 }}
            whenCreated={map => setMap(map)}
        >
            <RoutingMachine />
            <RoutingMachine2 />
            <RoutingMachine3 />
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url={maps.base}
            />
            <Marker position={coordFirebase[0]} icon={d1Icon} >
                <Popup>
                    Name: {delData.d1.name} <br />
                    Driver Code: {delData.d1.code} <br />                    
                </Popup>
            </Marker>
            <Marker position={coordFirebase[1]} icon={d2Icon}>
                <Popup>
                    Name: {delData.d2.name} <br />
                    Driver Code: {delData.d2.code} <br />
                </Popup>
            </Marker>
            <Marker position={coordFirebase[2]} icon={d3Icon} >
                <Popup>
                    Name: {delData.d3.name} <br />
                    Driver Code: {delData.d3.code} <br />
                </Popup>
            </Marker>
        </MapContainer>
    )
    {/* <MapContainer id="mapId" center={[19.2029, 72.8518 ]} zoom={12}>
    <TileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    />
    <Marker position={coordFirebase[0]}>
        <Popup>
          Name: {delData.d1.name} <br /> 
          Driver Code: {delData.d1.code} <br />
          On Delivery Status: {delData.d1.status}
        </Popup>
      </Marker>
      <Marker position={coordFirebase[1]}>
        <Popup>
        Name: {delData.d2.name} <br /> 
          Driver Code: {delData.d2.code} <br />
          On Delivery Status: {delData.d2.status}
        </Popup>
      </Marker>
      <Marker position={coordFirebase[2]}>
        <Popup>
        Name: {delData.d3.name} <br /> 
          Driver Code: {delData.d3.code} <br />
          On Delivery Status: {delData.d3.status}
        </Popup>
      </Marker>
      <RoutingMachine />
      <RoutingMachine2 />
      <RoutingMachine3 />
    </MapContainer> */}

}

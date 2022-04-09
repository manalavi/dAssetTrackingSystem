import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";
import Map from './MainRouteMap'

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

const createRoutineMachineLayer = (props) => {

    const location = [
        [19.295233, 72.854393],
        [19.20622456784226, 72.87456367500387],
        [19.12254879253744, 72.84746308363131]
    ];
    const points = [];
    for (let i = 0; i < location.length; i++) {
        points.push(L.latLng(location[i]))
    }
    const instance = L.Routing.control({
        waypoints: points,

        lineOptions: {
            styles: [{ color: "#FF0000", weight: 4 }]
        },
        createMarker: function (i, wp, nWps) {
            if (i === 0 || i === nWps - 1) {
                return L.marker(wp.latLng, { icon: greenIcon }).bindPopup('General Hospital');
            } else {
                return L.marker(wp.latLng, { icon: blueIcon }).bindPopup('General Hospital');
            }
        },
        show: false,
        addWaypoints: false,
        // routeWhileDragging: true,
        draggableWaypoints: false,
        // fitSelectedRoutes: true,
        // showAlternatives: false
    });

    return instance;

};


const RoutingMachine = createControlComponent(createRoutineMachineLayer);


const createRoutineMachineLayer2 = (props) => {

    const location2 = [
        [19.9975, 73.7898],
        [19.0948, 74.7480],
        [18.5204, 73.8567]
    ];
    const points2 = [];
    for (let i = 0; i < location2.length; i++) {
        points2.push(L.latLng(location2[i]))
    }
    const instance2 = L.Routing.control({
        waypoints: points2,
        // [
        //   L.latLng(20.9975, 73.7898),
        //   L.latLng(21.0760, 72.8777)
        // ],
        lineOptions: {
            styles: [{ color: "#0000FF", weight: 4 }]
        },
        createMarker: function (i, wp, nWps) {
            if (i === 0 || i === nWps - 1) {
                return L.marker(wp.latLng, { icon: greenIcon }).bindPopup('General Hospital');
            } else {
                return L.marker(wp.latLng, { icon: blueIcon });
            }
        },
        show: false,
        addWaypoints: false,
        // routeWhileDragging: true,
        draggableWaypoints: false,
        // fitSelectedRoutes: true,
        // showAlternatives: false
    });

    return instance2;

};

const RoutingMachine2 = createControlComponent(createRoutineMachineLayer2);


const createRoutineMachineLayer3 = (props) => {

    const location3 = [
        [20.5579, 74.5089],
        [20.3893, 72.9106],
        [19.9975, 73.7898]
    ];
    const points3 = [];
    for (let i = 0; i < location3.length; i++) {
        points3.push(L.latLng(location3[i]))
    }

    const instance3 = L.Routing.control({
        waypoints: points3,
        // [
        //   L.latLng(20.9975, 73.7898),
        //   L.latLng(21.0760, 72.8777)
        // ],
        lineOptions: {
            styles: [{ color: "#FFA500", weight: 4 }]
        },
        createMarker: function (i, wp, nWps) {
            if (i === 0 || i === nWps - 1) {
                return L.marker(wp.latLng, { icon: greenIcon }).bindPopup('General Hospital');
            } else {
                return L.marker(wp.latLng, { icon: blueIcon });
            }
        },
        show: false,
        addWaypoints: false,
        // routeWhileDragging: true,
        draggableWaypoints: false,
        // fitSelectedRoutes: true,
        // showAlternatives: false
    });

    return instance3;

};

const RoutingMachine3 = createControlComponent(createRoutineMachineLayer3);

export { RoutingMachine3, RoutingMachine2, RoutingMachine };


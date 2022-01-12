/* eslint-disable no-undef */

import logo from "./logo.svg";
import "./App.css";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { useEffect } from "react";

import { initializeApp } from "firebase/app";
import {
  getDatabase,
  ref,
  set,
  onValue,
  get,
  child,
  database,
  DataSnapshot,
} from "firebase/database";

const mapStyles = {
  width: "100%",
  height: "100%",
};

const libraries = ["places"];
const mapContainerStyle = {
  width: "100vw",
  height: "100vh",
};
const center = {
  lat: 46.755852,
  lng: 23.594432,
};
const options = {
  fullscreenControl: true,
  fullscreenControlOptions: {
    position: 10,
  },
  disableDefaultUI: true,
  styles: [
    {
      featureType: "transit",
      elementType: "labels.icon",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "poi",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "road",
      stylers: [{ visibility: "on" }],
    },
  ],
};

const firebaseConfig = {
  apiKey: "AIzaSyBGQnBS_FAF7xkxuc73_G5Um5XUnQ4NN0w",
  authDomain: "wasteinput.firebaseapp.com",
  databaseURL:
    "https://wasteinput-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "wasteinput",
  storageBucket: "wasteinput.appspot.com",
  messagingSenderId: "62047734231",
  appId: "1:62047734231:web:93bb227bceef08b6116392",
};

let waypoints = [];

let waypoints2 = [
  { lat: 46.754516, lng: 23.596608 },
  { lat: 46.751362, lng: 23.594867 },
  { lat: 46.754986, lng: 23.592378 },
];

const fbapp = initializeApp(firebaseConfig);
const db = getDatabase(fbapp);

const starCountRef = ref(db, "GarbageData");
onValue(starCountRef, (snapshot) => {
  const data = snapshot.val();
  snapshot.forEach(function (childSnapshot) {
    var value = childSnapshot.val();
    waypoints.push([value.lat, value.log, value.pollution_rate]);
  });
});

function display_array() {
  for (var i = 0; i < waypoints.length; i++) {
    console.log(
      waypoints[i][0] + " " + waypoints[i][1] + " " + waypoints[i][2]
    );
  }
}

// function calculate_furthest_point() {
//   var origin1 = new window.google.maps.LatLng(46.754516, 23.596608);
//   var origin2 = new window.google.maps.LatLng(46.753906, 23.582223);
//   var destinationA = new window.google.maps.LatLng(46.751362, 23.594867);
//   var destinationB = new window.google.maps.LatLng(46.754986, 23.592378);

//   var service = new window.google?.maps.DistanceMatrixService();
//   service.getDistanceMatrix(
//     {
//       origins: [origin1, origin2],
//       destinations: [destinationA, destinationB],
//       travelMode: "DRIVING",
//       transitOptions: TransitOptions,
//       drivingOptions: DrivingOptions,
//       unitSystem: UnitSystem,
//       avoidHighways: Boolean,
//       avoidTolls: Boolean,
//     },
//     callback
//   );

//   // callback()

//   function callback(response, status) {
//     if (status == "OK") {
//       var origins = response.originAddresses;
//       var destinations = response.destinationAddresses;

//       for (var i = 0; i < origins.length; i++) {
//         var results = response.rows[i].elements;
//         for (var j = 0; j < results.length; j++) {
//           var element = results[j];
//           var distance = element.distance.text;
//           var duration = element.duration.text;
//           var from = origins[i];
//           var to = destinations[j];
//           console.log(
//             "DISTANCE : " + distance + " FROM: " + from + " TO: " + to
//           );
//         }
//       }
//     } else console.log("ERROR");
//   }
// }

display_array();
// calculate_furthest_point();

//var zorilor = new google.maps.LatLng(46.754516, 23.596608);

var mypos = { lat: 46.754986, lng: 23.592378 };

// const [map, setMap] = React.useState(null);

// const onLoad = React.useCallback(function callback(map) {
//   const bounds = new window.google.maps.LatLngBounds();
//   map.fitBounds(bounds);
//   setMap(map);
// }, []);

// const onUnmount = React.useCallback(function callback(map) {
//   setMap(null);
// }, []);

export default function App() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyA_phYsSvp-0Jh-M9dggJgl-dkUQy76xP0",
    //libraries,
  });

  if (loadError) return "ERROR loading maps";
  if (!isLoaded) return "LOADING MAPS";

  return (
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={15}
        center={center}
        options={options}
        resetBoundsOnResize={true}
      >
        <Marker
          position={mypos}
          icon={{
            url: "mark.png",
            scaledSize: new window.google.maps.Size(100, 100),
            origin: new window.google.maps.Point(0, 0),
            anchor: new window.google.maps.Point(50, 50),
          }}
        />
        <Marker
          position={{ lat: 46.754516, lng: 23.596608 }}
          icon={{
            url: "mark.png",
            scaledSize: new window.google.maps.Size(100, 100),
            origin: new window.google.maps.Point(0, 0),
            anchor: new window.google.maps.Point(50, 50),
          }}
        />
        <Marker
          position={{ lat: 46.755787, lng: 23.593907 }}
          icon={{
            url: "mark.png",
            scaledSize: new window.google.maps.Size(100, 100),
            origin: new window.google.maps.Point(0, 0),
            anchor: new window.google.maps.Point(50, 50),
          }}
        />
        <Marker position={{ lat: 46.751362, lng: 23.594867 }} />
      </GoogleMap>
    </div>
  );
}

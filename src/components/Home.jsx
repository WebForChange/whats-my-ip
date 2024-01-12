import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const Home = (props) => {
  const API_KEY = props.API_KEY;
  const [userIp, setUserIp] = useState(null);
  const [userLocation, setUserLocation] = useState(null);

  async function getUserIP() {
    try {
      const response = await axios.get(
        `https://api.ipify.org?format=json&apiKey=${API_KEY}`
      );
      setUserIp(response.data.ip);
    } catch (error) {
      console.error("Error fetching IP address:", error);
      return null;
    }
  }

  async function getUserLocation() {
    try {
      const response = await axios.get(
        `https://geo.ipify.org/api/v1?apiKey=${API_KEY}`
      );
      const { location } = response.data;
      console.log("location: ", [location.lat, location.lng]);
      setUserLocation([location.lat, location.lng]);
    } catch (error) {
      console.error("Error fetching geolocation data:", error);
    }
  }

  useEffect(() => {
    getUserIP();
    getUserLocation();
  }, []);

  if (!userIp | !userLocation)
    return (
      <div className="bg-black text-white w-full min-h-screen flex justify-center items-center">
        <p>Loading...</p>
      </div>
    );
  return (
    <div className="bg-black text-white w-full min-h-screen flex justify-center items-center">
      <div className="bg-zinc-800 w-160 p-6 rounded flex flex-row justify-center items-center">
        <div className="flex flex-col">
          <p>Your ip is: {userIp}</p>
          <p>
            Your location is: {userLocation[0]}, {userLocation[1]}
          </p>
        </div>
        <MapContainer
          className="h-80 w-full"
          center={userLocation}
          zoom={8}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={userLocation}>
            <Popup>Your Location.</Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};

export default Home;

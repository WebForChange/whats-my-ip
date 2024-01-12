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
      console.log("location: ", location);
      setUserLocation(location);
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
    <div className="bg-black text-white w-full min-h-screen flex flex-col justify-center items-center">
      <h2 className="pb-6 text-2xl font-bold tracking-widest">What's my IP?</h2>
      <p className="bg-zinc-500 mb-6 py-2 px-4 rounded font-bold tracking-widest">
        YOUR IP: {userIp}
      </p>
      <div className="bg-zinc-800 w-2/3 p-6 rounded flex flex-row ">
        <div className="flex basis-40 grow flex-col">
          <p>
            Your location: {userLocation.lat}, {userLocation.lng}
          </p>
          <p>Country: {userLocation.country}</p>
          <p>Region: {userLocation.Catalunya}</p>
          <p>Timezone: {userLocation.timezone}</p>
        </div>
        <MapContainer
          className="h-80 flex basis-40 grow rounded"
          center={[userLocation.lat, userLocation.lng]}
          zoom={4}
          scrollWheelZoom={true}
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

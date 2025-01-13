import React from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import ReactDOMServer from 'react-dom/server';
import "leaflet/dist/leaflet.css"
import { LatLngExpression } from "leaflet";
import L from 'leaflet';
import './map.css';
import { FaMicrophone } from "react-icons/fa";
import { IPlace } from "../../../types/places";
import { SpotPopup } from "./mapPopups";

export interface ICoordinates {
    longitude:number,
    latitude:number,
    name:string,
}

function getAverage (array:Array<ICoordinates>):LatLngExpression {
    const latAvg = array.map(item=>item.latitude).reduce((acc,curr)=>acc+curr,0)/array.length;
    const longAvg = array.map(item=>item.longitude).reduce((acc,curr)=>acc+curr,0)/array.length;

    return [latAvg, longAvg];
};

type MapProps = {
    points?:IPlace[],
}

export default function Map({points}:MapProps) {

    React.useEffect(() => {
        const L = require("leaflet");
    
        delete L.Icon.Default.prototype._getIconUrl;
    
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
          iconUrl: require("leaflet/dist/images/marker-icon.png"),
          shadowUrl: require("leaflet/dist/images/marker-shadow.png")
        });
      }, []);

      const customIcon = L.divIcon({
        html: ReactDOMServer.renderToString(
            <div className="custom-marker">
                <FaMicrophone />
            </div>
        ),
        className: '', 
        iconSize: [30, 30], 
    });

    if (points) {
        return (
            <MapContainer center={[points[0].longitude,points[0].latitude]} zoom={17} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {points.map((point)=>(
                    <Marker position={[point.longitude, point.latitude]} key={point.longitude+point.latitude} icon={customIcon}>
                        <Popup><SpotPopup place={point}/></Popup>
                    </Marker>
                ))}
                
            </MapContainer>
        );
    }

    else {
        return (
            <MapContainer center={[49.3398156, 17.993447]} zoom={17} scrollWheelZoom={true}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[49.3398156, 17.993447]} icon={customIcon}></Marker>
            </MapContainer>
          );
    }  
}


import React from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import ReactDOMServer from 'react-dom/server';
import "leaflet/dist/leaflet.css"
import { LatLngExpression } from "leaflet";
import L from 'leaflet';
import './map.css';
import { FaMicrophone } from "react-icons/fa";

export interface ICoordinates {
    clong:number,
    clat:number,
}

function getAverage (array:Array<ICoordinates>):LatLngExpression {
    const latAvg = array.map(item=>item.clat).reduce((acc,curr)=>acc+curr,0)/array.length;
    const longAvg = array.map(item=>item.clong).reduce((acc,curr)=>acc+curr,0)/array.length;

    return [latAvg, longAvg];
};

type MapProps = {
    points?:ICoordinates[]
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
            <MapContainer center={[points[0].clong,points[0].clat]} zoom={17} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {points.map((point)=>(
                    <Marker position={[point.clong, point.clat]} key={point.clong+point.clat} icon={customIcon}></Marker>
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



export function MarkerIcon () {

};
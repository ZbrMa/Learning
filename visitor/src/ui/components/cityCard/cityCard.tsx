import { IoArrowForwardOutline } from "react-icons/io5";
import { IPlace } from "../../../types/places";
import { Button } from "../button/button";
import './cityCard.css';

type CityCardProps = {
    place:IPlace,
    index:number,
}

export function CityCard({place,index}:CityCardProps){

    return(
        <div className="city__card__container">
            <div className="city__card relative p-16 box flex-col">
            <Button variant="link">Zjistit více <IoArrowForwardOutline/></Button>
            <img src={place.image} className="city--img" alt={place.city + ',' + place.spot}/>
            <div className="city--shadow"></div>
            <div className="city__text tx-white flex-col g-8">
                <h4 className="h-lg xbold tx-white">{place.spot}</h4>
                <div className="city--separator"></div>
                <div className="flex content-space">
                    <p className="tx-white">{place.city}</p>
                    <span className="city--index">{index<10 ? '0' + index : index}</span>   
                </div>
                <p className="city--about tx-xs mt-16">{place.about}</p>
                
            </div>
        </div>
        </div>
        
    );
};
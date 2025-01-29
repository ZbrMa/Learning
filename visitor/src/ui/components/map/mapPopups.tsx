import { IPlace } from "../../../types/places";
import './mapPopups.css';

type SpotPopupProps = {
    place:IPlace,
}

export function SpotPopup({place}:SpotPopupProps){

    return(
        <div className="spot__popup">
            
                <img src={place.image} alt={place.city + place.spot}/>
                <h3 className="xbold h-xs my-16">{place.city}, {place.spot}</h3>
            
             <p className="spot--desc">{place.about}</p>
        </div>
    )
};
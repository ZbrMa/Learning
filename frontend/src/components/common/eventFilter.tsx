import { Calendar } from './calendar';
import { Dropdown } from "./dropdown";
import {useApiGetNoParams} from "../../useApi/useApi";
import { IGenre, IPlace } from "../../types/types";
import { useEffect,useState, useContext } from 'react';
import './styles/calendar.css';
import './styles/eventFilter.css';

type Props = {
    getFilter:any,
}

export function EventFilter({getFilter}:Props) {

    const [placeFilter,setPlaceFilter] = useState<[]>([]);
    const [genreFilter,setGenreFilter] = useState<[]>([]);
    const [dateInterval,setDateInterval] = useState<{}>({});

    const { data: places, loading:placeLoading, error:placeError } = useApiGetNoParams<IPlace[]>('/get_places');
    const { data: genres, loading:genreLoading, error:genreError } = useApiGetNoParams<IGenre[]>('/get_genres');

    const placeOptions = places?.map(place => ({
        value: place.city,
        label: place.city
    })) || [];

    

    const genreOptions = genres?.map(genre => ({
        value: genre.genre,
        label: genre.genre
    })) || [];

    const getPlaces =(selected:[])=>{
        setPlaceFilter(selected);
    };

    const getGenres = (selected:[])=> {
        setGenreFilter(selected);
    };

    const getInterval=(start:Date,end:Date)=>{
        setDateInterval({start:start,end:end})
    };

    useEffect(()=>{
        getFilter({dateInterval,placeFilter,genreFilter});
    },[placeFilter,genreFilter,dateInterval])

    return (
        <div className="event-search-container">
            <div className="event-filter-container">
                <div className="search-block">
                <Dropdown placeholder="Vyber místo..." options={placeOptions} returnSelected={getPlaces} />
                <Dropdown placeholder="Vyber žánr..." options={genreOptions} returnSelected={getGenres}/>
                </div>
            </div>
            <Calendar returnInterval={getInterval}></Calendar>
        </div>
    );
}
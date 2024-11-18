export interface IPlace {
    id:number,
    city:string,
    place:string,
    image:string,
    geo:IGeo,
    path:string,
    address:string,
};

interface IGeo {
    geo_lat:number,
    geo_long:number,
};
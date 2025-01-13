export interface IPlace {
  id: number;
  city: string;
  spot: string;
  image: string;
  latitude: number;
  longitude: number;
  about?: string;
}

export type INewPlace = Omit<IPlace, "image" | "id">;

export interface ICountryInfo {
  name: {
    common: string;
    official: string;
  };
  flags: {
    png: string;
    svg: string;
  };
  cca2: string;
  cca3: string;
  ccn3: string;
  cioc: string;
  languages: {
    ces: string;
  };
  population: number;
}

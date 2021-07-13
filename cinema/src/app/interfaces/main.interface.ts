export interface IMain {
    title:string,
    category:string|number,
    poster:string,
    description:string,
    yearFilm:string|number,
    country:string,
    genre:string,
    duration:string|number,
    data:string|number,
    places:any[];
}

export interface IFilm {
    title:string,
    category:string|number,
    poster:string,
    description:string,
    yearFilm:string|number,
    country:string,
    genre:string,
    duration:string|number,
    data:string|number,
    mainGenre:string,
    places:any[];
}
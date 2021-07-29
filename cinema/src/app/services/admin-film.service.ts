import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IFilm } from '../interfaces/main.interface';

@Injectable({
  providedIn: 'root'
})
export class AdminFilmService {
  url:string = 'https://ownapicinema.herokuapp.com/films'
  placesUrl = 'https://ownapicinema.herokuapp.com/places'
  constructor( private http:HttpClient) { }
  get():Observable<IFilm>{
    return this.http.get<IFilm>(this.url)
  }
  getOne(id):Observable<IFilm>{
    return this.http.get<IFilm>(`${this.url}/${id}`)
  }
  post(film):Observable<IFilm>{
    return this.http.post<IFilm>(this.url,film)
  }
  update(film,id):Observable<IFilm>{
    return this.http.put<IFilm>(`${this.url}/${id}`,film)
  }
  delete(id):Observable<IFilm>{
    return this.http.delete<IFilm>(`${this.url}/${id}`)
  }
  add(item):Observable<any>{
    return this.http.post<any>(this.placesUrl,item)
  }
  getPlaces():Observable<any>{
    return this.http.get(this.placesUrl)
  }
  deletePlaces(id):Observable<any>{
    return this.http.delete(`${this.placesUrl}/${id}`)
  }
}


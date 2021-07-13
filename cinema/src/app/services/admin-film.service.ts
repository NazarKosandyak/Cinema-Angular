import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IFilm } from '../interfaces/main.interface';

@Injectable({
  providedIn: 'root'
})
export class AdminFilmService {
  url:string = 'http://localhost:3000/films'
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
}


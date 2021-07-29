import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IMain } from '../interfaces/main.interface';

@Injectable({
  providedIn: 'root'
})
export class AdminMainService {
  url:string
  constructor(private http:HttpClient) {
    this.url = 'https://ownapicinema.herokuapp.com/main'
   }
   get():Observable<Array<IMain>>{
    return this.http.get<Array<IMain>>(this.url)
   }
   getOne(id):Observable<IMain>{
     return this.http.get<IMain>(`${this.url}/${id}`)
   }
   post(film):Observable<Array<IMain>>{
     return this.http.post<Array<IMain>>(this.url,film)
   }
   update(film,id):Observable<Array<IMain>>{
     return this.http.put<Array<IMain>>(`${this.url}/${id}`,film)
   }
   delete(id):Observable<IMain>{
     return this.http.delete<IMain>(`${this.url}/${id}`)
   }

}

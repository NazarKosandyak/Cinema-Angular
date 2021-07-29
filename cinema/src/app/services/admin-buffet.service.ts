import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminBuffetService {
  url:string
  constructor(
    private http:HttpClient
  ) { 
    this.url = 'https://ownapicinema.herokuapp.com/buffet'
  }
  getAll():Observable<any>{
    return this.http.get(this.url)
  }
  post(item):Observable<any>{
    return this.http.post(this.url,item)
  }
  update(item,id):Observable<any>{
    return this.http.put(`${this.url}/${id}`,item)
  }
  delete(id):Observable<any>{
    return this.http.delete(`${this.url}/${id}`)
  }
}

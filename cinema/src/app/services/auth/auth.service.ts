import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject } from 'rxjs';
import { IFilm, IMain } from 'src/app/interfaces/main.interface';




@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser$ = new Subject()
  currentFilms$ = new Subject()
  currentOrders$ = new Subject()
  urlMain:string;
  urlFilm:string
  constructor(
    private auth:AngularFireAuth,
    private fs:AngularFirestore,
    private router :Router,
    private toastr : ToastrService,
    private http:HttpClient

  ) { 
    this.urlMain = 'http://localhost:3000/main'
    this.urlFilm = 'http://localhost:3000/films'
  }
  singUp(name,email,password):void{
    this.auth.createUserWithEmailAndPassword(email,password)
    .then(userCred =>{
      const user={
        name:name,
        surname:'',
        dateOfBirth:'',
        email:userCred.user.email,
        uid:userCred.user.uid,
        phoneNumber:'',
        tickets:[],
        films:[],
        orders:[],
        city:'',
        role:'USER'
      } 
      this.fs.collection('users').doc(userCred.user.uid).set(user)
      .then(()=>{
        console.log('user created');
      })
      .catch(err=>console.log(err))
    })
    .catch(err=>console.log(err))

  }
  signIn(email,password):void{
    this.auth.signInWithEmailAndPassword(email,password)
    .then(userCred=>{
      this.fs.collection('users').doc(userCred.user.uid).ref.get().then(doc=>{
        if(doc.exists){
          const myUser = {
            id:doc.id,
            ...doc.data() as any 
          }
          this.success('Вітаю')
          if(myUser.role == "ADMIN"){
            localStorage.setItem('adminCred',JSON.stringify(myUser))
            this.router.navigateByUrl('/admin')
            this.currentUser$.next('ADMIN');
          }
          if(myUser.role == "USER"){
            localStorage.setItem('user',JSON.stringify(myUser))
            localStorage.setItem('films',JSON.stringify(myUser.films))
            localStorage.setItem('orders',JSON.stringify(myUser.orders))
            this.router.navigateByUrl('/main')
            this.currentUser$.next('USER');
          }

        }
      })
      .catch(err=>console.log(err))
    })
    .catch(err=>{
      console.log(err);
      if(err.code ==="auth/wrong-password"){
        this.error('Неправельний пароль')
      }
      if(err.code === "auth/user-not-found"){
        this.warning('Такого користувача не існує!')
      }
    })
    
  }
  updateUser(item){
    this.fs.doc(`users/${item.uid}`).update(item).then(()=>{
      this.success('Дані збережено')
    })
  }

updateFilm(item,id):Observable<IMain>{
  return this.http.put<IMain>(`${this.urlMain}/${id}`,item)
}
 
deleteFilm(item,id):Observable<IFilm>{
  return this.http.put<IFilm>(`${this.urlFilm}/${id}`,item)
}
deleteOrder(item,id):Observable<any>{
  return this.http.put<any>(`${this.urlFilm}/${id}`,item)
}
success(massege):void{
  this.toastr.success(massege)
}

warning(messege):void{
  this.toastr.warning(messege)
}
error(messege):void{
  this.toastr.error(messege)
}
 
}

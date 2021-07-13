import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IMain } from 'src/app/interfaces/main.interface';
import { AdminMainService } from 'src/app/services/admin-main.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-office-ticket',
  templateUrl: './office-ticket.component.html',
  styleUrls: ['./office-ticket.component.scss']
})
export class OfficeTicketComponent implements OnInit {
  currentUser;
  myTickets = []
  noTickets;
  films=[];
  haveTicket;
  id:number
  mainFilm:IMain
  constructor(
    private authService :AuthService,
    private activatedRoute:ActivatedRoute,
    private adminMainService:AdminMainService
  ) { }

  ngOnInit(): void {
    this.loadUser()
    this.checkUser()
    this.loadFilms()
    this.checkFilms()
  }


  loadUser():void{
    if(localStorage.length > 0) {
      if(localStorage.getItem('user')){
      this.currentUser = JSON.parse(localStorage.getItem('user'))  
      }
      else if(localStorage.getItem('adminCred')){
       
      }
    } else {
     
    }
  }
  checkUser():void{
    this.authService.currentUser$.subscribe(()=>{
      this.loadUser()
      
    })
  }

  loadFilms():void{
    if(localStorage.length > 0) {
      if(localStorage.getItem('films')){
      this.films = JSON.parse(localStorage.getItem('films'))
      if(this.films.length == 0){
        this.haveTicket = false
        this.noTickets = 'У Вас немає активних квитків. Саме час придбати їх :)'
      }
      else{
        this.haveTicket = true
  
      }
    }

    } else {
      
    }
  }
  checkFilms():void{
    this.authService.currentFilms$.subscribe(()=>{
      this.loadFilms()
    })
  }
  deleteFilm(item,i):void{
    this.films.splice(i,1)
    localStorage.setItem('films',JSON.stringify(this.films))
    this.authService.currentFilms$.next('films')
    const updateUser = {
      name:this.currentUser.name,
      surname:this.currentUser.surname,
      dateOfBirth:this.currentUser.dateOfBirth,
      email:this.currentUser.email,
      uid:this.currentUser.uid,
      phoneNumber:this.currentUser.phoneNumber,
      tickets:this.currentUser.tickets,
      city:this.currentUser.city,
      films:this.films,
      role:'USER'
    }
    const updateFilm = {
      title:item.title,
      category:item.category,
      description:item.description,
      yearFilm:item.yearFilm,
      country:item.country,
      genre:item.genre,
      duration:item.duration,
      data:item.data,
      poster:item.poster,
      places:[],
    }
    console.log(updateFilm);
    
    this.authService.updateUser(updateUser)
    this.authService.updateFilm(updateFilm,item.id)
  }
}

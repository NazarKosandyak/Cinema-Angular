import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-office-orders',
  templateUrl: './office-orders.component.html',
  styleUrls: ['./office-orders.component.scss']
})
export class OfficeOrdersComponent implements OnInit {
  haveOrders:boolean;
  noOrders:string
  currentUser;
  orders:any[]
  constructor(
    private authService:AuthService
  ) { }

  ngOnInit(): void {
    this.loadUser()
    this.checkUser()
    this.loadOrders()
    this.checkOrders()
  }
  
  loadUser():void{
    if(localStorage.length > 0) {
      if(localStorage.getItem('user')){
      this.currentUser = JSON.parse(localStorage.getItem('user')) 
      }
      else if(localStorage.getItem('adminCred')){
        
      }
    } 
  }
  checkUser():void{
    this.authService.currentUser$.subscribe(()=>{
      this.loadUser()
    })
  }
  loadOrders():void{
    if(localStorage.length > 0) {
      if(localStorage.getItem('orders')){
      this.orders = JSON.parse(localStorage.getItem('orders'))
      if(this.orders.length == 0){
        console.log('test');
        
        this.haveOrders = false
        this.noOrders = 'У Вас немає покупок. Саме час придбати їх :)'
      }
      else{
        this.haveOrders = true
        
  
      }
    }
  }
  
}
checkOrders():void{
  this.authService.currentOrders$.subscribe(()=>{
    this.loadOrders()
  })
}
deleteOrder(item,index):void{
    this.orders.splice(index,1)
    localStorage.setItem('orders',JSON.stringify(this.orders))
    this.authService.currentOrders$.next('orders')
    const updateUser = {
      name:this.currentUser.name,
      surname:this.currentUser.surname,
      dateOfBirth:this.currentUser.dateOfBirth,
      email:this.currentUser.email,
      uid:this.currentUser.uid,
      phoneNumber:this.currentUser.phoneNumber,
      tickets:this.currentUser.tickets,
      city:this.currentUser.city,
      films:this.currentUser.films,
      orders:this.orders,
      role:'USER'
    }
    this.authService.updateUser(updateUser)
    
  }
}

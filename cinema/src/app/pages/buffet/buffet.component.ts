import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AdminBuffetService } from 'src/app/services/admin-buffet.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-buffet',
  templateUrl: './buffet.component.html',
  styleUrls: ['./buffet.component.scss']
})
export class BuffetComponent implements OnInit {
  allGoods: any[]
  popcorn: any[] = []
  drinks: any[] = []
  deserts: any[] = []
  orders: any[] = []
  currentUser;

  constructor(
    private buffetService: AdminBuffetService,
    private toastr: ToastrService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.getAll()
    this.loadUser()
    this.checkUser()
    this.loadOrders()
    this.checkOrders()
  }
  getAll(): void {
    this.buffetService.getAll().subscribe((data) => {
      this.allGoods = data
      this.popcorn = this.allGoods.filter(value => value.category == "попкорн")
      this.drinks = this.allGoods.filter(value => value.category == "напої")
      this.deserts = this.allGoods.filter(value => value.category == "десерти")
    })
  }

  addOrder(item): void {
    if (this.currentUser == undefined) {
      this.warning('Увійдіть в акаунт!')
    }
    if (item.count == 0) {
      this.warning('Ви нічого не вибрали')
    }
    if (item.count != 0) {
      const updateUser = {
        name: this.currentUser.name,
        surname: this.currentUser.surname,
        dateOfBirth: this.currentUser.dateOfBirth,
        email: this.currentUser.email,
        uid: this.currentUser.uid,
        phoneNumber: this.currentUser.phoneNumber,
        tickets: this.currentUser.tickets,
        city: this.currentUser.city,
        films: this.currentUser.films,
        orders: this.orders,
        role: 'USER'
      }
      this.orders.push(item)
      this.authService.updateUser(updateUser)
      localStorage.setItem('user', JSON.stringify(updateUser))
      localStorage.setItem('orders', JSON.stringify(this.orders))
      this.authService.currentOrders$.next('new order')
      item.count = 0
    }

  }
  subtractCounter(item): void {
    if (item.count > 0) {
      item.count--
    }
  }
  addCounter(item): void {
    if (item.count < 10) {
      item.count++
    }
    else {
      this.warning('Максимальна кількість однієї позиції 10 од.')
    }
  }


  loadUser(): void {
    if (localStorage.length > 0) {
      if (localStorage.getItem('user')) {
        this.currentUser = JSON.parse(localStorage.getItem('user'))
      }
      else if (localStorage.getItem('adminCred')) {

      }
    }
  }
  checkUser(): void {
    this.authService.currentUser$.subscribe(() => {
      this.loadUser()
    })
  }
  loadOrders(): void {
    if (localStorage.length > 0) {
      if (localStorage.getItem('orders')) {
        this.orders = JSON.parse(localStorage.getItem('orders'))
      }
    }
  }
  checkOrders(): void {
    this.authService.currentOrders$.subscribe(() => {
      this.loadOrders()
    })
  }
  success(messege): void {
    this.toastr.success(messege)
  }
  warning(messege): void {
    this.toastr.warning(messege)
  }

}

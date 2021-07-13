import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  textLogin:string = 'Увійти'
  loginPath:string ='login'
  showLogOut:boolean = false
  
  constructor(
    private auth:AuthService,
    private router :Router
  ) { }

  ngOnInit(): void {
    this.loadCurrentUser()
    this.checkCurrentUser()
  }
  loadCurrentUser():void{
    if(localStorage.length > 0){
      this.showLogOut = true
      if(localStorage.getItem('user')){
        this.textLogin = 'Кабінет'
        this.loginPath = 'office';
      }
      if(localStorage.getItem('adminCred')){
        this.textLogin = 'Адмін'
        this.loginPath = 'admin';
      }
     
    }
    else{
      this.textLogin ='Увійти'
      this.loginPath ='login'
    }
  }
  checkCurrentUser(): void {
    this.auth.currentUser$.subscribe(() => {
      this.loadCurrentUser()
    })
  }
  logOut():void{
    this.showLogOut = false
    localStorage.clear()
    this.auth.currentUser$.next('clear')
    this.router.navigateByUrl('/main')
  }

}

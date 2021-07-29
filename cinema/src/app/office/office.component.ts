import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-office',
  templateUrl: './office.component.html',
  styleUrls: ['./office.component.scss']
})
export class OfficeComponent implements OnInit {
  currentUser;
  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.loadUser()
    this.checkUser()
  }

  loadUser(): void {
    if (localStorage.length > 0) {
      if (localStorage.getItem('user')) {
        this.currentUser = JSON.parse(localStorage.getItem('user'))
      }
      else if (localStorage.getItem('adminCred')) {
      }
    } else {

    }
  }
  checkUser(): void {
    this.authService.currentUser$.subscribe(() => {
      this.loadUser()
    })
  }
}

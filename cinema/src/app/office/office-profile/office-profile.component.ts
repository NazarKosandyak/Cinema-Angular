import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-office-profile',
  templateUrl: './office-profile.component.html',
  styleUrls: ['./office-profile.component.scss']
})
export class OfficeProfileComponent implements OnInit {
  currentUser;
  contactForm:FormGroup
  personalForm:FormGroup
  constructor(
    private authService:AuthService,
    private fb:FormBuilder
  ) { }

  ngOnInit(): void {
    this.initFormContact()
    this.initFormPersonalInfo()
    this.loadUser()
    this.checkUser()
    this.loadUserContact()
    this.loadPersonalInfo()
  }
  initFormContact():void{
    this.contactForm = this.fb.group({
      city:[null,Validators.required],
      phoneNumber:[null,Validators.required],
      email:[null,Validators.required]
    })
  }
  loadUserContact():void{
    this.contactForm.patchValue({
      email:this.currentUser.email,
      phoneNumber:this.currentUser.phoneNumber,
      city:this.currentUser.city
    })
    console.log(this.currentUser.phoneNumber);
    this.authService.currentUser$.next(true)
    
  }
  initFormPersonalInfo():void{
    this.personalForm = this.fb.group({
      name:[null,Validators.required],
      surname:[null,Validators.required],
      dateOfBirth:[null,Validators.required]
    })
  }
  loadPersonalInfo():void{
    this.personalForm.patchValue({
      name:this.currentUser.name,
      surname:this.currentUser.surname,
      dateOfBirth:this.currentUser.dateOfBirth
    })

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

  saveData():void{
    const dataUser = {
        name:this.currentUser.name,
        surname:this.personalForm.value.surname,
        dateOfBirth:this.personalForm.value.dateOfBirth,
        email:this.contactForm.value.email,
        uid:this.currentUser.uid,
        phoneNumber:this.contactForm.value.phoneNumber,
        tickets:[],
        city:this.contactForm.value.city,
        role:'USER'
    }
    this.authService.updateUser(dataUser)
    localStorage.setItem('user',JSON.stringify(dataUser))
    this.authService.currentUser$.next('data')

    
  }
  savePersonalInfo():void{
    const personalInfo = {
      name:this.currentUser.name,
      surname:this.personalForm.value.surname,
      dateOfBirth:this.personalForm.value.dateOfBirth,
      email:this.contactForm.value.email,
      uid:this.currentUser.uid,
      phoneNumber:this.contactForm.value.phoneNumber,
      tickets:[],
      city:this.contactForm.value.city,
      role:'USER'
    }
    this.authService.updateUser(personalInfo)
    localStorage.setItem('user',JSON.stringify(personalInfo))
    this.authService.currentUser$.next('data')
    
  }
  checkUser():void{
    this.authService.currentUser$.subscribe(()=>{
      this.loadUser()
    })
  }
}

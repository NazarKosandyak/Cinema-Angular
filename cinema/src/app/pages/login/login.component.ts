import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { HostListener } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isShowForm:boolean = true
  signUpForm:FormGroup
  singInForm:FormGroup
  
  constructor(
    private fb:FormBuilder,
    private authService :AuthService,
    private toastr : ToastrService
  ) { }
 @HostListener('input') onInput(){
   const getName:any  =  document.querySelector('.name')  as HTMLElement
   const getEmail:any =  document.querySelector('.email') as HTMLElement
   const getPass:any  =  document.querySelector('.password') as HTMLElement

   let getBtn = document.querySelector('.reg')  as HTMLButtonElement
  if(getName.value && getEmail.value && getPass.value){
    getBtn.disabled = false
    getBtn.classList.add('active')
    getBtn.classList.remove('inactive')
  }
  else{
    getBtn.disabled = true
    getBtn.classList.remove('active')
    getBtn.classList.add('inactive')
  }

 
 }
 @HostListener('change') onChange(){
  const getLoginEmail:any =  document.querySelector('.loginEmail') as HTMLElement
  const getLoginPass:any =  document.querySelector('.loginPass') as HTMLElement  
  console.log(getLoginEmail.value);
  
  if(getLoginEmail.value && getLoginPass.value){
    const getBtnLogin = document.querySelector('.loginBtn')  as HTMLButtonElement
    getBtnLogin.disabled = false
    getBtnLogin.classList.add('active')
    getBtnLogin.classList.remove('inactive')
  } 
 }
  ngOnInit(): void {
    this.initSignUpForm()
    this.initSignInForm()
  }
  initSignUpForm():void{
    this.signUpForm = this.fb.group({
      name:[null,Validators.required],
      email:[null,Validators.required],
      password:[null,Validators.required]
    })
    
  }
  initSignInForm():void{
    this.singInForm = this.fb.group({
      email:[null,Validators.required],
      password:[null,Validators.required]
    })
  }

  singUp():void{
    const nameRegx = /\w{3,15}/gi
    const emailRegx = /\w{3,20}@\w{1,10}.\w{1,10}/
    const passRegx = /\w{3,40}/
    const getAdd = document.querySelector('.comfirm')

    const {name,email,password} = this.signUpForm.value
    if(nameRegx.exec(name) !=null && emailRegx.exec(email) != null && passRegx.exec(password) != null){
      this.authService.singUp(name,email,password)
      this.success('Користувача зареєстровано!')
      this.signUpForm.reset()
      this.isShowForm = false
    }
    else{
      this.warning('Перевірте правильність вводу')
    }
    
  }
  signIn():void{
    const { email, password } = this.singInForm.value;
    if(email.length != 0 && password.length !=0) {
      this.authService.signIn(email,password)
      this.singInForm.reset()
      
    }
    else{
      this.warning('Заповніть поля')
    }
    
  }
  
  switchForm():void{
    this.isShowForm = !this.isShowForm
  }
  success(messege):void{
    this.toastr.success(messege)
  }
  warning(messege):void{
    this.toastr.warning(messege)
  }
}

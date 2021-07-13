import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { IMain } from 'src/app/interfaces/main.interface';
import { AdminMainService } from 'src/app/services/admin-main.service';
import { HostListener } from '@angular/core';



@Component({
  selector: 'app-admin-main',
  templateUrl: './admin-main.component.html',
  styleUrls: ['./admin-main.component.scss']
})
export class AdminMainComponent implements OnInit {
  newFilm:FormGroup
  editFilm:FormGroup
  poster:any;
  newPoster:any
  bgImage:string
  id:number
  checkPoster:any
  dataFilm:any[]
  editShow:boolean = false
  constructor(
    private fb:FormBuilder,
    private adminMainService:AdminMainService,
    private toastr:ToastrService
  ) { }
  @HostListener('window:scroll') onscroll() {
    const getScroll = document.querySelector('.scroll') as HTMLElement
    window.addEventListener('scroll',function(){
    if(window.scrollY  > 1000 ){
      getScroll.style.display = 'block'
    }
    else{
      getScroll.style.display = 'none'
    }
    })
}
  ngOnInit(): void {
    this.initFormNewFilm()
    this.initEditForm()
    this.getFilms()
  }
  getFilms():void{
    this.adminMainService.get().subscribe((data)=>{
        this.dataFilm = data
        console.log(this.dataFilm);
        
      
    })
  }
  initFormNewFilm():void{
    this.newFilm = this.fb.group({
      title:[null,Validators.required],
      category:[null,Validators.required],
      poster:[null,Validators.required],
      description:[null,Validators.required],
      yearFilm:[null,Validators.required],
      country:[null,Validators.required],
      genre:[null,Validators.required],
      duration:[null,Validators.required],
      data:[null,Validators.required],
    })
  }
  initEditForm():void{
    this.editFilm = this.fb.group({
      title:[null,Validators.required],
      category:[null,Validators.required],
      poster:[null,Validators.required],
      description:[null,Validators.required],
      yearFilm:[null,Validators.required],
      country:[null,Validators.required],
      genre:[null,Validators.required],
      duration:[null,Validators.required],
      data:[null,Validators.required],
    })
  }
  upload(event){
    this.poster = event.target.files[0].name
  }
 
  addMainFilm():void{
    if(this.newFilm.value.title && this.poster,this.newFilm.value.category && this.newFilm.value.description && this.newFilm.value.yearFilm && this.newFilm.value.country && this.newFilm.value.genre && this.newFilm.value.duration){
      this.getFilms()
      const addFilm = {
        title:this.newFilm.value.title,
        category:this.newFilm.value.category,
        poster:`../../assets/main/${this.poster}`,
        description:this.newFilm.value.description,
        yearFilm:this.newFilm.value.yearFilm,
        country:this.newFilm.value.country,
        genre:this.newFilm.value.genre,
        duration:this.newFilm.value.duration,
        data:this.newFilm.value.data,
        mainGenre:this.newFilm.value.mainGenre,
        places:[]

      }
      console.log(addFilm);
      this.adminMainService.post(addFilm).subscribe(()=>{
        this.getFilms()
      })
      this.showSuccess('New film successfully added')
      this.newFilm.reset()
    }
    else{
      this.warning('All field must be filled')
    }
   
  }
  edit(item):void{
    this.editShow = true
    this.id  = item.id
    this.editFilm.patchValue({
      title:item.title,
      category:item.category,
      description:item.description,
      yearFilm:item.yearFilm,
      country:item.country,
      genre:item.genre,
      duration:item.duration,
      data:item.data,
      mainGenre:item.mainGenre,
      poster:`../../assets/main/${item.poster}`
    }) 
    console.log(item.yearFilm);
    
    let bgc = document.body.style.background = '#8191A6'
    window.scrollTo(0,0)
    this.checkPoster = `../../assets/main/${item.poster}`
  }
  newUpload(event){
     this.newPoster = event.target.files[0].name
  }
  saveEdit():void{
    if(this.newPoster == undefined){
      const saveFilm = {
        ...this.editFilm.value,
        poster:this.checkPoster
      }
      this.adminMainService.update(saveFilm,this.id).subscribe(()=>{
        this.getFilms()
      })
      this.editShow = false
      this.editFilm.reset()
      let bgc = document.body.style.background = 'transparent'
      this.showSuccess('Відредаговано')
    }
    else{
      const saveFilm = {
        ...this.editFilm.value,
        poster:`../../assets/main/${this.newPoster}`
      }
      this.adminMainService.update(saveFilm,this.id).subscribe(()=>{
        this.getFilms()
      })
      this.editShow = false
      this.editFilm.reset()
      let bgc = document.body.style.background = 'transparent'
      this.showSuccess('Відредаговано')
    }
    

  }
  closeEdit():void{
    this.editShow = false
    this.editFilm.reset()
    let bgc = document.body.style.background = 'transparent'
  }
  deleteFilm(id){
    this.adminMainService.delete(id).subscribe(()=>{
      this.getFilms()
    })
    this.showSuccess('Film successfully deleted')
    
  }
 
  warning(error){
    this.toastr.warning(error);
  }
  showSuccess(messege) {
    this.toastr.success(messege);
  }

  goUp():void{
    window.scrollTo(0,0)
  }
}

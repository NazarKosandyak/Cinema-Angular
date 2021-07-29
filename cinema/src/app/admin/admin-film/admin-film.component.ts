
import { Component, OnInit } from '@angular/core';
import { HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { IFilm } from 'src/app/interfaces/main.interface';
import { AdminFilmService } from 'src/app/services/admin-film.service';

@Component({
  selector: 'app-admin-film',
  templateUrl: './admin-film.component.html',
  styleUrls: ['./admin-film.component.scss']
})
export class AdminFilmComponent implements OnInit {
  films:FormGroup;
  editForm:FormGroup
  poster:string
  dataFilms;
  editShow:boolean = false
  id:number;
  checkPoster:any
  
  constructor(
    private fb:FormBuilder,
    private adminFilmService:AdminFilmService,
    private toastr :ToastrService
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

  ngOnInit(){
      this.initForm()
      this.initEditForm()
      this.getFilm()
  }
  getFilm():void{
    this.adminFilmService.get().subscribe(data=>{
      this.dataFilms = data
    })
  }
  initForm():void{
    this.films = this.fb.group({
      title:[null,Validators.required],
      category:[null,Validators.required],
      description:[null,Validators.required],
      yearFilm:[null,Validators.required],
      country:[null,Validators.required],
      genre:[null,Validators.required],
      mainGenre:[null,Validators.required],
      duration:[null,Validators.required],
      data:[null,Validators.required],
      poster:[null,Validators.required]
    })
  }
  initEditForm():void{
    this.editForm = this.fb.group({
      title:[null,Validators.required],
      category:[null,Validators.required],
      description:[null,Validators.required],
      yearFilm:[null,Validators.required],
      country:[null,Validators.required],
      genre:[null,Validators.required],
      mainGenre:[null,Validators.required],
      duration:[null,Validators.required],
      data:[null,Validators.required],
      poster:[null,Validators.required],
    })
  }
  uploadFile(event){
    this.poster = event.target.files[0].name
    console.log(this.poster);
    
  }
  addFilm():void{
    if(this.films.value.title && this.films.value.category && this.films.value.description && this.films.value.yearFilm && this.films.value.country && this.films.value.genre && this.films.value.mainGenre && this.films.value.duration && this.films.value.data ){
      const film = {
        title:this.films.value.title,
        category:this.films.value.category,
        description:this.films.value.description,
        yearFilm:this.films.value.yearFilm,
        country:this.films.value.country,
        genre:this.films.value.genre,
        mainGenre:this.films.value.mainGenre,
        duration:this.films.value.duration,
        data:this.films.value.data,
        poster:`../../../assets/posters/${this.poster}`,
        places:[],
      }
      this.adminFilmService.post(film).subscribe(()=>{
        this.getFilm()
      })
      this.films.reset()
      this.success('Ви щойно додали новий фільм')
    }
    else{
      this.warning('Заповніть всі поля')
    }
   

  }
  edit(film):void{
    this.editShow = true
    this.id = film.id
    this.editForm.patchValue({
      title:film.title,
      category:film.category,
      description:film.description,
      yearFilm:film.yearFilm,
      country:film.country,
      genre:film.genre,
      mainGenre:film.mainGenre,
      duration:film.duration,
      data:film.data,
      poster:`../../../assets/posters/${film.poster}`
    })
    document.body.style.background = '#ECE3F0'
    window.scrollTo(0,0)
    this.checkPoster = `../../assets/posters/${film.poster}`

  }
  closeEdit():void{
    this.editShow = false
    document.body.style.background = '#fff'
  }
  newUpload(event):void{
    this.poster = event.target.files[0].name
  }
  saveEdit():void{

 
    if(this.poster == undefined){
      const editFilm = {
        ...this.editForm.value,
        poster:this.checkPoster
      }
      this.adminFilmService.update(editFilm,this.id).subscribe(()=>{
        this.getFilm()
      })
      this.success('Фільм відредаговано')
      this.editShow = false
      document.body.style.background = '#fff'
    }
    else{
      const editFilm = {
        ...this.editForm.value,
        poster:`../../../assets/posters/${this.poster}`
      }
      this.adminFilmService.update(editFilm,this.id).subscribe(()=>{
        this.getFilm()
      })
      this.success('Фільм відредаговано')
      this.editShow = false
      document.body.style.background = '#fff'
    }

  }
  deleteFilm(id):void{
    this.adminFilmService.delete(id).subscribe(()=>{
      this.getFilm()
    })
    
  }
  success(messege):void{
    this.toastr.success(messege)
  }
  warning(messege):void{
    this.toastr.warning(messege)
    
  }
  goUp():void{
    window.scrollTo(0,0)
  }
}

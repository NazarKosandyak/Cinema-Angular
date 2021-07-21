import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AdminBuffetService } from 'src/app/services/admin-buffet.service';

@Component({
  selector: 'app-admin-buffet',
  templateUrl: './admin-buffet.component.html',
  styleUrls: ['./admin-buffet.component.scss']
})
export class AdminBuffetComponent implements OnInit {
  buffetForm:FormGroup
  editBuffet:FormGroup
  dataBuffet:any[]
  image:string
  showEdit:boolean = false
  id:number
  checkImage:string
  constructor(
    private fb:FormBuilder,
    private buffetService :AdminBuffetService,
    private toastr:ToastrService
  ) { }

  @HostListener('window:scroll') onscroll() {
    const getScroll = document.querySelector('.scroll') as HTMLElement
    window.addEventListener('scroll',function(){
    if(window.scrollY  > 200 ){
      getScroll.style.display = 'block'
    }
    else{
      getScroll.style.display = 'none'
    }
    })
}
  ngOnInit(): void {
    this.getAll()
    this.initBuffetForm()
    this.initEditBuffet()
  }
  getAll():void{
    this.buffetService.getAll().subscribe(data=>{
      this.dataBuffet = data
    })
  }
  initBuffetForm():void{
    this.buffetForm = this.fb.group({
      name:[null,Validators.required],
      price:[null,Validators.required],
      weight:[null,Validators.required],
      category:[null,Validators.required],
    })
  }
  initEditBuffet():void{
    this.editBuffet = this.fb.group({
      name:[null,Validators.required],
      price:[null,Validators.required],
      weight:[null,Validators.required],
      category:[null,Validators.required],
    })
  }
  upload(event){
    this.image = event.target.files[0].name
    console.log(this.image);
    
  }
  addBuffet():void{
    if(this.buffetForm.value.name && this.buffetForm.value.price && this.buffetForm.value.weight && this.image != ''){
      const item = {
        name:this.buffetForm.value.name,
        price:this.buffetForm.value.price,
        weight:this.buffetForm.value.weight,
        category:this.buffetForm.value.category,
        count:0,
        image:`../../../assets/buffet/${this.image}`
      }
      console.log(item);
      this.buffetService.post(item).subscribe(()=>{
        this.getAll()
      })
      this.buffetForm.reset()
      this.success('Створено')
    }
    else{
      this.warning('Заповніть всі поля')
    }
   
    
  }
  edit(item):void{
    console.log(item);
    this.id = item.id
    document.body.style.background = '#ECE3F0'
    this.checkImage = `../../../assets/buffet/${item.image}`
    window.scrollTo(0,0)
    this.showEdit = true
    this.editBuffet.patchValue({
      name:item.name,
      price:item.price,
      weight:item.weight,
      category:item.category,
      count:0,
      image:`../../../assets/buffet/${item.image}`
    })
  }
  saveEdit():void{
    if(this.editBuffet.value.name && this.editBuffet.value.price && this.editBuffet.value.weight && this.image != ""){
      const editItem = {
        name:this.editBuffet.value.name,
        price:this.editBuffet.value.price,
        weight:this.editBuffet.value.weight,
        category:this.editBuffet.value.category,
        count:0,
        image:this.checkImage
      }
      this.buffetService.update(editItem,this.id).subscribe(()=>{
        this.getAll()
      })
      this.editBuffet.reset()
      document.body.style.background = 'transparent'
      this.showEdit = false
      this.success('Відредаговано')
    }
    else{
      this.warning('Заповніть всі поля')
    }
  }
  closeEdit():void{
    this.editBuffet.reset()
    document.body.style.background = 'transparent'
    this.showEdit = false

  }
  deleteBuffet(id):void{
    this.buffetService.delete(id).subscribe(()=>{
      this.getAll()
    })
  }
  goUp():void{
    window.scrollTo(0,0)
  }

  success(messege):void{
    this.toastr.success(messege)
  }
  warning(messege):void{
    this.toastr.warning(messege)
  }
}

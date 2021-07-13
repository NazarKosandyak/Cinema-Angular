import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AdminMainService } from 'src/app/services/admin-main.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  mainFilms:any[]
  constructor(
    private adminMainServive:AdminMainService,
    ) { }

  ngOnInit(): void {
    this.getMainFilms()
  }

  getMainFilms():void{
    this.adminMainServive.get().subscribe(data=>{
      this.mainFilms = data
    })
  }
}

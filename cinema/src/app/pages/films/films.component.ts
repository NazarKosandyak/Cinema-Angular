import { Component, OnInit } from '@angular/core';
import { AdminFilmService } from 'src/app/services/admin-film.service';

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.scss']
})
export class FilmsComponent implements OnInit {
  filterArray = []
  dataFilms;
  text: string;
  constructor(
    private adminFilmService: AdminFilmService
  ) { }

  ngOnInit(): void {
    this.getAllFilms()


  }
  getAllFilms(): void {
    this.adminFilmService.get().subscribe(data => {
      this.dataFilms = data
      this.text = 'Бойовик'
      this.filterArray = this.dataFilms.filter(film => film.mainGenre === "Бойовик")
    })

  }
  Action(): void {
    this.filterArray = this.dataFilms.filter(film => film.mainGenre === "Бойовик")
    this.text = 'Бойовик'
  }
  Comedy(): void {
    this.filterArray = this.dataFilms.filter(film => film.mainGenre === "Комедія")
    this.text = 'Комедія'
  }
  SciFi(): void {
    this.filterArray = this.dataFilms.filter(film => film.mainGenre === "Наукова фантастика")
    this.text = 'Наукова фантастика'
  }
  Thriller(): void {
    this.filterArray = this.dataFilms.filter(film => film.mainGenre === "Трилер")
    this.text = 'Трилер'
  }
  Fantasy(): void {
    this.filterArray = this.dataFilms.filter(film => film.mainGenre === "Фентезі")
    this.text = 'Фентезі'
  }
  Adventures(): void {
    this.filterArray = this.dataFilms.filter(film => film.mainGenre === "Пригоди")
    this.text = 'Пригоди'
  }
  Cartoon(): void {
    this.filterArray = this.dataFilms.filter(film => film.mainGenre === "Мультфільм")
    this.text = 'Мультфільм'
  }
  Crime(): void {
    this.filterArray = this.dataFilms.filter(film => film.mainGenre === "Кримінал")
    this.text = 'Кримінал'
  }
}

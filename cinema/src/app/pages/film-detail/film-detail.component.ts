import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IMain } from 'src/app/interfaces/main.interface';
import { AdminFilmService } from 'src/app/services/admin-film.service';
import { AdminMainService } from 'src/app/services/admin-main.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-film-detail',
  templateUrl: './film-detail.component.html',
  styleUrls: ['./film-detail.component.scss']
})
export class FilmDetailComponent implements OnInit {
  mainFilm: any
  id: number
  places: any[] = []
  currentUser;
  currentFilms;
  seatReserve = []
  reservedPlaces = [];
  getAllPlaces = [];
  films = [];
  arrPlaces: any[] = [];
  concatPlaces = []
  myPlaces: object;
  constructor(
    private activatedRoute: ActivatedRoute,
    private adminService: AdminMainService,
    private toastr: ToastrService,
    private authService: AuthService,
    private filmService: AdminFilmService
  ) { }

  ngOnInit(): void {
    this.get()
    this.loadUser()
    this.checkUser()
    this.loadFilms()
    this.checkFilms()
    this.getPlaces()
  }

  get(): void {
    let getSeats = document.querySelectorAll('.seat')
    this.id = +this.activatedRoute.snapshot.paramMap.get('id')
    this.adminService.getOne(this.id).subscribe((data) => {
      this.mainFilm = data
      this.reservedPlaces = this.mainFilm.places



    })


  }
  getPlaces(): void {
    this.filmService.getPlaces().subscribe(data => {
      this.arrPlaces = data
      for (const iterator of this.arrPlaces) {
        for (const item of iterator.seatnumber) {
          this.concatPlaces.push(item)
        }

      }
      for (const setColor of this.concatPlaces) {
        let div: any = document.querySelector('.zal').children
        for (const element of div) {
          if (element.dataset.seatnumber == setColor) {
            element.style.background = 'red'
          }
        }

      }
      console.log(this.concatPlaces);

    })

  }
  addTickets(): void {
    const tickets = {
      title: this.mainFilm.title,
      category: this.mainFilm.category,
      description: this.mainFilm.description,
      yearFilm: this.mainFilm.yearFilm,
      country: this.mainFilm.country,
      genre: this.mainFilm.genre,
      duration: this.mainFilm.duration,
      data: this.mainFilm.data,
      mainGenre: this.mainFilm.mainGenre,
      poster: this.mainFilm.poster,
      places: this.places
    }
    this.adminService.update(tickets, this.id).subscribe(() => {
      this.get()
    })
  }
  addPlace(event) {
    if (event.target.dataset.seatnumber != undefined) {
      if (this.places.length < 10) {
        if (this.places.includes(event.target.dataset.seatnumber)) {

        }
        else {
          event.target.classList.add('block')
          this.places.push(event.target.dataset.seatnumber)
          this.info(`Ви вибрали місце №${event.target.dataset.seatnumber}`)
          this.myPlaces = {
            seatnumber: this.places,
            booked: event.target.dataset.booked,
            filmId: this.id
          }
        }

      }
      else {

        console.log('Максимальну к-сть місць досягнуто');
        this.warning('Не можна зарезервувати більше 10 квитків')
      }
    }
  }
  reserve(): void {
    const reserveTickets = {
      name: this.currentUser.name,
      surname: this.currentUser.surname,
      dateOfBirth: this.currentUser.dateOfBirth,
      email: this.currentUser.email,
      uid: this.currentUser.uid,
      phoneNumber: this.currentUser.phoneNumber,
      tickets: this.places,
      city: this.currentUser.city,
      films: this.films,
      role: 'USER'
    }

    this.films.push(this.mainFilm)
    this.authService.updateUser(reserveTickets)
    this.addTickets()
    localStorage.setItem('user', JSON.stringify(reserveTickets))
    localStorage.setItem('films', JSON.stringify(this.films))
    this.authService.currentFilms$.next('films')
    this.authService.currentUser$.next('tickets')
    this.filmService.add(this.myPlaces).subscribe(() => {
      this.getPlaces()
    })
    this.places = []

  }
  info(messege): void {
    this.toastr.info(messege)
  }
  warning(messege): void {
    this.toastr.warning(messege)
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
  loadFilms(): void {
    if (localStorage.length > 0) {
      if (localStorage.getItem('films')) {
        this.currentFilms = JSON.parse(localStorage.getItem('films'))
        this.films = JSON.parse(localStorage.getItem('films'))

      }

    } else { }
  }
  checkFilms(): void {
    this.authService.currentFilms$.subscribe(() => {
      this.loadFilms()
    })
  }

}

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminMainComponent } from 'src/app/admin/admin-main/admin-main.component';
import { AdminFilmService } from 'src/app/services/admin-film.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-film-info',
  templateUrl: './film-info.component.html',
  styleUrls: ['./film-info.component.scss']
})
export class FilmInfoComponent implements OnInit {
  detailFilm
  places = []
  reservedPlaces = []
  id: number
  currentFilm;
  currentUser;
  films = []
  arrPlaces = []
  concatPlaces = []
  myPlaces;

  constructor(
    private adminDetailService: AdminFilmService,
    private activatedRoute: ActivatedRoute,
    private adminService: AdminFilmService,
    private toastr: ToastrService,
    private filmService: AdminFilmService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.getOne()
    this.loadUser()
    this.checkUser()
    this.loadFilms()
    this.checkFilms()
    this.getPlaces()
  }
  getOne(): void {
    this.id = +this.activatedRoute.snapshot.paramMap.get('id')
    this.adminDetailService.getOne(this.id).subscribe(data => {
      this.detailFilm = data
      this.reservedPlaces = data.places
      this.arrPlaces = data.places

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
      title: this.detailFilm.title,
      category: this.detailFilm.category,
      description: this.detailFilm.description,
      yearFilm: this.detailFilm.yearFilm,
      country: this.detailFilm.country,
      genre: this.detailFilm.genre,
      duration: this.detailFilm.duration,
      data: this.detailFilm.data,
      mainGenre: this.detailFilm.mainGenre,
      poster: this.detailFilm.poster,
    }
    this.adminService.update(tickets, this.id).subscribe(() => {
      this.getOne()
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



          this.addTickets()

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
      city: this.currentUser.city,
      tickets: this.places,
      films: this.films,
      role: 'USER'
    }
    this.films.push(this.detailFilm)
    this.authService.updateUser(reserveTickets)
    localStorage.setItem('user', JSON.stringify(reserveTickets))
    localStorage.setItem('films', JSON.stringify(this.films))
    this.authService.currentFilms$.next('films')
    this.authService.currentUser$.next('tickets')
    this.filmService.add(this.myPlaces).subscribe(() => {
      this.getPlaces()
    })
    this.places = []
  }
  warning(messege): void {
    this.toastr.warning(messege)
  }
  info(messege): void {
    this.toastr.info(messege)
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
        this.currentFilm = JSON.parse(localStorage.getItem('films'))
        this.films = JSON.parse(localStorage.getItem('films'))
        console.log(this.films);

      }

    } else { }
  }
  checkFilms(): void {
    this.authService.currentFilms$.subscribe(() => {
      this.loadFilms()
    })
  }
}

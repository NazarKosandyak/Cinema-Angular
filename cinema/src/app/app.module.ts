import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FilmsComponent } from './pages/films/films.component';
import { AdminComponent } from './admin/admin.component';
import { MainComponent } from './pages/main/main.component';
import { AdminMainComponent } from './admin/admin-main/admin-main.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FilmDetailComponent } from './pages/film-detail/film-detail.component';
import { FooterComponent } from './components/footer/footer.component';
import { AdminFilmComponent } from './admin/admin-film/admin-film.component';
import { FilmInfoComponent } from './pages/film-info/film-info.component';
import { LoginComponent } from './pages/login/login.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { OfficeTicketComponent } from './office/office-ticket/office-ticket.component';
import { OfficeComponent } from './office/office.component';
import { OfficeProfileComponent } from './office/office-profile/office-profile.component';
import { AboutComponent } from './pages/about/about.component';
import {NgParticlesModule} from "ng-particles";
import { ContactComponent } from './pages/contact/contact.component';
import { BuffetComponent } from './pages/buffet/buffet.component';
import { AdminBuffetComponent } from './admin/admin-buffet/admin-buffet.component';
import { OfficeOrdersComponent } from './office/office-orders/office-orders.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FilmsComponent,
    AdminComponent,
    MainComponent,
    AdminMainComponent,
    FilmDetailComponent,
    FooterComponent,
    AdminFilmComponent,
    FilmInfoComponent,
    LoginComponent,
    OfficeTicketComponent,
    OfficeComponent,
    OfficeProfileComponent,
    AboutComponent,
    ContactComponent,
    BuffetComponent,
    AdminBuffetComponent,
    OfficeOrdersComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    ToastrModule.forRoot(),
    NgParticlesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

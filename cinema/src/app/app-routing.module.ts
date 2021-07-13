import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminFilmComponent } from './admin/admin-film/admin-film.component';
import { AdminMainComponent } from './admin/admin-main/admin-main.component';
import { AdminComponent } from './admin/admin.component';
import { AdminGuard } from './guards/admin.guard';
import { OfficeProfileComponent } from './office/office-profile/office-profile.component';
import { OfficeSupportComponent } from './office/office-support/office-support.component';
import { OfficeTicketComponent } from './office/office-ticket/office-ticket.component';
import { OfficeComponent } from './office/office.component';
import { FilmDetailComponent } from './pages/film-detail/film-detail.component';
import { FilmInfoComponent } from './pages/film-info/film-info.component';
import { FilmsComponent } from './pages/films/films.component';
import { LoginComponent } from './pages/login/login.component';
import { MainComponent } from './pages/main/main.component';
import { SheduleComponent } from './pages/shedule/shedule.component';

const routes: Routes = [
  {path:'',pathMatch:'full',redirectTo:'main'},
  {path:'shedule',component:SheduleComponent},
  {path:'films',component:FilmsComponent},
  {path:'main',component:MainComponent},
  {path:'main/:id',component:FilmDetailComponent},
  {path:'film/:id',component:FilmInfoComponent},
  {path:'login',component:LoginComponent},
  {path:'admin', canActivate:[AdminGuard],component:AdminComponent,children:[
    {path:'',pathMatch:'full',redirectTo:'admin'},
    {path:'admin-main',component:AdminMainComponent},
    {path:'admin-film',component:AdminFilmComponent}
    
  ]},
  {path:'office',component:OfficeComponent,children:[
    {path:'',pathMatch:"full",redirectTo:"office"},
    {path:'office-ticket',component:OfficeTicketComponent},
    {path:'office-profile',component:OfficeProfileComponent},
    {path:'office-support',component:OfficeSupportComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

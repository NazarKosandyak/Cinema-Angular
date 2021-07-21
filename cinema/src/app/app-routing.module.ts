import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminBuffetComponent } from './admin/admin-buffet/admin-buffet.component';
import { AdminFilmComponent } from './admin/admin-film/admin-film.component';
import { AdminMainComponent } from './admin/admin-main/admin-main.component';
import { AdminComponent } from './admin/admin.component';
import { AdminGuard } from './guards/admin.guard';
import { OfficeOrdersComponent } from './office/office-orders/office-orders.component';
import { OfficeProfileComponent } from './office/office-profile/office-profile.component';
import { OfficeSupportComponent } from './office/office-support/office-support.component';
import { OfficeTicketComponent } from './office/office-ticket/office-ticket.component';
import { OfficeComponent } from './office/office.component';
import { AboutComponent } from './pages/about/about.component';
import { BuffetComponent } from './pages/buffet/buffet.component';
import { ContactComponent } from './pages/contact/contact.component';
import { FilmDetailComponent } from './pages/film-detail/film-detail.component';
import { FilmInfoComponent } from './pages/film-info/film-info.component';
import { FilmsComponent } from './pages/films/films.component';
import { LoginComponent } from './pages/login/login.component';
import { MainComponent } from './pages/main/main.component';


const routes: Routes = [
  {path:'',pathMatch:'full',redirectTo:'main'},
  {path:'films',component:FilmsComponent},
  {path:'about',component:AboutComponent},
  {path:'main',component:MainComponent},
  {path:'main/:id',component:FilmDetailComponent},
  {path:'film/:id',component:FilmInfoComponent},
  {path:'login',component:LoginComponent},
  {path:'contact',component:ContactComponent},
  {path:'buffet',component:BuffetComponent},
  {path:'admin', canActivate:[AdminGuard],component:AdminComponent,children:[
    {path:'',pathMatch:'full',redirectTo:'admin'},
    {path:'admin-main',component:AdminMainComponent},
    {path:'admin-film',component:AdminFilmComponent},
    {path:'admin-buffet',component:AdminBuffetComponent},
  ]},
  {path:'office',component:OfficeComponent,children:[
    {path:'',pathMatch:"full",redirectTo:"office"},
    {path:'office-ticket',component:OfficeTicketComponent},
    {path:'office-profile',component:OfficeProfileComponent},
    {path:'office-support',component:OfficeSupportComponent},
    {path:'office-orders',component:OfficeOrdersComponent},
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

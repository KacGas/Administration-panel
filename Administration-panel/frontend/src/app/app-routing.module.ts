import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './auth/login/login.component';
import {FilmsComponent} from './films/films.component';
import {AddUserComponent} from './add-user/add-user.component';

const routes: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  { path: 'auth/login', component: LoginComponent },
  { path: 'films', component: FilmsComponent },
  { path: 'add-user', component: AddUserComponent },
  { path: '**', redirectTo: 'auth/login' },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

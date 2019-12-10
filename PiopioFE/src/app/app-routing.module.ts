import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {LoginComponent} from './auth/components/login/login.component';
import {AnonUsersGuard} from './auth/guards/anonusers.guard';
import {RegisterComponent} from './auth/components/register/register.component';
import {AuthUsersGuard} from './auth/guards/authusers.guard';
import {LandingPageComponent} from './landing-page/landing-page.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import {SearchResultComponent} from './search-result/search-result.component';
import {ProfileEditComponent} from './profile/profile-edit/profile-edit.component';

const routes: Routes = [
  // { path: '', redirectTo: 'home', pathMatch: 'full' },
  // (Solo pruebas) Para ver /home hay que cambiar AuthUsersGuard por AnonUsersGuard
  { path: 'home', component: HomeComponent, canActivate: [AuthUsersGuard]},
  { path: 'notifications', component: HomeComponent, canActivate: [AuthUsersGuard]},
  { path: 'trending/:topic', component: HomeComponent, canActivate: [AuthUsersGuard]},
  { path: 'login', component: LoginComponent, canActivate: [AnonUsersGuard]},
  { path: 'register', component: RegisterComponent , canActivate: [AnonUsersGuard]},
  { path: 'profile', component: ProfileComponent , canActivate: [AuthUsersGuard]},
  { path: 'edit-profile', component: ProfileComponent , canActivate: [AuthUsersGuard]},
  { path: 'search', component: SearchResultComponent , canActivate: [AuthUsersGuard]},
  { path: ':username', component: ProfileComponent, canActivate: [AuthUsersGuard]},
  { path: '', component: LandingPageComponent, canActivate: [AnonUsersGuard]},
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {LoginComponent} from './auth/components/login/login.component';
import {AnonUsersGuard} from './auth/guards/anonusers.guard';
import {RegisterComponent} from './auth/components/register/register.component';
import {AuthUsersGuard} from './auth/guards/authusers.guard';
import {LandingPageComponent} from './landing-page/landing-page.component';


const routes: Routes = [
  // { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [AnonUsersGuard]},
  { path: 'register', component: RegisterComponent , canActivate: [AnonUsersGuard]},
  { path: '', component: LandingPageComponent, canActivate: [AnonUsersGuard]},
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SignUpComponent } from './sign-up/sign-up.component';
import { LandingPageComponent } from './landing-page/landing-page.component';


const routes: Routes = [
  //{ path: '', redirectTo: 'signup', pathMatch: 'full' },
  { path: '', component: LandingPageComponent},
  { path: 'signup', component: SignUpComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}

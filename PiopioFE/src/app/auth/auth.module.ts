import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {RegisterComponent} from './components/register/register.component';
import {LoginComponent} from './components/login/login.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {TokenInterceptor} from './token.interceptor';
import {AnonUsersGuard} from './guards/anonusers.guard';
import {AuthService} from './services/auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import {AuthUsersGuard} from './guards/authusers.guard';

@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  providers: [
    AnonUsersGuard,
    AuthUsersGuard,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
})
export class AuthModule  { }

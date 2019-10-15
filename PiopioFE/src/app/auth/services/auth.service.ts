import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import {JWT} from '../models/jwt';
import {Observable, of, throwError} from 'rxjs';
import {catchError, mapTo, tap} from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usersEndPoint = 'http://localhost:8000/api/users/';
  private tokensEndPoint = 'http://localhost:8000/api/token/';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  private loggedUser: string;
  private jwtHelper = new JwtHelperService();

  constructor(private httpClient: HttpClient) { }

  me() {
    return this.httpClient.get(`${this.usersEndPoint}me`, { headers : this.httpHeaders });
  }

  register(user: any) {
    return this.httpClient.post<any>(this.usersEndPoint, user, { headers : this.httpHeaders });
  }

  login(user: { username: string, password: string }): Observable<boolean> {
    return this.httpClient.post<any>(this.tokensEndPoint, user, { headers : this.httpHeaders })
      .pipe(
        tap(jwt => this.doLoginUser(user.username, jwt)),
        mapTo(true),
        catchError(error => {
          alert(error.error);
          return of(false);
        }));
  }

  isLoggedIn() {
    if (this.getRefreshToken() && this.jwtHelper.isTokenExpired(this.getRefreshToken())) {
      this.logout();
    }
    return !!this.getJwtToken();
  }

  refreshToken() {
    return this.httpClient.post<any>(`${this.tokensEndPoint}refresh/`, {
      'refresh': this.getRefreshToken()
    }).pipe(
      tap((jwt) => {
        console.log('Refresh called: ' + jwt.access);
        this.storeJwtToken(jwt.access);
      })
    );
  }

  getJwtToken() {
    return localStorage.getItem('ACCESS_TOKEN');
  }

  getLoggedUser() {
    return this.loggedUser;
  }

  private doLoginUser(username: string, jwt: JWT) {
    this.loggedUser = username;
    this.storeTokens(jwt);
  }

  logout() {
    this.doLogoutUser();
  }

  private doLogoutUser() {
    this.loggedUser = null;
    this.removeTokens();
  }

  private getRefreshToken() {
    return localStorage.getItem('REFRESH_TOKEN');
  }

  private storeJwtToken(jwt: string) {
    localStorage.setItem('ACCESS_TOKEN', jwt);
  }

  private storeTokens(jwt: JWT) {
    localStorage.setItem('ACCESS_TOKEN', jwt.access);
    localStorage.setItem('REFRESH_TOKEN', jwt.refresh);
  }

  private removeTokens() {
    localStorage.removeItem('ACCESS_TOKEN');
    localStorage.removeItem('REFRESH_TOKEN');
  }

}

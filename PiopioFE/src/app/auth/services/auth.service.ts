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
  private jwtHelper = new JwtHelperService();

  constructor(private httpClient: HttpClient) { }

  me() {
    return this.httpClient.get(`${this.usersEndPoint}me`, { headers : this.httpHeaders });
  }

  register(user: any) {
    return this.httpClient.post<any>(this.usersEndPoint, user, { headers : this.httpHeaders });
  }

  login(user: { username: string, password: string }): Observable<boolean> {
    return this.httpClient.post<any>(this.tokensEndPoint, user, { headers : this.httpHeaders });
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

  private doLoginUser(jwt: JWT) {
    this.storeTokens(jwt);
  }

  logout() {
    this.doLogoutUser();
  }

  private doLogoutUser() {
    this.removeTokens();
  }

  private getRefreshToken() {
    return localStorage.getItem('REFRESH_TOKEN');
  }

  private storeJwtToken(jwt: string) {
    localStorage.setItem('ACCESS_TOKEN', jwt);
  }

  storeTokens(jwt: JWT) {
    localStorage.setItem('ACCESS_TOKEN', jwt.access);
    localStorage.setItem('REFRESH_TOKEN', jwt.refresh);
  }

  private removeTokens() {
    localStorage.removeItem('ACCESS_TOKEN');
    localStorage.removeItem('REFRESH_TOKEN');
  }

}

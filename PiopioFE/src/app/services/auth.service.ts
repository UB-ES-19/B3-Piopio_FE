import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

import 'rxjs/internal/Observable';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usersEndPoint: string = 'http://localhost:8000/api/users/';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private httpClient: HttpClient) { }

  signUp(user: any) {
    return this.httpClient.post(this.usersEndPoint, user, { headers : this.httpHeaders });
  }

}

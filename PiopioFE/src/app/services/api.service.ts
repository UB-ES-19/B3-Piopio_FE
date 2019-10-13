import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {catchError, mapTo, tap} from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private postsEndPoint = 'http://localhost:8000/api/posts/';
  private tokensEndPoint = 'http://localhost:8000/api/token/';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  private loggedUser: string;
  private jwtHelper = new JwtHelperService();
  constructor(private httpClient: HttpClient) { }

  createPost(tweet:any){
    return this.httpClient.post<any>(this.postsEndPoint,tweet,{headers : this.httpHeaders});

  }






}



 













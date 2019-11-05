import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private postsEndPoint = 'http://localhost:8000/api/posts/';
  private usersEndPoint = 'http://localhost:8000/api/users/';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  constructor(private httpClient: HttpClient) { }

  createPost(post: any) {
    return this.httpClient.post<any>(this.postsEndPoint, post, {headers : this.httpHeaders});
  }

  getMyPosts(limit: number, offset: number) {
    return this.httpClient.get<any>(`${this.postsEndPoint}me/?limit=${limit}&offset=${offset}`, {headers : this.httpHeaders});
  }

  getMyProfile() {
    return this.httpClient.get<any>(`${this.usersEndPoint}me`, {headers : this.httpHeaders});
  }

  getProfile(username: string) {
    return this.httpClient.get<any>(`${this.usersEndPoint}${username}`, {headers : this.httpHeaders});
  }

  searchUser(username: string) {
    return this.httpClient.get<any>(`${this.usersEndPoint}search/?username=${username}`, {headers : this.httpHeaders});
  }

  followUser(username: string) {
    return this.httpClient.post<any>(`${this.usersEndPoint}/follow/`, {headers : this.httpHeaders, params: {"username": username}});
  }

  unfollowUser(username: string) {
    return this.httpClient.post<any>(`${this.usersEndPoint}/unfollow/`, {headers : this.httpHeaders, params: {"username": username}});
  }
}

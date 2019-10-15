import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private postsEndPoint = 'http://localhost:8000/api/posts/';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  constructor(private httpClient: HttpClient) { }

  createPost(post: any) {
    return this.httpClient.post<any>(this.postsEndPoint, post, {headers : this.httpHeaders});
  }

  getMyPosts(limit: number, offset: number) {
    return this.httpClient.get<any>(`${this.postsEndPoint}me/?limit=${limit}&offset=${offset}`, {headers : this.httpHeaders});
  }
}

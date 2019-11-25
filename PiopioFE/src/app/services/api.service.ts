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

  getPosts(id: any, limit: number, offset: number){
    return this.httpClient.get<any>(`${this.usersEndPoint}${id}/posts/?limit=${limit}&offset=${offset}`, {headers : this.httpHeaders});
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

  searchPosts(content: string) {
    return this.httpClient.get<any>(`${this.postsEndPoint}search/?content=${content}`, {headers : this.httpHeaders});
  }

  followUser(username: string) {
    return this.httpClient.post<any>(`${this.usersEndPoint}follow/`, {"username": username},{headers : this.httpHeaders});
  }

  unfollowUser(username: string) {
    return this.httpClient.post<any>(`${this.usersEndPoint}unfollow/`, {"username": username},{headers : this.httpHeaders});
  }

  uploadMedia(type: string, fileContents: any) {
    return this.httpClient.post(`http://api.cloudinary.com/v1_1/dt5t5tmbw/${type}/upload`, {
      file: fileContents,
      upload_preset: 'ywmfaral'
    }, );
  }

  deleteMedia(publicId: string, deleteToken: string) {
    return this.httpClient.post(`http://api.cloudinary.com/v1_1/dt5t5tmbw/delete_by_token`, { public_id: publicId, token: deleteToken });
  }

  editUserProfile(id: number, data: any) {
    return this.httpClient.put(`${this.usersEndPoint}${id}/`, {profile: data}, {headers : this.httpHeaders});
  }
}

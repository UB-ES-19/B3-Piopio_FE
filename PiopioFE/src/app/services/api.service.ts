import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private postsEndPoint = 'http://localhost:8000/api/posts/';
  private usersEndPoint = 'http://localhost:8000/api/users/';
  private apiEndPoint = 'http://localhost:8000/api/';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  constructor(private httpClient: HttpClient) { }

  createPost(post: any) {
    return this.httpClient.post<any>(this.postsEndPoint, post, {headers : this.httpHeaders});
  }

  getMyPosts(limit: number, offset: number) {
    return this.httpClient.get<any>(`${this.postsEndPoint}me/?limit=${limit}&offset=${offset}`, {headers : this.httpHeaders});
  }

  getPosts(id: any, limit: number, offset: number){
    console.log(id)
    return this.httpClient.get<any>(`${this.usersEndPoint}${id}/posts/?limit=${limit}&offset=${offset}`, {headers : this.httpHeaders});
  }

  getFollowedUserPosts(id: any, limit: number, offset: number) {
    return this.httpClient.get<any>(`${this.usersEndPoint}${id}/all_related/?limit=${limit}&offset=${offset}`, {headers : this.httpHeaders});
  }

  getMyProfile() {
    return this.httpClient.get<any>(`${this.usersEndPoint}me`, {headers : this.httpHeaders});
  }

  getProfile(username: string) {
    return this.httpClient.get<any>(`${this.usersEndPoint}${username}`, {headers : this.httpHeaders});
  }

  searchUser(username: string) {
    if(username.substring(0,1) == '#'){
      username = username.substring(1,username.length);
      return this.httpClient.get<any>(`${this.usersEndPoint}search/?username=%23${username}`, {headers : this.httpHeaders});
    }else{
      return this.httpClient.get<any>(`${this.usersEndPoint}search/?username=${username}`, {headers : this.httpHeaders});
    }
  }

  searchPosts(content: string) {
    content = content.replace('#', '%23');
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

  clickOnLike(postId: number) {
    return this.httpClient.post<any>(`${this.usersEndPoint}like/${postId}/`, {headers : this.httpHeaders});
  }

  clickOnRT(postId: number) {
    return this.httpClient.post<any>(`${this.usersEndPoint}retweet/${postId}/`, {headers : this.httpHeaders});

  }

  getPost(id: number) {
    return this.httpClient.get<any>(`${this.postsEndPoint}${id}`, {headers : this.httpHeaders});
  }

  getTrendingTopics() {
    return this.httpClient.get<any>(`${this.apiEndPoint}trendingtopic`, {headers : this.httpHeaders});
  }

  deleteMedia(publicId: string, deleteToken: string) {
    return this.httpClient.post(`http://api.cloudinary.com/v1_1/dt5t5tmbw/delete_by_token`, { public_id: publicId, token: deleteToken });
  }

  editUserProfile(id: number, data: any) {
    return this.httpClient.put(`${this.usersEndPoint}${id}/`, {profile: data}, {headers : this.httpHeaders});
  }

  getNotifications() {
    return this.httpClient.get('http://localhost:8000/api/users/notifications/', {headers: this.httpHeaders});
  }

  readNotification(id: number) {
    return this.httpClient.post('http://localhost:8000/api/notifications/notified/', {post: id}, {headers: this.httpHeaders});
  }
}

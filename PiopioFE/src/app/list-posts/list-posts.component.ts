import { Component, OnInit } from '@angular/core';
import {ApiService} from '../services/api.service';
import {AuthService} from '../auth/services/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-posts',
  templateUrl: './list-posts.component.html',
  styleUrls: ['./list-posts.component.css']
})
export class ListPostsComponent implements OnInit {

  posts = [];
  limit = 5;
  offset = 0;
  nextUrl: string;
  username: string;

  constructor(private apiService: ApiService, private authService: AuthService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.username = this.route.snapshot.paramMap.get('username');
    this.getPosts();
  }

  getPosts() {

     if (this.username) {
      this.apiService.getProfile(this.username).subscribe(other => {
        this.apiService.getPosts(other.id, this.limit, this.offset).subscribe(
          value => {
            console.log(value);
            this.nextUrl = value.next;
            this.posts = this.posts.concat(value.results);
            this.offset = this.posts.length;
          }, error => {
            console.log(error);
          });
      });
    } else {
      this.apiService.getMyPosts(this.limit, this.offset).subscribe(
        value => {
          console.log(value);
          this.nextUrl = value.next;
          this.posts = this.posts.concat(value.results);
          this.offset = this.posts.length;
        }, error => {
          console.log(error);
        });
    }


  }

  onScroll() {
    if (this.nextUrl) {
      this.getPosts();
    }
  }

  addPost() {
    this.apiService.getMyPosts(1, 0).subscribe(value => {
      this.posts.unshift(value.results[0]);
      this.offset = this.posts.length;
    }, error => {
      console.log(error);
    });
  }

  clickOnRetweet(postId:any){
    console.log(postId)
    this.apiService.clickOnRT(postId).subscribe(
      value =>{
        this.getPosts();
      }, error=>{
        console.log(error);
      })


  }

  clickOnLike(postId:any){
    console.log(postId)
    this.apiService.clickOnLike(postId).subscribe(
      value =>{
        this.getPosts();

      }, error=>{
        console.log(error);
      })

  }




}

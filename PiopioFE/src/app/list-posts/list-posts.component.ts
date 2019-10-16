import { Component, OnInit } from '@angular/core';
import {ApiService} from '../services/api.service';
import {AuthService} from '../auth/services/auth.service';

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

  constructor(private apiService: ApiService, private authService: AuthService) { }

  ngOnInit() {
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

  onScroll() {
    if (this.nextUrl) {
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

  addPost(post: any) {
    this.authService.me().subscribe(
      value => {
        const data = {
          content : post.content,
          user: value,
        };
        this.posts.unshift(data);
        this.offset = this.posts.length;
      },
      error => {
        console.log(error);
      });
  }
}

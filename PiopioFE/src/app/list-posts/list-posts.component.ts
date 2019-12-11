import {Component, Input, OnInit} from '@angular/core';
import {ApiService} from '../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';

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

  constructor(protected apiService: ApiService) { }

  ngOnInit() {
  }

  updatePosts(value: any) {
    console.log(value);
    this.nextUrl = value.next;
    this.posts = this.posts.concat(value.results);
    this.offset = this.posts.length;
  }

  getPosts() {
  }

  onScroll() {
    if (this.nextUrl) {
      this.getPosts();
    }
  }

  addPost() {
    this.apiService.getMyPosts(1, 0).subscribe(value => {
      console.log(value);
      this.posts.unshift(value.results[0]);
      this.offset = this.posts.length;
    }, error => {
      console.log(error);
    });
  }
}

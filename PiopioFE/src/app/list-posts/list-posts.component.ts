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
  username: string;
  topic: string;
  currentUser: any;

  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.username = this.route.snapshot.paramMap.get('username');
    this.topic = this.route.snapshot.paramMap.get('topic');
    this.apiService.getMyProfile().subscribe(me => {
      this.currentUser = me;
      this.getPosts();
    });
  }

  private updatePosts(value: any) {
    console.log(value);
    this.nextUrl = value.next;
    this.posts = this.posts.concat(value.results);
    this.offset = this.posts.length;
  }

  getPosts() {
    if (this.router.url == '/home') {
      this.apiService.getFollowedUserPosts(this.currentUser.id, this.limit, this.offset).subscribe(
        value => {
          this.updatePosts(value);
        }, error => {
          console.log(error);
        });
    } else {
      if (this.username) {
        this.apiService.getProfile(this.username).subscribe(other => {
          this.apiService.getPosts(other.id, this.limit, this.offset).subscribe(
            value => {
              this.updatePosts(value);
            }, error => {
              console.log(error);
            });
        });
      } else if (this.topic) {
        this.apiService.searchPosts(this.topic).subscribe(
          value=> {
            this.updatePosts(value);
          }, error => {
            console.log(error);
          });
      } else {
        this.apiService.getPosts(this.currentUser.id, this.limit, this.offset).subscribe(
          value => {
            this.updatePosts(value);
          }, error => {
            console.log(error);
          });
      }
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
}

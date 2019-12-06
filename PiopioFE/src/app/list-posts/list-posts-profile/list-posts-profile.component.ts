import { Component, OnInit } from '@angular/core';
import {ListPostsComponent} from '../list-posts.component';
import {ApiService} from '../../services/api.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-list-posts-profile',
  templateUrl: './../list-posts.component.html',
  styleUrls: ['./../list-posts.component.css'],
})
export class ListPostsProfileComponent extends ListPostsComponent implements OnInit {

  constructor(protected apiService: ApiService, protected route: ActivatedRoute) {
    super(apiService);
  }

  ngOnInit() {
    this.username = this.route.snapshot.paramMap.get('username');
    this.apiService.getMyProfile().subscribe(me => {
      this.currentUser = me;
      this.getPosts();
    });
  }

  getPosts() {
    if (this.username) {
      this.apiService.getProfile(this.username).subscribe(other => {
        this.apiService.getPosts(other.id, this.limit, this.offset).subscribe(
          value => {
            this.updatePosts(value);
          }, error => {
            console.log(error);
          });
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

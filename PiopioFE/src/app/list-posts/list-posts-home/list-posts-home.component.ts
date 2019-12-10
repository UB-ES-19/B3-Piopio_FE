import { Component, OnInit } from '@angular/core';
import {ListPostsComponent} from '../list-posts.component';
import {ApiService} from '../../services/api.service';

@Component({
  selector: 'app-list-posts-home',
  templateUrl: './../list-posts.component.html',
  styleUrls: ['./../list-posts.component.css'],
})
export class ListPostsHomeComponent extends ListPostsComponent implements OnInit {

  constructor(protected apiService: ApiService) {
    super(apiService);
  }

  ngOnInit() {
    this.apiService.getMyProfile().subscribe(me => {
      this.currentUser = me;
      this.getPosts();
    });
  }

  getPosts() {
    this.apiService.getFollowedUserPosts(this.currentUser.id, this.limit, this.offset).subscribe(
      value => {
        this.updatePosts(value);
      }, error => {
        console.log(error);
      });
  }

}

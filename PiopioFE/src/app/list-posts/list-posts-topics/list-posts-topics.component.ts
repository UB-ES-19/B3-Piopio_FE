import { Component, OnInit } from '@angular/core';
import {ListPostsComponent} from '../list-posts.component';
import {ApiService} from '../../services/api.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-list-posts-topics',
  templateUrl: './../list-posts.component.html',
  styleUrls: ['./../list-posts.component.css'],
})
export class ListPostsTopicsComponent extends ListPostsComponent implements OnInit {

  topic: string;

  constructor(protected apiService: ApiService, protected route: ActivatedRoute) {
    super(apiService);
  }

  ngOnInit() {
    this.topic = this.route.snapshot.paramMap.get('topic');
    this.getPosts();
  }

  getPosts() {
    this.apiService.searchPosts('#' + this.topic).subscribe(
      value => {
        this.updatePosts(value);
      }, error => {
        console.log(error);
      });
  }

}

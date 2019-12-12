import { Component, OnInit } from '@angular/core';
import {ApiService} from '../services/api.service';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {

  postId: string;
  parent: any;
  post: any;
  comments: any[];
  notFound = false;
  currentUser: any;

  constructor(private apiService: ApiService, protected route: ActivatedRoute, private location: Location) {
    route.params.subscribe(val => {
      this.postId = this.route.snapshot.paramMap.get('post_id');
      this.parent = null;
      this.post = null;
      this.comments = [];
      this.getDetails();
    });
  }

  ngOnInit() {
    this.postId = this.route.snapshot.paramMap.get('post_id');
    this.apiService.getMyProfile().subscribe(me => {
      this.currentUser = me;
      this.getDetails();
    });
  }

  getDetails() {
    this.apiService.getPostDetail(this.postId).subscribe(value => {
      console.log(value);
      this.parent = value.details.parent;
      this.post = value.details.post;
      this.comments = value.details.childs;
    }, error => {
      this.notFound = true;
    });
  }

  goBack() {
    this.location.back();
  }
}

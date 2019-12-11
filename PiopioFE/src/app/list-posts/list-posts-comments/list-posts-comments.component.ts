import {Component, Input, OnInit} from '@angular/core';
import {ListPostsComponent} from '../list-posts.component';
import {ApiService} from '../../services/api.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-list-posts-comments',
  templateUrl: './../list-posts.component.html',
  styleUrls: ['./../list-posts.component.css'],
})
export class ListPostsCommentsComponent extends ListPostsComponent implements OnInit {

  postId: string;

  constructor(protected apiService: ApiService, private route: ActivatedRoute) {
    super(apiService);
  }

  ngOnInit() {
    this.postId = this.route.snapshot.paramMap.get('post_id');
    this.apiService.getPostDetail(this.postId).subscribe(value => {
      this.posts = value.details.childs;
    }, error => {
    });
  }

  onScroll() {
  }

}

import {Component, Input, OnChanges, OnInit, SimpleChange, SimpleChanges} from '@angular/core';
import {ListPostsComponent} from '../list-posts.component';
import {ApiService} from '../../services/api.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-list-posts-comments',
  templateUrl: './../list-posts.component.html',
  styleUrls: ['./../list-posts.component.css'],
})
export class ListPostsCommentsComponent extends ListPostsComponent implements OnInit, OnChanges {

  currentUser: any;
  @Input()
  comments: any[] = [];

  constructor(protected apiService: ApiService) {
    super(apiService);
  }

  ngOnInit() {
    this.apiService.getMyProfile().subscribe(me => {
      this.currentUser = me;
    });
    this.posts = this.comments;
  }

  onScroll() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    const currentItem: SimpleChange = changes.comments;
    this.posts = currentItem.currentValue;
  }
}

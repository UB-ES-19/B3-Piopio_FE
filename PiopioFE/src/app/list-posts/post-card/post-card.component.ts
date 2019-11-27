import {AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, Input, NgZone, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.css']
})
export class PostCardComponent implements OnInit {

  @Input()
  post: any;
  @Input()
  currentUser: any;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
  }

  clickOnRetweet() {
    this.apiService.clickOnRT(this.post.id).subscribe(
      value => {
        if(this.post.retweeted == 'false') {
          this.post.retweeted = 'true';
          this.post.retweeted_count++;
        } else {
          this.post.retweeted = 'false';
          this.post.retweeted_count--;
        }
      }, error => {
        console.log(error);
      });
  }

  clickOnLike() {
    this.apiService.clickOnLike(this.post.id).subscribe(
      value => {
        if(this.post.liked == 'false') {
          this.post.liked = 'true';
          this.post.favorited_count++;
        } else {
          this.post.liked = 'false';
          this.post.favorited_count--;
        }
      }, error => {
        console.log(error);
      });
  }
}

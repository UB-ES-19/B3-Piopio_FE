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
  mentions: string[] = [];
  newContent: string[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    if (this.post) {
      // const matches = this.extractMentions(this.post.content);
      // if (matches) {
      //   this.mentions = matches.filter((elem, index, self) => {
      //     return index === self.indexOf(elem);
      //   });
      // }
      if (this.post.mentions.length > 0) {
        this.post.mentions.forEach(mention => {
          this.mentions.push('@' + mention.username);
        });
      }
      const textArr = this.post.content.split(' ');
      textArr.forEach(text => {
        const match = this.mentions.filter((item) => {
          return item === text;
        });
        if (match.length > 0) {
          this.newContent.push(`<a href="/${text.substr(1, text.length)}">${text}</a>`);
        } else {
          this.newContent.push(text);
        }
      });
      this.post.content = this.newContent.join(' ');
    }
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

import {
  AfterViewInit,
  Component, ElementRef,
  Input,
  OnChanges,
  OnInit, SimpleChange,
  SimpleChanges
} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {ActivatedRoute, Router} from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.css']
})
export class PostCardComponent implements OnInit, OnChanges, AfterViewInit  {

  @Input()
  post: any = null;
  @Input()
  focus = false;
  mentions: string[] = [];
  newContent: string[] = [];
  @Input()
  currentUser: any;
  reported: boolean = false;

  constructor(private apiService: ApiService, private router: Router, private el: ElementRef) {
  }

  ngOnInit() {
    setTimeout(() => {
      this.renderPostData();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const currentItem: SimpleChange = changes.post;
    if (currentItem) {
      this.post = currentItem.currentValue;
    }
  }

  ngAfterViewInit() {
    $(this.el.nativeElement).on('click', 'a.user-mention', (e) => {
      e.preventDefault();
      this.router.navigate([e.target.pathname]);
    });
    $(this.el.nativeElement).on('click', 'a.hashtag-url', (e) => {
      e.preventDefault();
      this.router.navigate([e.target.pathname]);
    });
  }

  renderPostData() {
    if (this.post) {
      if (this.post.mentions) {
        if (this.post.mentions.length > 0) {
          this.post.mentions.forEach(mention => {
            this.mentions.push('@' + mention.username);
          });
        }
        const textArr = this.post.content.split(' ');
        textArr.forEach(text => {
          const match = this.mentions.filter((mention) => {
            return mention === text;
          });
          if (match.length > 0) {
            this.newContent.push(`<a class="user-mention" href="/${text.substr(1, text.length)}">${text}</a>`);
          } else {
            if (text.includes('#')) {
              this.newContent.push(text.replace( /(^|\s)(#[a-z\d-]+)/ig, `<a class="hashtag-url" href="/trending/${text.substr(1, text.length)}">${text}</a>`));
            } else {
              this.newContent.push(text);
            }
          }
        });
        this.post.content = this.newContent.join(' ');
      }
    }
  }

  goToDetail() {
    this.router.navigate(['/post/', this.post.id]);
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

  clickOnReport() {
    this.apiService.clickOnReport(this.post.id).subscribe(
      value => {
        this.reported = true;
      }, error => {
        console.log(error);
      });
  }


}

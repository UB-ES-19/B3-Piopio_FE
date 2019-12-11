import {AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, Input, NgZone, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {generateAnalysis} from '@angular/compiler-cli/src/ngtsc/indexer/src/transform';
import {Router} from '@angular/router';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.css']
})
export class PostCardComponent implements OnInit {

  @Input()
  post: any;
  @Input()
  focus = false;
  mentions: string[] = [];
  newContent: string[] = [];

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit() {
    if (this.post) {
      if(this.post.mentions) {
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
  }

  goToDetail() {
    this.router.navigate(['/post/', this.post.id])
      .then(() => {
        window.location.reload();
      });
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

  clickOnReport(){
    this.apiService.clickOnReport(this.post.id).subscribe(
      value=>{
        console.log(value)
      },error =>{
        console.log(error);
      });
  }


}

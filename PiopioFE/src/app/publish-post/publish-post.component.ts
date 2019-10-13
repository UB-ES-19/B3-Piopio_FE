import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-publish-post',
  templateUrl: './publish-post.component.html',
  styleUrls: ['./publish-post.component.css']
})
export class PublishPostComponent implements OnInit {

  public tweet:any;

  constructor(private apiService:ApiService) { }

  ngOnInit() {
  }



  postTweet(){
    this.tweet = document.getElementById("tweet").value;
    this.apiService.createPost(this.tweet);
    document.getElementById("tweet").value = '';
  
  }


}

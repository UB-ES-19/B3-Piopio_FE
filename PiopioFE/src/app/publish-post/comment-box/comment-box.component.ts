import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import {PublishPostComponent} from '../publish-post.component';
import {ActivatedRoute} from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-comment-box',
  templateUrl: './../publish-post.component.html',
  styleUrls: ['./../publish-post.component.css'],
})
export class CommentBoxComponent extends PublishPostComponent implements OnInit {

  postId: string;

  constructor(protected apiService: ApiService,  protected formBuilder: FormBuilder, private route: ActivatedRoute) {
    super(apiService, formBuilder);
    route.params.subscribe(val => {
      if (this.postId) {
        this.postId = this.route.snapshot.paramMap.get('post_id');
      }
    });
  }

  ngOnInit() {
    super.ngOnInit();
    this.postId = this.route.snapshot.paramMap.get('post_id');
  }

  publish(post: FormGroup) {
    post.value.type = this.type;
    if (this.previews.length > 0) {
      this.previews.forEach(preview => {
        this.mediaUrls.push({url: preview.public_id});
      });
      post.value.media = this.mediaUrls;
    }
    console.log(post.value);
    this.apiService.reply(post.value, this.postId).subscribe(
      value =>{
        this.listPostRef.addPost();
        this.postForm.reset();
        this.previews = [];
        $('.compose-option').show();
        $('.upload-close-button').show();
        $('.upload-media-button').show();
      },
      error =>{
        console.log(error);
      }
    );
  }

}

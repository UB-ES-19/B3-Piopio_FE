import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import { ApiService } from '../services/api.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ListPostsComponent} from '../list-posts/list-posts.component';
import * as $ from 'jquery';

@Component({
  selector: 'app-publish-post',
  templateUrl: './publish-post.component.html',
  styleUrls: ['./publish-post.component.css'],
})
export class PublishPostComponent implements OnInit {

  postForm: FormGroup;
  @Input()
  listPostRef: ListPostsComponent;
  images: File[] = [];
  videos: File[] = [];

  constructor(private apiService: ApiService,  private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.postForm = this.formBuilder.group({
      content: ['', [Validators.required]],
      type: ['text'],
    });
  }

  publish(post: FormGroup) {
    console.log(post.value)
    this.apiService.createPost(post.value).subscribe(
      value => {
        this.listPostRef.addPost(post.value);
        this.postForm.reset();
      },
      error => {
        console.log(error);
      });
  }

  onSelectImages(event) {
    if (this.images.length < 4) {
      this.images.push(...event.addedFiles);
    }
  }

  onRemoveImages(event) {
    this.images.splice(this.images.indexOf(event), 1);
  }

  onSelectVideo(event) {
    this.videos.push(...event.addedFiles);
  }

  onRemoveVideo(event) {
    this.videos.splice(this.videos.indexOf(event), 1);
  }

  toggleImagesUpload() {
    $('.images-upload-modal').toggleClass('is-active');
  }

  toggleVideoUpload() {
    $('.video-upload-modal').toggleClass('is-active');
  }
}

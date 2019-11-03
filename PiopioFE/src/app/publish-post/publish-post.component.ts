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
  files: File[] = [];

  constructor(private apiService: ApiService,  private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.postForm = this.formBuilder.group({
      content: ['', [Validators.required]],
    });
  }

  publish(post: FormGroup) {
    this.apiService.createPost(post.value).subscribe(
      value => {
        this.listPostRef.addPost(post.value);
        this.postForm.reset();
      },
      error => {
        console.log(error);
      });
  }

  onSelect(event) {
    this.files.push(...event.addedFiles);
  }

  onRemove(event) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  toggleImagesUpload() {
    $('.images-upload-modal').toggleClass('is-active');
    console.log('images');
  }

  toggleVideoUpload() {
    $('.video-upload-modal').toggleClass('is-active');
    console.log('video');
  }
}

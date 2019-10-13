import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-publish-post',
  templateUrl: './publish-post.component.html',
  styleUrls: ['./publish-post.component.css']
})
export class PublishPostComponent implements OnInit {

  postForm: FormGroup;

  constructor(private apiService: ApiService,  private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.postForm = this.formBuilder.group({
      content: ['', [Validators.required]],
    });
  }

  publish(post: FormGroup) {
    this.apiService.createPost(post.value).subscribe(
      value => {
        this.postForm.reset();
        console.log(value);
      },
      error => {
        console.log(error);
      });
  }


}

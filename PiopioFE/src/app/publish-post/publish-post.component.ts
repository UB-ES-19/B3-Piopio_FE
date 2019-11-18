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
  mediaUrls: any[] = [];
  previews: any[] = [];
  type = 'text';

  constructor(private apiService: ApiService,  private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.postForm = this.formBuilder.group({
      content: ['', [Validators.required]],
      type: ['text'],
    });
  }

  private async readFile(file: File): Promise<string | ArrayBuffer> {
    return new Promise<string | ArrayBuffer>((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = e => {
        return resolve((e.target as FileReader).result);
      };

      reader.onerror = e => {
        console.error(`FileReader failed on file ${file.name}.`);
        return reject(null);
      };

      if (!file) {
        console.error('No file to read.');
        return reject(null);
      }

      reader.readAsDataURL(file);
    });
  }

  publish(post: FormGroup) {
    post.value.type = this.type;
    if (this.previews.length > 0) {
      this.previews.forEach(preview => {
        this.mediaUrls.push({url: preview.public_id});
      });
    }
    post.value.media = this.mediaUrls;
    this.apiService.createPost(post.value).subscribe(
      value => {
        this.listPostRef.addPost(post.value);
        this.postForm.reset();
        this.previews = [];
        $('.compose-option').show();
      },
      error => {
        console.log(error);
      });
  }

  private uploadMedia(mediaArray) {
    $('.modal-close').hide();
    this.previews = [];
    mediaArray.forEach(media => {
      this.readFile(media).then(fileContents => {
        this.apiService.uploadMedia(this.type, fileContents).subscribe(
          (response: any) => {
            console.log(response);
            this.showMediaPreview(this.type, response.url, response.public_id, response.delete_token);
          }, error => {
            console.log(error);
          });
      });
    });
  }

  uploadImages() {
    if (this.images.length > 0) {
      this.type = 'image';
      this.uploadMedia(this.images);
    }
  }

  uploadVideo() {
    if (this.videos.length > 0) {
      this.type = 'video';
      this.uploadMedia(this.videos);
    }
  }

  private showMediaPreview(mediaType: string, mediaUrl: string, publicId: string, deleteToken: string) {
    this.previews.push({type: mediaType, url: mediaUrl, public_id: publicId, delete_token: deleteToken});
    if (this.previews.length === 1) { $('.compose-option').hide(); }
    switch (this.type) {
      case 'video':
        if (this.previews.length === this.videos.length) { this.toggleVideoUpload(); }
        break;
      case 'image':
        if (this.previews.length === this.images.length) { this.toggleImagesUpload(); }
        break;
    }
  }

  deleteImage(preview) {
    if (this.previews.length > 0) {
      this.apiService.deleteMedia(preview.public_id, preview.delete_token).subscribe(
        value => {
          console.log(value);
          this.previews.splice(this.previews.indexOf(preview), 1);
          if (this.previews.length === 0) {
            $('.compose-option').show();
          }
      }, error => {
        console.log(error);
      });
    }
    // console.log(preview.delete_token);
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
    this.images = [];
  }

  toggleVideoUpload() {
    $('.video-upload-modal').toggleClass('is-active');
    this.videos = [];
  }
}

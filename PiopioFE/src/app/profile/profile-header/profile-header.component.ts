import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import * as $ from 'jquery';
import {ApiService} from '../../services/api.service';

@Component({
  selector: 'app-profile-header',
  templateUrl: './profile-header.component.html',
  styleUrls: ['./profile-header.component.css']
})
export class ProfileHeaderComponent implements OnInit {

  @Input()
  userProfile: any;
  @Input()
  myProfile: boolean;
  @Input()
  following: boolean;
  media: File[] = [];
  type: string;

  constructor(private router: Router, private apiService: ApiService) { }

  ngOnInit() {
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

  private uploadMedia(mediaArray) {
    $('.upload-close-button').hide();
    $('.upload-media-button').hide();
    this.media.forEach(media => {
      this.readFile(media).then(fileContents => {
        this.apiService.uploadMedia('image', fileContents).subscribe(
          (response: any) => {
            console.log(response);
            switch (this.type) {
              case 'avatar':
                this.userProfile.profile.avatar_url = response.public_id;
                break;
              case 'banner':
                this.userProfile.profile.banner_url = response.public_id;
                break;
            }
            $('.upload-media-button').show();
            $('.upload-close-button').show();
            this.apiService.editUserProfile(this.userProfile.id,  this.userProfile.profile).subscribe(
              value => {
              console.log(value);
              this.toggleProfileMediaUpload();
            }, error => {
              console.log(error);
            });
          }, error => {
            console.log(error);
          });
      });
    });
  }

  onSelectImage(event) {
    this.media.push(...event.addedFiles);
  }

  toggleProfileMediaUpload(type?: string) {
    $('#profile-media-upload-modal').toggleClass('is-active');
    if (type) { this.type = type; }
    console.log(this.type);
    this.media = [];
  }

  onRemoveImage(event) {
    this.media.splice(this.media.indexOf(event), 1);
  }

  uploadProfileMedia() {
    console.log('upload ' + this.type);
    $('.upload-media-button').hide();
    $('.upload-close-button').hide();
    this.uploadMedia(this.media);
  }

  follow(username: string) {
    this.apiService.followUser(username).subscribe(
      value => {
        this.following = true;
      }, error => {
        console.log(error);
      }
    );
  }

  unfollow(username: string) {
    this.apiService.unfollowUser(username).subscribe(
      value => {
        this.following = false;
      }, error => {
        console.log(error);
      }
    );
  }
}

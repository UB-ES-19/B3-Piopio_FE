import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';
import { ApiService } from '../services/api.service';
import {ActivatedRoute, Router} from '@angular/router';
import { FnParam } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userProfile: object;
  username: string;
  isFollowing = false;
  userId: number;

  constructor(private authService: AuthService, private apiService: ApiService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.apiService.getMyProfile().subscribe(
      value => {
        this.username = this.route.snapshot.paramMap.get('username');
        this.userId = value.id;
        console.log(this.username);
        if (this.username && value.username === this.username) {
          this.router.navigate(['profile']);
        } else if (this.username) {
          this.apiService.getProfile(this.username).subscribe(
            other => {
              this.userProfile = other;
              console.log(this.userProfile)
              if (other.following.includes(this.userId)) { 
                this.isFollowing = true; 
                console.log(this.isFollowing);
              }
          }, error => {
            console.log(error);
            // User not found
            this.router.navigate(['profile']);
          });
        } else {
          console.log('dafault');
          this.userProfile = value;
          console.log(this.userProfile);
        }
      }, error => {
        console.log(error);
      });
  }

  follow(username: string) {
    this.apiService.followUser(username).subscribe(
      value => {
        if (value.username === 'Correct') { this.isFollowing = true; }
      }, error => {
        console.log(error);
      }
    );
  }

  unfollow(username: string){
    this.apiService.unfollowUser(username).subscribe(
      value => {
        if (value.username === 'Correct') { this.isFollowing = false; }
      }, error => {
        console.log(error);
      }
    );
  }
}



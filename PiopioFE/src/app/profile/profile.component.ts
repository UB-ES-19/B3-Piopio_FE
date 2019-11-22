import {Component, Input, OnInit} from '@angular/core';
import { AuthService } from '../auth/services/auth.service';
import { ApiService } from '../services/api.service';
import {ActivatedRoute, Router} from '@angular/router';
import { FnParam } from '@angular/compiler/src/output/output_ast';
import {ProfileHeaderComponent} from './profile-header/profile-header.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {

  userProfile: object;
  username: string;
  userId: number;
  myProfile = true;
  imFollower = false;

  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.apiService.getMyProfile().subscribe(
      value => {
        this.username = this.route.snapshot.paramMap.get('username');
        this.userId = value.id;
        if (this.username && value.username === this.username) {
          this.router.navigate(['profile']);
        } else if (this.username) {
          this.apiService.getProfile(this.username).subscribe(
            other => {
              this.userProfile = other;
              this.myProfile = false;
              if (other.following.includes(this.userId)) {
                this.imFollower = true;
              }
          }, error => {
            console.log(error);
            // User not found
            this.router.navigate(['profile']);
          });
        } else {
          console.log('current user profile');
          this.userProfile = value;
          console.log(this.userProfile);
        }
      }, error => {
        console.log(error);
      });
  }
}



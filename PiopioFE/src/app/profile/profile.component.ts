import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';
import { ApiService } from '../services/api.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userProfile: object;
  username: string;

  constructor(private authService: AuthService, private apiService: ApiService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {

    this.apiService.getMyProfile().subscribe(
      value => {
        this.username = this.route.snapshot.paramMap.get('username');
        console.log(this.username);
        if (this.username && value.username === this.username) {
          this.router.navigate(['profile']);
        } else if (this.username) {
          this.apiService.getProfile(this.username).subscribe(other => {
            this.userProfile = other;
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
}

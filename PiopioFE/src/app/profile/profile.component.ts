import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userProfile: object;

  constructor(private authService: AuthService, private apiService: ApiService) { }

  ngOnInit() {

    this.apiService.getMyProfile().subscribe(
      value => {
        console.log(value);
        this.userProfile = value;
      }, error => {
        console.log(error);
      });
  }
}

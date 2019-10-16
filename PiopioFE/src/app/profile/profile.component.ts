import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  loggedUserName: string;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.loggedUserName = this.authService.getLoggedUser();
  }

}

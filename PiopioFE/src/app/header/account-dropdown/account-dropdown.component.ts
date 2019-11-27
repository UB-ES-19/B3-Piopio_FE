import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../auth/services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-account-dropdown',
  templateUrl: './account-dropdown.component.html',
  styleUrls: ['./account-dropdown.component.css']
})
export class AccountDropdownComponent implements OnInit {

  currentUser: any;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.authService.me().subscribe(value => {
      this.currentUser = value;
    });
  }

  doLogout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

}

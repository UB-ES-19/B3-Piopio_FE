import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth/services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isCollapsed = true;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  doLogout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}

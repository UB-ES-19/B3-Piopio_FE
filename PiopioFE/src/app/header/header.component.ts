import { Component, OnInit } from '@angular/core';
import {Router, RoutesRecognized} from '@angular/router';
import { filter, pairwise } from 'rxjs/operators';
import {Location} from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router, private location: Location ) { }

  prevUrl: string;

  ngOnInit() {
  }

  onSearchChange(searchValue: string): void {
    if (!this.location.path().includes('search')) {
      this.prevUrl = this.location.path();
    }
    console.log(this.prevUrl);
    if (searchValue.length) {
      this.router.navigate(['/search'], { queryParams: {username: searchValue} });
    } else {
      if (this.prevUrl) {
        this.router.navigate([this.prevUrl]);
      }
    }
  }

}

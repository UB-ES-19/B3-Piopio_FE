import { Component } from '@angular/core';
import {Router} from '@angular/router';

declare function initGlobal(): any;
declare function initMain(): any;
declare function initFeed(): any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PiopioFE';
  constructor(private router: Router) {}

  loadJS() {
    initGlobal();
    initMain();
    initFeed();
  }
}

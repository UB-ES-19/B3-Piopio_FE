import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-header-mobile',
  templateUrl: './header-mobile.component.html',
  styleUrls: ['./header-mobile.component.css']
})
export class HeaderMobileComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  toogle() {
    $('div.navbar-burger').toggleClass('is-active');
    $('div.navbar-menu').toggleClass('is-active');
  }

}

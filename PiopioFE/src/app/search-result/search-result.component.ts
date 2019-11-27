import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../services/api.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})

export class SearchResultComponent implements OnInit {

  querySearch: string;
  users = [];
  posts = [];

  constructor(private route: ActivatedRoute, private apiService: ApiService, private router: Router) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.users = [];
      this.posts = [];
      this.querySearch = this.route.snapshot.queryParamMap.get('username');
      this.apiService.searchUser(this.querySearch).subscribe(
        value => {
          this.users = value.results;
          console.log(this.users);
        }, error => {
          console.log(error);
        });
      this.apiService.searchPosts(this.querySearch).subscribe(
        value => {
          this.posts = value.results;
          console.log(this.posts);
        }, error => {
          console.log(error);
        });
    });
  }

  goToProfile(username: string) {
    $('#search-input-text').val('');
    this.router.navigate(['', username]);
  }
}

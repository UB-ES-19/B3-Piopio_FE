import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ApiService} from '../services/api.service';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {

  querySearch: string;
  users = [];

  constructor(private route: ActivatedRoute, private apiService: ApiService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.users = []
      this.querySearch = this.route.snapshot.queryParamMap.get('username');
    });

    this.apiService.getUsers().subscribe(
      value => {
        console.log(value);
        value.results.forEach(element => {
          if (element.username == this.querySearch) this.users = this.users.concat(element);
        });
      }, error => {
        console.log(error);
    });
  }
}

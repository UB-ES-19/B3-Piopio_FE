import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-trending-topics',
  templateUrl: './trending-topics.component.html',
  styleUrls: ['./trending-topics.component.css']
})
export class TrendingTopicsComponent implements OnInit {

  topics = [];

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.getTrendingTopics().subscribe(
      value => {
        this.topics = value;
      }
    );
  }
}

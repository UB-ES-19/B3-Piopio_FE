import { Component, OnInit } from '@angular/core';
import {ApiService} from '../services/api.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  notifications: any;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.getNotifications().subscribe(value => {
      this.notifications = value;
    });
  }
}

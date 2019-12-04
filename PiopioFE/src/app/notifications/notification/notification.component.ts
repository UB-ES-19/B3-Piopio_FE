import {Component, Input, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  @Input()
  notification: any;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
  }

  markAsRead() {
    this.apiService.readNotification(this.notification.post.id).subscribe(value => {
      this.notification = value;
    }, error => {
      console.log(error);
    });
  }

}

import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../../services/api.service';
import {Router} from '@angular/router';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {

  @Input()
  userProfile: any;
  editProfileForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private apiService: ApiService, private router: Router) { }

  ngOnInit() {
    this.editProfileForm = this.formBuilder.group({
      first_name: [this.userProfile.profile.first_name, Validators.required],
      last_name: [this.userProfile.profile.last_name, Validators.required],
      birthday: [new Date(this.userProfile.profile.birthday), ],
      description: [this.userProfile.profile.description, ],
    });
  }

  saveProfile(form) {
    this.apiService.editUserProfile(this.userProfile.id, form.value).subscribe(
      value => {
        this.router.navigate(['/profile']);
    }, error => {
        console.log(error);
      });
  }

}

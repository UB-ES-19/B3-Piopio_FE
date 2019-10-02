import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  formSignUp: FormGroup;

  constructor(private authService: AuthService, private fb: FormBuilder) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.formSignUp = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirm_password: ['', [Validators.required]],
      profile: this.fb.group({
        first_name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
        last_name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]]
      })
    });
  }

  signUp(user: FormGroup): void {
    this.authService.signUp(user.value).subscribe(
    response => console.log(response),
    error => {
        console.log(error.error);
        Object.keys(error.error).forEach(prop => {
          const formControl = this.formSignUp.get(prop);
          if (formControl) {
            formControl.setErrors({
              serverError: error.error[prop]
            });
          }
        });
      }
    );
  }

}

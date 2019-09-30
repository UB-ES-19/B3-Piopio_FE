import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';

import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  formSignUp:FormGroup;

  constructor(private apiService:ApiService, private fb:FormBuilder) { }

  ngOnInit() {
    this.createForm("","","","","","");
  }

  createForm(username,email,password,repeatedPassword,name,surname){
    this.formSignUp = this.fb.group({
      'userName':[username,[
        Validators.required
      ]],
      'email':[email,[
        Validators.required
      ]],
      'password':[password,[
        Validators.required
      ]],
      'rePassword':[repeatedPassword,[
        Validators.required
      ]],
      'name':[name,[
        Validators.required
      ]],
      'surname':[surname,[
        Validators.required
      ]]

    })

  }

  signUp(){

    this.apiService.signUp(this.formSignUp.controls['userName'].value,this.formSignUp.controls['email'].value,
    this.formSignUp.controls['password'].value,this.formSignUp.controls['rePassword'].value,
    this.formSignUp.controls['name'].value,this.formSignUp.controls['surname'].value).then((dato:any)=>{
      console.log(dato);
    })

  }

}

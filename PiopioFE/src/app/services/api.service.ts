import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http'; 

import 'rxjs/internal/Observable';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  API_SERVER = "http://127.0.0.1:8000";

  constructor(private httpClient: HttpClient) { }

  signUp(userName:any,email:any,password:any,rePassword:any,name:any,surname:any){
    //completar url
    let url = `${this.API_SERVER}/....`;
    let params = new FormData();
    params.append('username',userName);
    params.append('email',email);
    params.append('password',password);
    params.append('confirm_password',rePassword);
    let profile = {'first_name':name,'last_name':surname};
    params.append('profile',JSON.stringify(profile));

    return this.httpClient.post(url,params,{responseType:'text'}).toPromise().then(this.extractData).catch(this.handleError);

  }

  private extractData(res:string) {
    let body = res;
    return body || {};
  }
  
  private handleError(error: any): Promise<any> {
    console.error('An error occurred',error);
    return Promise.reject(error.message || error);
  }
    

  
}

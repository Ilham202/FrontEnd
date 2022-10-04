import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, FormBuilder,Validators } from '@angular/forms';

@Injectable({
    providedIn: 'root'
  })
export class LoginService{
    url=`http://localhost:5001/authenticate`;
    constructor(private http: HttpClient,
        private formBuilder: FormBuilder,) {
    }
 authenticate(formData:any){
      return this.http.post(this.url,formData);
 }

}
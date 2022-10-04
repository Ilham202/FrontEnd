import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form = new FormGroup({
    username: new FormControl(),
    password: new FormControl(),
  });

  constructor(
    private loginService: LoginService,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: '',
      password: '',
    });
  }
  errors: any;

  submit(): void {

    // console.log(this.form.getRawValue());
    this.loginService.authenticate(this.form.getRawValue())
      .subscribe(
        (response: any) => {
          localStorage.setItem('token', response.jwtToken);
          localStorage.setItem('uId', JSON.stringify(response.uid));
          this.router.navigate(['/home']);
        },
        (error) => {
          this.errors = 'Username or password is incorrect.';
          // console.log('issue');
        },
      );

  }

}

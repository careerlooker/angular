import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RecruiterService } from '../recruiter/recruiter-services/recruiter.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[RecruiterService]
})
export class LoginComponent implements OnInit {
  rememberMe:boolean=false;
  registerType: string;
  isLoginError: boolean = false;
  invalidLogin: boolean = false;
  loginForm: FormGroup;
  email:string;
  constructor(private userService: UserService, private router: Router,
              private formBuilder: FormBuilder,private toastr:ToastrService,
              private recruiterService:RecruiterService) { }

  ngOnInit() {
    localStorage.removeItem('userToken');
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required])],
      password: ['', Validators.required]
    });
  }

  handleChange(registerType: string) {
    console.log("hi");
    this.registerType = registerType;
  }

  onSubmit() {
    if (this.registerType == undefined) {
      this.toastr.error('Please select login type');
      return
    }
    if (this.loginForm.invalid) {
      this.toastr.error('Please enter login details');
      return;
    }

    const body = new HttpParams()
      .set('username', this.loginForm.controls.username.value)
      .set('password', this.loginForm.controls.password.value)
      .set('grant_type', 'password');

    this.userService.getToken(body.toString()).subscribe((token:any)=> {
    let credentials={
                      "email":this.loginForm.controls.username.value,
                      "password":this.loginForm.controls.password.value
                    };
    localStorage.setItem('email',this.loginForm.controls.username.value);              
    localStorage.setItem('userToken',token.access_token);
    localStorage.setItem('credentials',JSON.stringify(credentials));
    if(this.registerType=='recruiter'){
    this.router.navigate(['/reqem/my-account/profile']);
    }else{
      this.router.navigate(['/seeqem/my-profile']);
    }
    },(err: HttpErrorResponse) => {
            this.toastr.error(err.error.error_description);
            console.log(err);
    });
  }

  toggleVisibility(isChecked:boolean){
    // this.rememberMe=isChecked;
    // if(isChecked)
    // localStorage.setItem('rememberMe',JSON.stringify(this.rememberMe));
    // else
    // localStorage.removeItem('rememberMe');
  }
}

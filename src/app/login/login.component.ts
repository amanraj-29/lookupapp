import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApisService } from '../shared/services/apis.service';
import { UtilitiesService } from '../shared/services/utilities.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formGroup!: FormGroup;
  message: any = null;
  errormgs: any;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    // private apiService: AuthServiceService,
    private apiService:ApisService,
    private utils:UtilitiesService
  ) {}

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      email: ['',[Validators.required,Validators.email]],
      password:['',Validators.required],
    })
  }



  loginProcess() {
    if (this.formGroup.valid) {
      this.apiService.login(this.formGroup.value).subscribe((result) => {
        if (result.success) {
          // this.formGroup.reset();
         //     this.utils.setSessionStorage('auth_token', result.token);
         // this.utils.callTimeInterval();
          // setInterval(() =>this.apiService.jwtTimeInterval , environment.sessionExpiryTime * 60 * 1000)
          this.utils.setSessionStorage('userData', result.email);
          this.utils.setSessionStorage('auth_token',result.token);
          // this.utils.setSessionStorage('Employee_First_Name',result.employeeFname);
          // this.utils.setSessionStorage('Employee_Last_Name',result.employeeLname);
          this.router.navigate(['search']);
        }
        if (result.success == 0) {
          // this.formGroup.reset();
          this.message = 'Invalid Email/Password.';
          this.errormgs = true;
          setTimeout(() => {
            this.errormgs = false;
          }, 3000);
        }
      });
    }
  }
}

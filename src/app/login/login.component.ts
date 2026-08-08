import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpServiceService } from '../http-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {

  constructor(private router: Router, private httpService: HttpServiceService) { }

  endpoint = 'http://localhost:8080/Auth/login';

  form: any = {
    data: {},
    errorMsg: '',
    successMsg: ''
  }

  signIn() {
    console.log(this.form.data.login);
    console.log(this.form.data.password);

    let _self = this;
    this.httpService.post(this.endpoint, this.form.data, function (response: any) {
      console.log("response: ", response);

      if (response.success == false && response.result.inputerror) {
        _self.form.inputerror = response.result.inputerror;
      }

      if (response.success == false && response.result.message) {
        _self.form.errorMsg = response.result.message;
      }

      if (response.success == true) {
        _self.router.navigateByUrl('/welcome')
      } else {
        _self.form.errorMsg = 'Invalid login or password';
      }

    })
    // if (this.form.login != null && this.form.password != null) {

    //   this.router.navigateByUrl('/welcome');

    // }
  }

  signUp() {
    this.router.navigateByUrl('/signup');
  }
}
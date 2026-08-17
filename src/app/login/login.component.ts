import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpServiceService } from '../http-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {

  endpoint = 'http://localhost:8080/Auth/login';

  constructor(private router: Router, private httpService: HttpServiceService, private activatedRoute: ActivatedRoute) {

    this.activatedRoute.queryParams.subscribe(params => {
      if (params['message']) {
        this.form.successMsg = params['message'];
      }
    });
  }
  form: any = {
    data: {},
    errorMsg: '',
    successMsg: ''
  }

  signIn() {
    // console.log(this.form.data.login);
    // console.log(this.form.data.password);

    this.form.errorMsg = ''
    this.form.successMsg = ''
    this.form.inputerror = {}

    this.httpService.post(this.endpoint, this.form.data, (response: any) => {

      console.log("response: ", response);

      if (response.success == false && response.result.inputerror) {
        this.form.inputerror = response.result.inputerror;
        return;
      }

      if (response.success == false && response.result.message) {
        this.form.errorMsg = response.result.message;
        return;
      }

      if (response.success == true) {
        localStorage.setItem('firstName', response.result.data.firstName);
        localStorage.setItem('roleName', response.result.data.roleName);
        localStorage.setItem('id', response.result.data.id);
        this.router.navigateByUrl('/welcome')
      } else {
        this.form.errorMsg = 'Invalid login or password';
      }

    });
    // if (this.form.login == admin && this.form.password == admin) {

    //   this.router.navigateByUrl('/welcome');

    // }

  }

  signUp() {
    this.router.navigateByUrl('/signup');
  }
}
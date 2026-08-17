import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpServiceService } from '../http-service.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html'
})
export class UserComponent {

  endpoint = 'http://localhost:8080/User/save'

  form: any = {
    data: {},
    errorMsg: '',
    successMsg: '',
    inputerror: {}
  }

  constructor(private httpService: HttpServiceService, private router: Router) { }

  save() {
    this.form.errorMsg = ''
    this.form.successMsg = ''
    this.form.inputerror = {};
    this.httpService.post(this.endpoint, this.form.data, (response: any) => {
      if (response.success == false && response.result.inputerror) {
        this.form.inputerror = response.result.inputerror;
        return;
      }
      if (response.success == false && response.result.message) {
        this.form.errorMsg = response.result.message;
        return;
      }
      if (response.success == true) {
        this.form.successMsg = response.result.message;
      }
    });
  }
  reset(){
    this.router.navigateByUrl('/user');
  }
}

import { Component } from '@angular/core';
import { HttpServiceService } from '../http-service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {

  constructor(private router: Router, private httpservice: HttpServiceService) { }

  form: any = {
    data: {}
  }

  isLogin() {
    let check = localStorage.getItem('firstName');

    if (check != null && check != 'null' && check != undefined && check != '') {

      this.form.data.firstName = check
      this.form.data.roleName = localStorage.getItem('roleName')
      this.form.data.id = localStorage.getItem('id')

      return true;
    }
    return false;
  }
  logout() {
    localStorage.clear();
    this.httpservice.get('http://localhost:8080/Auth/logout', (Response: any) => {
      console.log('Response', Response)
      this.router.navigateByUrl('/login?message=User Logout Successfully');
    });
  }
}
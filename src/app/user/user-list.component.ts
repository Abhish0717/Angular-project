import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from '../http-service.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html'
})
export class UserListComponent implements OnInit {

  constructor(private httpService: HttpServiceService, private router: Router) { }

  form: any = {
    list: [],
    searchParam: {},
    pageNo: 0,
    deleteParams: [],
    message: ''
  }

  ngOnInit(): void {
    this.search();
  }

  next() {
    this.form.pageNo++;
    this.search();
  }

  previous() {
    this.form.pageNo--;
    this.search();
  }

  search() {
    let self = this;
    this.httpService.post('http://localhost:8080/User/search/' + this.form.pageNo, this.form.searchParam, (response: any) => {
      if (response.success == true) {
        self.form.list = response.result.data;
      }
      if (response.success == false) {
        this.form.errorMessage = response.result.message;
      }
    });
  }

  edit(page: any) {
    console.log("page ==> ", page);
    this.router.navigateByUrl(page);
  }

}
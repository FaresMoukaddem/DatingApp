import { Component, OnInit } from '@angular/core';
import { User } from '../../_models/user';
import { UserService } from '../../_services/user.service';
import { AlertifyService } from '../../_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { Pagination, PaginatedResult } from 'src/app/_models/pagination';

@Component({
  selector: 'app-MemberList',
  templateUrl: './MemberList.component.html',
  styleUrls: ['./MemberList.component.css']
})
export class MemberListComponent implements OnInit {

  users: User[];

  user: User = JSON.parse(localStorage.getItem('user'));

  genderList = [{value: 'male', display: 'Males'}, {value: 'female', display: 'Females'}];

  userParams: any = {};

  pagination: Pagination;

  constructor(private userService: UserService, private alertifyService: AlertifyService, private route: ActivatedRoute)
  {

  }

  ngOnInit() {
    this.route.data.subscribe(data =>
      {
        this.users = data['users'].result;
        this.pagination = data['users'].pagination;
      });

    this.userParams.gender = this.user.gender === 'female' ? 'male' : 'female';
    this.userParams.minAge = 18;
    this.userParams.maxAge = 99;
    this.userParams.orderBy = 'lastActive';
  }

  resetFilters()
  {
    this.userParams.gender = this.user.gender === 'female' ? 'male' : 'female';
    this.userParams.minAge = 18;
    this.userParams.maxAge = 99;
    this.loadUsers();
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    console.log(this.pagination.currentPage);
    this.loadUsers();
  }

  loadUsers()
  {
    this.userService.getUsers(this.pagination.currentPage, this.pagination.itemsPerPage, this.userParams).subscribe((res: PaginatedResult<User[]>) =>
     {
       this.users = res.result;
       this.pagination = res.pagination;
     }, error =>
     {
       this.alertifyService.error(error);
     });
  }

}
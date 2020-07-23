import { Component, OnInit } from '@angular/core';
import { Pagination, PaginatedResult } from '../_models/pagination';
import { AuthService } from '../_services/auth.service';
import { User } from '../_models/user';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-Lists',
  templateUrl: './Lists.component.html',
  styleUrls: ['./Lists.component.css']
})
export class ListsComponent implements OnInit {

  users: User[];
  pagination: Pagination;
  likesParam: string;

  constructor(private authService: AuthService, private userService: UserService, private route: ActivatedRoute, private alertify: AlertifyService) { }

  ngOnInit() {

    this.route.data.subscribe(data =>
      {
        this.users = data['users'].result;
        this.pagination = data['users'].pagination;
      });

      this.likesParam = 'Likers';

  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    console.log(this.pagination.currentPage);
    this.loadUsers();
  }

  loadUsers()
  {
    this.userService.getUsers
    (this.pagination.currentPage, this.pagination.itemsPerPage, null, this.likesParam).subscribe((res: PaginatedResult<User[]>) =>
     {
       this.users = res.result;
       this.pagination = res.pagination;
     }, error =>
     {
       this.alertify.error(error);
     });
  }
}
import { Component, OnInit } from '@angular/core';
import { User } from '../../_models/user';
import { UserService } from '../../_services/user.service';
import { AlertifyService } from '../../_services/alertify.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-MemberList',
  templateUrl: './MemberList.component.html',
  styleUrls: ['./MemberList.component.css']
})
export class MemberListComponent implements OnInit {

  users: User[];

  constructor(private userService: UserService, private alertifyService: AlertifyService, private route: ActivatedRoute)
  {

  }

  ngOnInit() {
    this.route.data.subscribe(data => 
      {
        this.users = data['users'];
      })
  }

}

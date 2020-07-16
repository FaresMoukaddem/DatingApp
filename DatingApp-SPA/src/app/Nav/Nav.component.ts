import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-Nav',
  templateUrl: './Nav.component.html',
  styleUrls: ['./Nav.component.css']
})
export class NavComponent implements OnInit {

  model: any = {};

  constructor(private authService: AuthService, private alertify: AlertifyService) { }

  ngOnInit() 
  {

  }

  login()
  {
    console.log(this.model);

    this.authService.login(this.model).subscribe(next => 
      {
        console.log('logged in successfully');
        this.alertify.success('Logged in successfully');
      }, error => 
      {
        console.log(error);
        this.alertify.error(error);
      });
  }

  loggedIn()
  {
    const token = localStorage.getItem('token');
    return !!token;
  }

  logout()
  {
    const token = localStorage.removeItem('token');

    this.model.username = '';
    this.model.password = '';

    console.log('Logged out');
    this.alertify.message('Logged out');
  }
}
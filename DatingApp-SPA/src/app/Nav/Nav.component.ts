import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-Nav',
  templateUrl: './Nav.component.html',
  styleUrls: ['./Nav.component.css']
})
export class NavComponent implements OnInit {

  model: any = {};

  constructor(public authService: AuthService, private alertify: AlertifyService, private router: Router) { }

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
        
        this.router.navigate(['/members']);
      
      }, error =>
      {
        console.log(error);
        this.alertify.error(error);
      });
  }

  loggedIn()
  {
    return this.authService.loggedIn();
  }

  logout()
  {
    const token = localStorage.removeItem('token');

    this.model.username = '';
    this.model.password = '';

    console.log('Logged out');
    this.alertify.message('Logged out');

    this.router.navigate(['/home']);
  }
}
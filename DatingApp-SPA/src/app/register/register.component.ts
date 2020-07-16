import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { AuthService } from '../_services/auth.service';

import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  // this is how we create a variable thats going to be
  // passed from out parent component
  // @Input() valuesFromHome: any;

  @Output() cancelRegister = new EventEmitter();

  model: any = {};

  constructor(private authService: AuthService, private alertify: AlertifyService) { }

  ngOnInit() {
  }

  register()
  {
    console.log(this.model);
    this.authService.register(this.model).subscribe(next => 
      {
        console.log('Registration sucessfull');
        this.alertify.success('Registration sucessfull');
      }, error => 
      {
        console.log(error);
        this.alertify.error(error);
      });
  }

  cancel()
  {
    this.cancelRegister.emit(false);
    console.log('Canceled');
  }

}

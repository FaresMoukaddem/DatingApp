import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@Angular/forms';

import { AppComponent } from './app.component';
import { BookComponent } from './book/book.component';
import { NavComponent } from './Nav/Nav.component';

import { AuthService } from './_services/auth.service'
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';

import { ErrorInterceptorProvider } from './_services/error.interceptor';

@NgModule({
   declarations: [
      AppComponent,
      BookComponent,
      NavComponent,
      HomeComponent,
      RegisterComponent
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      FormsModule
   ],
   providers: [
      AuthService,
      ErrorInterceptorProvider
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }

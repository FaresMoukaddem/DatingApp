import { BrowserModule, HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { NgModule, Pipe } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@Angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { BookComponent } from './book/book.component';
import { NavComponent } from './Nav/Nav.component';

import { AuthService } from './_services/auth.service';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';

import { ErrorInterceptorProvider } from './_services/error.interceptor';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { BsDatepickerModule  } from 'ngx-bootstrap/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MemberListComponent } from './members/MemberList/MemberList.component';
import { MessagesComponent } from './Messages/Messages.component';
import { ListsComponent } from './Lists/Lists.component';

import { appRoutes } from './routes';

import { MemberCardComponent } from './members/member-card/member-card.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberEditComponent } from './members/member-edit/member-edit.component';

import { MemberDetailResolver } from './_resolvers/member-details.resolver';
import { MemberListResolver } from './_resolvers/member-list.resolver';
import { MemberEditResolver } from './_resolvers/member-edit.resolver';

import { JwtModule } from '@auth0/angular-jwt';

import { NgxGalleryModule } from '@kolkov/ngx-gallery';

import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';

import { PhotoEditorComponent } from './members/photo-editor/photo-editor.component';
import { FileUploadModule } from 'ng2-file-upload';

import { TimeAgoPipe } from 'time-ago-pipe';
import { ListsResolver } from './_resolvers/lists.resolver';

export function tokenGetter()
{
   return localStorage.getItem('token');
}

@Pipe({
   name: 'timeAgo',
   pure: false
})
export class TimeAgoExtendsPipe extends TimeAgoPipe {}

@NgModule({
   declarations: [
      AppComponent,
      BookComponent,
      NavComponent,
      HomeComponent,
      RegisterComponent,
      MemberListComponent,
      MessagesComponent,
      ListsComponent,
      MemberCardComponent,
      MemberDetailComponent,
      MemberEditComponent,
      TimeAgoExtendsPipe,
      PhotoEditorComponent
   ],
   imports: [
      BrowserModule,
      BrowserAnimationsModule,
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule,
      BsDropdownModule.forRoot(),
      BsDatepickerModule.forRoot(),
      TabsModule.forRoot(),
      BrowserAnimationsModule,
      RouterModule.forRoot(appRoutes),
      NgxGalleryModule,
      FileUploadModule,
      ButtonsModule.forRoot(),
      PaginationModule.forRoot(),
      JwtModule.forRoot(
         {
            config:
            {
               tokenGetter: tokenGetter,
               allowedDomains:['localhost:5000'],
               disallowedRoutes:['localhost:5000/api/auth']
            }
         })
   ],
   providers: [
      AuthService,
      ErrorInterceptorProvider,
      MemberDetailResolver,
      MemberListResolver,
      MemberEditResolver,
      ListsResolver,
      PreventUnsavedChanges
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }

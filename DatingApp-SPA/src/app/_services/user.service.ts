import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { Message } from '../_models/message';
import { PaginatedResult } from '../_models/pagination';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = environment.apiUrl;

constructor(private http: HttpClient) { }

getUsers(page?, itemsPerPage?, userParmas?, likesParam?): Observable<PaginatedResult<User[]>>
{
  const paginatedResult: PaginatedResult<User[]> = new PaginatedResult<User[]>();

  let params = new HttpParams();

  if (page != null && itemsPerPage != null)
  {
    params = params.append('pageNumber', page);
    params = params.append('pageSize', itemsPerPage);
  }

  if (userParmas != null)
  {
    params = params.append('minAge', userParmas.minAge);
    params = params.append('maxAge', userParmas.maxAge);
    params = params.append('gender', userParmas.gender);
    params = params.append('orderBy', userParmas.orderBy);
  }

  if (likesParam === 'Likers')
  {
    params = params.append('likers', 'true');
  }

  if (likesParam === 'Likees')
  {
    params = params.append('likees', 'true');
  }

  return this.http.get<User[]>(this.baseUrl + 'users', { observe: 'response', params }).pipe
  (
    map(response =>
      {
        paginatedResult.result = response.body;
        if (response.headers.get('Pagination') != null)
        {
          paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'))
        }

        return paginatedResult;
      })
  );
}

getUser(id): Observable<User>
{
  return this.http.get<User>(this.baseUrl + 'users/' + id);
}

updateUser(id: number, user: User)
{
  return this.http.put(this.baseUrl + 'users/' + id, user);
}

setMainPhoto(userId: number, id: number)
{
  return this.http.post(this.baseUrl + 'users/' + userId + '/photos/' + id + '/setMain', {});
}

deltePhoto(userId: number, id: number)
{
  return this.http.delete(this.baseUrl + 'users/' + userId + '/photos/' + id);
}

sendLike(id: number, recipientid: number)
{
  return this.http.post(this.baseUrl + 'users/' + id + '/like/' + recipientid, {});
}

getMessages(id: number, page?, itemsPerPage?, messageContainer?)
{
  const paginatedResult: PaginatedResult<Message[]> = new PaginatedResult<Message[]>();

  let params = new HttpParams();

  params = params.append('MessageContainer', messageContainer);

  if (page != null && itemsPerPage != null)
  {
    params = params.append('pageNumber', page);
    params = params.append('pageSize', itemsPerPage);
  }

  return this.http.get<Message[]>(this.baseUrl + 'users/' + id + '/messages', {observe: 'response', params})
  .pipe(
    map( response => {
      paginatedResult.result = response.body;

      if (response.headers.get('pagination') !== null)
      {
        paginatedResult.pagination = JSON.parse(response.headers.get('pagination'));
      }

      return paginatedResult;
    })
  );
}

getMessageThread(id: number, recipientid: number)
{
  return this.http.get<Message[]>(this.baseUrl + 'users/' + id + '/messages/thread/' + recipientid);
}

sendMessage(id: number, message: Message)
{
  return this.http.post(this.baseUrl + 'users/' + id + '/messages', message);
}

deleteMessage(id: number, userId: number)
{
  return this.http.post(this.baseUrl + 'users/' + userId + '/messages/' + id, {});
}

markAsRead(userId: number, messageId: number)
{
  this.http.post(this.baseUrl + 'users/' + userId + '/messages/' + messageId + '/read', {})
  .subscribe();
}

}

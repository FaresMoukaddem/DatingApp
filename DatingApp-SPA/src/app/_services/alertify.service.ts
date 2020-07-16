import { Injectable } from '@angular/core';

import * as alertifiy from 'alertifyjs';

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

constructor() { }

confirm(message: string, okCallback: () => any)
{
  alertifiy.confirm(message, (e: any) => 
  {
    if(e)
    {
      okCallback();
    }
  });
}

success(message: string)
{
  alertifiy.success(message);
}

error(message: string)
{
  alertifiy.error(message);
}

warning(message: string)
{
  alertifiy.warning(message);
}

message(message: string)
{
  alertifiy.message(message);
}

}

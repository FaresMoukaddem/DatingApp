import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor
{
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe
        (
            catchError(httpErrorResponse => 
                {
                    // First we handle the 401
                    // Since its simply text and not an HttpErrorResponse
                    if(httpErrorResponse.status === 401)
                    {
                        return throwError(httpErrorResponse.statusText);
                    }

                    // Then we handle server errors
                    // These are passed in the headers as 'Application-Error'
                    if(httpErrorResponse instanceof HttpErrorResponse)
                    {
                        const applicationError = httpErrorResponse.headers.get('Application-Error');
                        if(applicationError)
                        {
                            return throwError(applicationError);
                        }

                        // Now for modal state errors
                        const receivedError = httpErrorResponse.error;
                        let modalStateErrors = '';

                        // The modal state errors are returned as an object inside our httpErrorResponse
                        // So we check if it exits and if its and object, and then we loop through it
                        // Collecting all the keys and their messages
                        if(receivedError.errors && typeof receivedError.errors === 'object')
                        {
                            for (const key in receivedError.errors)
                            {
                                if(receivedError.errors[key])
                                {
                                    modalStateErrors += receivedError.errors[key] + '\n';
                                }
                            }
                        }
                        // If we reached here, we check if the modal error is full,
                        // That means we received the errors as an object
                        // If not, that means we probably received the error as a text, and not as an object
                        // And if neither works, we simpy return 'Unknwon error'
                        return throwError(modalStateErrors || receivedError || 'Unknown error');
                    }
                })
        )
    }

}


// Here we register a new interceptor provider
// To the httpInterceptor array of providers that angular already has.
export const ErrorInterceptorProvider =
{
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true
};
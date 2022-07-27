import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { UtilitiesService } from './utilities.service';

import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { ApisService } from './apis.service';
@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor{

  constructor(private auth:ApisService,private utils:UtilitiesService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let token=sessionStorage.getItem('authToken')? 'Bearer '+sessionStorage.getItem('authToken'):'';
  
    return next.handle(req.clone({setHeaders:{'authorization':token}})).pipe(
      retry(1),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 || error.status === 406) {
          // refresh token
          this.utils.logout()
        } 
        
        {
          return throwError(error);
        }
      })
    );    
  }
}
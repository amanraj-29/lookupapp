import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { UtilitiesService } from './utilities.service';

import { Observable, throwError } from 'rxjs';
import { retry, catchError, map, tap } from 'rxjs/operators';
import { ApisService } from './apis.service';
import { LoaderService } from './loader.service';
@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor{

  constructor(private auth:ApisService,private loaderService:LoaderService,private utils:UtilitiesService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let token=sessionStorage.getItem('auth_token')? 'Bearer '+sessionStorage.getItem('auth_token'):'';

  this.loaderService.showLoader(); 
    return next.handle(req.clone({setHeaders:{'authorization':token}})).pipe(
      retry(1),
      tap(evt => {
        if (evt instanceof HttpResponse) {
            // if(evt.body && evt.body.success)
                this.loaderService.hideLoader();
        }
    }),
      catchError((error: HttpErrorResponse) => {
  this.loaderService.hideLoader();

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
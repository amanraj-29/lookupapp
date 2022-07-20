import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApisService {
baseUrl:String='localhost:4000/';
  constructor(private http:HttpClient) {
    this.baseUrl=environment.BASE_URL;
   }
  login(data: any): Observable<any> {
    console.log(data);
    return this.http.post(`${this.baseUrl}login`, data);
  }

  setDataInLocalStorage(variableName: any, data: any) {
    sessionStorage.setItem(variableName, data);
  }

  datasearch(data: any): Observable<any> {
    console.log('data check');
    return this.http.post(`${this.baseUrl}accountinfo`, data);
  }


  deviceandrateplan(data: any): Observable<any> {
    console.log(' deviceandrateplan');
    return this.http.post(`${this.baseUrl}getstatus`, data);
  }



  revokeToken(){
    return this.http.get(`${this.baseUrl}revokeToken`);
  }  
}

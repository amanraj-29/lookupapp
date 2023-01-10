import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApisService } from './apis.service';

export interface deviceRatesState{
    Billing_Account_Name: string;
    phone_number: number;
    Effective_Date: string;
    Action_Needed: string;
    device ?: string;
}

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {
  masterArray!: Array<any>;
  timeInterVar: any;
  constructor(private apiService: ApisService, private router: Router) { }
  /**This method is used to revoke the jwt token for every specified minutes */

  billingSubject:BehaviorSubject<any>= new BehaviorSubject(null);
  billingObservable$:Observable<any>=this.billingSubject.asObservable();
  dispatchBillingData(data:any){
    console.log("Billing data ===",data)
    this.billingSubject.next(data);
    console.log("billingSubject ===",this.billingSubject)
  }

  deviceRatesSubject:BehaviorSubject<any>= new BehaviorSubject(null);
  deviceRatesObservable$:Observable<any>=this.deviceRatesSubject.asObservable();
  dispatchDeviceRates(data:any){
    console.log("device rates data ===",data)
    this.deviceRatesSubject.next(data);
    console.log("deviceRatesSubject ===",this.deviceRatesSubject)
  }

  recommendedPlansSubject:BehaviorSubject<any>= new BehaviorSubject(null);
  recommendedPlansObservable$:Observable<any>=this.recommendedPlansSubject.asObservable();
  dispatchRecommendedPlans(data:any){
    console.log("recommended data ===",data)
    this.recommendedPlansSubject.next(data);
    console.log("recommendedPlansSubject ===",this.recommendedPlansSubject)
  }

  setData(data: any[]){
    this.masterArray=data
    console.log("line 47",this.masterArray)
  }


  getData(){
    return this.masterArray
  }

  clearSearch()
{
  this.recommendedPlansSubject.next('');
  this.deviceRatesSubject.next('');
  this.billingSubject.next('');
}



  jwtTimeInterval() {
    this.apiService.revokeToken().subscribe((res: any) => {
      console.log('new token is:', res);
      sessionStorage.setItem('authToken', res.token);
    })
  }
  clearStorage() {
    sessionStorage.clear();
    localStorage.clear();
  }
  setSessionStorage(key: string, value: string) {
    window.sessionStorage.setItem(key, value);
  }
  getSessionStorage(key: string): string | null {
    return window.sessionStorage.getItem(key);
  }

  callTimeInterval() {
    console.log('calltimeinterval');
    this.timeInterVar = setInterval(() => {
      this.jwtTimeInterval();
    }, environment.SESSION_EXPIRY_TIME * 60 * 1000)
  }
  logout() {
    this.clearSearch();
    this.clearStorage();
    //console.log('timeinterval is:', this.timeInterVar);
    if (this.timeInterVar) {
      clearInterval(this.timeInterVar);
      this.timeInterVar = null;
    }
    this.router.navigate(['login']);
  }
}

@Injectable({ providedIn: 'root' })
export class DeviceDetailsResolver implements Resolve<any> {
  constructor(private service: ApisService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.service.deviceDetails(route.paramMap.get('id'));
  }
}
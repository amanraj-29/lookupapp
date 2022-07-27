import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ApisService } from '../shared/services/apis.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilitiesService } from '../shared/services/utilities.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  searchednumber: any;
  email: any;
  formGroup!: FormGroup;
  search: any;
  masterArray!: Array<any>;

  constructor(
    private router: Router,
    private actRoute: ActivatedRoute,
    private apiService: ApisService,
    private http: HttpClient,
    private util: UtilitiesService
  ) {
    this.email = sessionStorage.getItem('userData');
    this.searchednumber = sessionStorage.getItem('searchedNumber');
    if (this.searchednumber) {
      this.searchdeviceandrateplan();
    }
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.formGroup = new FormGroup({
      search: new FormControl(this.searchednumber, [
        Validators.minLength(4),
        Validators.maxLength(15),
      ]),
      page: new FormControl(1),
    });
  }
  Space(e: any) {
    var maxLength = 15;
    if (
      e.target.value.length >= maxLength &&
      ((e.keyCode >= 48 && e.keyCode <= 57) ||
        (e.keyCode >= 96 && e.keyCode <= 105))
    ) {
      e.preventDefault();
    }
  }
  searchDetailAndRatePlan() {
    this.searchdeviceandrateplan();
    this.searchnum();
  }

  searchdeviceandrateplan() {
    let num =
      this.formGroup && this.formGroup.value
        ? this.formGroup.value
        : { search: this.searchednumber };
    this.apiService.deviceandrateplan(num).subscribe((result) => {
      console.log(result);
      this.masterArray = result.result;
      console.log('masterArray parent', this.masterArray);
      this.util.setData(this.masterArray);
      // this.apiService.setDataInLocalStorage('DeviceAndRatePlanData', result);
      //this.router.navigate(['../dashboard'],{relativeTo:this.actRoute});
    });
  }

  searchnum() {
    if (this.formGroup.valid) {
      this.apiService.datasearch(this.formGroup.value).subscribe((result) => {
        console.log("inside dashboard search",result);
        this.apiService.setDataInLocalStorage('Billing_Account_Name',result.result[0].Billing_Account_Name);
this.apiService.setDataInLocalStorage('curr_srv_accs_nbr',result.result[0].curr_srv_accs_nbr);
this.apiService.setDataInLocalStorage('Libility_Type',result.result[0].Libility_Type);
this.apiService.setDataInLocalStorage('Billing_Address_1',result.result[0].Billing_Address_1);
this.apiService.setDataInLocalStorage('Billing_Address_2',result.result[0].Billing_Address_2);
this.apiService.setDataInLocalStorage('City',result.result[0].City);
this.apiService.setDataInLocalStorage('Effective_Date',result.result[0].Effective_Date);
this.apiService.setDataInLocalStorage('Service_ID',result.result[0].Service_ID);
this.apiService.setDataInLocalStorage('Account_Type',result.result[0].Account_Type);
this.apiService.setDataInLocalStorage('Account_Email',result.result[0].Account_Email);
this.apiService.setDataInLocalStorage('Account_start_date',result.result[0].Account_start_date);
this.apiService.setDataInLocalStorage('Billing_Cycle',result.result[0].Billing_Cycle);
this.apiService.setDataInLocalStorage('Billing_Close_Date',result.result[0].Billing_Close_Date);
        
       // this.router.navigate(['../dashboard'], { relativeTo: this.actRoute });
      });
    }
  }
}

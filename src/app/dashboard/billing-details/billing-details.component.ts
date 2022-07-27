import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-billing-details',
  templateUrl: './billing-details.component.html',
  styleUrls: ['./billing-details.component.scss']
})
export class BillingDetailsComponent implements OnInit {
  Billing_Account_Name: any;
  curr_srv_accs_nbr: any;
  Libility_Type: any;
  Billing_Address_1: any;
  Billing_Address_2: any;
  City: any;
  Effective_Date: any;
  Service_ID: any;
  Account_Type: any;
  Account_Email: any;
  Account_start_date: any;
  Billing_Cycle: any;
  Billing_Close_Date: any;
  constructor() {
    this.Billing_Account_Name=sessionStorage.getItem('Billing_Account_Name')
this.curr_srv_accs_nbr=sessionStorage.getItem('curr_srv_accs_nbr')
this.Libility_Type=sessionStorage.getItem('Libility_Type')
this.Billing_Address_1=sessionStorage.getItem('Billing_Address_1')
this.Billing_Address_2=sessionStorage.getItem('Billing_Address_2')
this.City=sessionStorage.getItem('City')
this.Effective_Date=sessionStorage.getItem('Effective_Date')
this.Service_ID=sessionStorage.getItem('Service_ID')
this.Account_Type=sessionStorage.getItem('Account_Type')
this.Account_Email=sessionStorage.getItem('Account_Email')
this.Account_start_date=sessionStorage.getItem('Account_start_date')
this.Billing_Cycle=sessionStorage.getItem('Billing_Cycle')
this.Billing_Close_Date=sessionStorage.getItem('Billing_Close_Date')
   }

  ngOnInit(): void {
  }

  ngDoCheck(){
    this.Billing_Account_Name=sessionStorage.getItem('Billing_Account_Name')
this.curr_srv_accs_nbr=sessionStorage.getItem('curr_srv_accs_nbr')
this.Libility_Type=sessionStorage.getItem('Libility_Type')
this.Billing_Address_1=sessionStorage.getItem('Billing_Address_1')
this.Billing_Address_2=sessionStorage.getItem('Billing_Address_2')
this.City=sessionStorage.getItem('City')
this.Effective_Date=sessionStorage.getItem('Effective_Date')
this.Service_ID=sessionStorage.getItem('Service_ID')
this.Account_Type=sessionStorage.getItem('Account_Type')
this.Account_Email=sessionStorage.getItem('Account_Email')
this.Account_start_date=sessionStorage.getItem('Account_start_date')
this.Billing_Cycle=sessionStorage.getItem('Billing_Cycle')
this.Billing_Close_Date=sessionStorage.getItem('Billing_Close_Date')
  }

}

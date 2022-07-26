import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { UtilitiesService,deviceRatesState } from 'src/app/shared/services/utilities.service';



const ELEMENT_DATA: any[] = [
//   {"sno":1,"dvc_make":"Samsung","dvc_model":"SM-A125U",
//  "dvc_category":"SMART_PHONE - Basic","Authorized_Users":"GAL A12",
//  "Effective_Date":"2021-12-16","phone_number":9394600573,
//  "Billing_Account_Name":"LEONARDO CINTRON ASENCIO",
//  "Billing_Address_1":"SIERRA BAYAMON CALLE 21  BLQ18 20",
//  "Billing_Address_2":"","City":"BAYAMON","Service_ID":"Liberty Regular",
//  "Account_Type":"I","Account_Email":"LENNYCINTRON@ICLOUD.COM",
//  "Billing_Cycle":17,"Billing_Close_Date":17,"dp_prd_cd":"LPMHGH5",
//  "pp_prd_cd":"SDDVRP","Migratable_by_rate_plan":"Migratable",
//  "Migratable_By_Device":"Migratable","Action_Needed":"Complete Migratable"},
//  {"sno":16145,"dvc_make":"Samsung","dvc_model":"SM-A125U","dvc_category":"SMART_PHONE - Basic","Authorized_Users":"GAL A12","Effective_Date":"2021-12-16","phone_number":9394589265,"Billing_Account_Name":"LEONARDO CINTRON ASENCIO","Billing_Address_1":"SIERRA BAYAMON CALLE 21  BLQ18 20","Billing_Address_2":"","City":"BAYAMON","Service_ID":"Liberty Regular","Account_Type":"I","Account_Email":"LENNYCINTRON@ICLOUD.COM","Billing_Cycle":17,"Billing_Close_Date":17,"dp_prd_cd":"LPMHGH5","pp_prd_cd":"SDDVRP","Migratable_by_rate_plan":"Migratable","Migratable_By_Device":"Migratable","Action_Needed":"Complete Migratable"},{"sno":20969,"dvc_make":"Samsung","dvc_model":"SM-A125U","dvc_category":"SMART_PHONE - Basic","Authorized_Users":"GAL A12","Effective_Date":"2021-12-16","phone_number":9394992579,"Billing_Account_Name":"LEONARDO CINTRON ASENCIO","Billing_Address_1":"SIERRA BAYAMON CALLE 21  BLQ18 20","Billing_Address_2":"","City":"BAYAMON","Service_ID":"Liberty Regular","Account_Type":"I","Account_Email":"LENNYCINTRON@ICLOUD.COM","Billing_Cycle":17,"Billing_Close_Date":17,"dp_prd_cd":"LPMHGH5","pp_prd_cd":"SDDVRP","Migratable_by_rate_plan":"Migratable","Migratable_By_Device":"Migratable","Action_Needed":"Complete Migratable"}
  
];

@Component({
  selector: 'app-devices-rates-list',
  templateUrl: './devices-rates-list.component.html',
  styleUrls: ['./devices-rates-list.component.scss']
})
export class DevicesRatesListComponent implements OnInit {

  displayedColumns: string[] = ['Billing_Account_Name', 'phone_number', 'Effective_Date', 'Action_Needed', 'device', 'button'];
  dataSource = new MatTableDataSource<deviceRatesState>(ELEMENT_DATA);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  
  displayStyle = "none";
  displayStyle1 = "block";

  constructor(private util : UtilitiesService) { }

  @Input() masterArray! : any[];

  ngDoCheck(): void{
    this.masterArray=this.util.getData()
    console.log("parent to child obtained data is ", this.masterArray)
  
  this.dataSource = new MatTableDataSource<deviceRatesState>(this.masterArray);
}
 

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
  
    
  }

  nextscreen(){
this.displayStyle = "block"
this.displayStyle1 = "none"
  }
  back(){
    this.displayStyle = "none"
    this.displayStyle1 = "block"
      }
}

 
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilitiesService, deviceRatesState } from 'src/app/shared/services/utilities.service';



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

  isLoaded = false;
  length!: number;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
migratableBy:Array<string>=[];
  constructor(private util: UtilitiesService, private router: Router, private actRoute: ActivatedRoute) {
    this.util.deviceRatesObservable$.subscribe(val => {
      console.log('  deviceRatesObservable$ :', val);
      this.isLoaded = true;

      if (val?.length > 0) {
        this.migratableBy = [];
        //Complete Migratable //Non-Migratable by SIM Status //Non Migratable by Rate Plan //Non Migratable by Device //NMG By Both Device and Rate Plan
        val?.sort((a:any, b:any) => (a.Action_Needed > b.Action_Needed? -1 : 1))
        this.dataSource = new MatTableDataSource<deviceRatesState>(val);
        this.dataSource.paginator = this.paginator;
        this.length = val.length
       
        val.map((inrVal:any)=>{
          if(inrVal?.Migratable_by_rate_plan
            ==="Non-Migratable" || inrVal?.Migratable_by_rate_plan===null){
            this.migratableBy.push('Rate')
          }
          if(inrVal?.Migratable_By_Device
                ==="Non-Migratable" || inrVal?.Migratable_By_Device===null){
            this.migratableBy.push('Device')
          }
         
          if(inrVal?.SIM_Gen_Status==="Non-Migratable" || inrVal?.SIM_Gen_Status===null){
            this.migratableBy.push('Sim')
          }
          
        })
        //console.log("Inside array",this.migratableBy)
      }else{
        this.dataSource = new MatTableDataSource<deviceRatesState>([]);
        this.dataSource.paginator = this.paginator;
        this.length = 0;
      }
    })
  }

  ngOnInit(): void {
  }

  nextscreen(item: any) {
    this.router.navigate([`../details/${item.sno}`], {
      relativeTo: this.actRoute
    });
  }
}


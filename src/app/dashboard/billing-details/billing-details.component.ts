import { Component, Input, ViewChild, OnInit } from '@angular/core';
// import { UtilitiesService } from 'src/app/shared/services/utilities.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilitiesService, deviceRatesState } from 'src/app/shared/services/utilities.service';

const ELEMENT_DATA: any[] = []

@Component({
  selector: 'app-billing-details',
  templateUrl: './billing-details.component.html',
  styleUrls: ['./billing-details.component.scss']
})
export class BillingDetailsComponent implements OnInit {
  length!: any;
  billingInfo:any={};
  migratableBy:Array<string>=[];
  isLoaded = false;
  dataSource = new MatTableDataSource<deviceRatesState>(ELEMENT_DATA);
  paginator!: MatPaginator;
  DevicebuttonClass: any;
  DevicebuttonMessage: any;

  SimGenbuttonClass: any;
  SimGenbuttonMessage: any;

  RatePlanbuttonClass: any;
  RatePlanbuttonMessage: any;



  constructor(private utils:UtilitiesService) {

    this.utils.billingObservable$.subscribe(deviceData=>{
      if(deviceData){
      this.billingInfo={...this.billingInfo,...deviceData};
      console.log('billing info:',this.billingInfo);
      }else{
        this.billingInfo=undefined;
      }
      

    });


    this.utils.deviceRatesObservable$.subscribe(val => {
      //console.log('  deviceRatesObservable$ :', val);
      if (val?.length > 0) {
        this.migratableBy = [];
        if( this.billingInfo){
          this.billingInfo.Action_Needed= (val.filter((obj:any)=>
             (obj.Action_Needed)!=="complete migratable"
           ).length>0)?'Non Migratable':'Migratable';
   // //console.log('billing info obj:',this.billingInfo)
         }
     
        this.length = val.length
       
       
   

      }
    })
   }

  ngOnInit(): void {
  }

  ngDoCheck(): void{
  }


}

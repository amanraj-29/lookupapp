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



  constructor(private utils:UtilitiesService) {

    this.utils.billingObservable$.subscribe(deviceData=>{
      if(deviceData){
      this.billingInfo={...this.billingInfo,...deviceData};
      // console.log('billing info:',this.billingInfo);
      }
      

    });
    this.utils.deviceRatesObservable$.subscribe(val => {
      // console.log('  deviceRatesObservable$ :', val);
      if (val?.length > 0) {
        this.length = val.length;
        if( this.billingInfo){
       this.billingInfo.Action_Needed= (val.filter((obj:any)=>
          (obj.Action_Needed).toLowerCase()!=="complete migratable"
        ).length>0)?'Non Migratable':'Migratable';
// console.log('billing info obj:',this.billingInfo)
      }
    }
    })


    this.utils.deviceRatesObservable$.subscribe(val => {
      console.log('  deviceRatesObservable$ :', val);
      if (val?.length > 0) {
        this.migratableBy = [];
        this.isLoaded = true;
        this.dataSource = new MatTableDataSource<deviceRatesState>(val);
        this.dataSource.paginator = this.paginator;
        this.length = val.length
       
        val.map((inrVal:any)=>{
          if(inrVal?.Migratable_By_Device
                ==="Migratable"){
            this.migratableBy.push('Device')
          }
          if(inrVal?.Migratable_by_rate_plan
            ==="Migratable"){
            this.migratableBy.push('Rate')
          }
          if(inrVal?.SIM_Gen_Status==="Migratable"){
            this.migratableBy.push('Sim')
          }
          
        })

      }
    })
   }

  ngOnInit(): void {
  }

  ngDoCheck(): void{
  }


}

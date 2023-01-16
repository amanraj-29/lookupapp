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
        this.isLoaded = true;
        this.dataSource = new MatTableDataSource<deviceRatesState>(val);
        this.dataSource.paginator = this.paginator;
        this.length = val.length
       
        val.map((inrVal: any) => {
          if (
            inrVal?.Migratable_By_Device_Config === 'Non-Migratable' ||
            inrVal?.Migratable_by_Device_Config === null
          ) {
            this.migratableBy.push('Device_Config');
          }

          if (inrVal?.Migratable_by_rate_plan === 'Non-Migratable') {
            this.migratableBy.push('Rate');
          }
          if (inrVal?.Migratable_By_Device === 'Non-Migratable') {
            this.migratableBy.push('Device');
          }

          if (inrVal?.SIM_Gen_Status === 'Non-Migratable') {
            this.migratableBy.push('Sim');
          }

          if (inrVal?.Migratable_by_rate_plan === 'Possible_Action_Required') {
            this.migratableBy.push('Rate_mgar');
          }
          if (
            inrVal?.Migratable_By_Device === 'Possible_Action_Required'
          ) {
            this.migratableBy.push('Device_mgar');
          }

          if (inrVal?.SIM_Gen_Status === 'Possible_Action_Required') {
            this.migratableBy.push('Sim_mgar');
          }
        });
        //console.log('Inside array of this', this.migratableBy);
        var uniqueMigratableBy = this.migratableBy.filter(
          (v, i, a) => a.indexOf(v) === i
        );
        console.log('Inside array of filter billing line 98', uniqueMigratableBy);

      //  var res = uniqueMigratableBy.filter((item: string | string[]) => !item.includes("mgar"));
////console.log("hui hui hui",res)


if (uniqueMigratableBy.includes('Device')) {
          this.DevicebuttonClass='nmg';
          this.DevicebuttonMessage='Action Required';
          uniqueMigratableBy = uniqueMigratableBy.filter(
            (e) => e !== 'Device_mgar'
          );
          //console.log("line 116",uniqueMigratableBy)
        
        }
        if (uniqueMigratableBy.includes('Device_mgar')) {
          this.DevicebuttonClass='mgar';
          this.DevicebuttonMessage='Possible Action Required';
          //console.log("line 122",uniqueMigratableBy)
       
        
        }
        if (!uniqueMigratableBy.includes('Device_mgar') && !uniqueMigratableBy.includes('Device')) {
          this.DevicebuttonClass='mg';
          this.DevicebuttonMessage='Ready';
          //console.log("line 129",uniqueMigratableBy)
        }

        if (uniqueMigratableBy.includes('Sim')) {
          this.SimGenbuttonClass = 'nmg';
          this.SimGenbuttonMessage = 'Action Required';
          uniqueMigratableBy = uniqueMigratableBy.filter(
            (e) => e !== 'Sim_mgar'
          );
        }
        if (uniqueMigratableBy.includes('Sim_mgar')) {
          this.SimGenbuttonClass = 'mgar';
          this.SimGenbuttonMessage = 'Possible Action Required';
          
        }
        if (
          !uniqueMigratableBy.includes('Sim_mgar') &&
          !uniqueMigratableBy.includes('Sim')
        ) {
          this.SimGenbuttonClass = 'mg';
          this.SimGenbuttonMessage = 'Ready';
        }


        if (uniqueMigratableBy.includes('Rate')) {
          this.RatePlanbuttonClass='nmg'
          this.RatePlanbuttonMessage='Action Required'
          uniqueMigratableBy = uniqueMigratableBy.filter(
            (e) => e !== 'Rate_mgar'
          );
        }
        if (uniqueMigratableBy.includes('Rate_mgar')) {
          this.RatePlanbuttonClass='mgar'
          this.RatePlanbuttonMessage='Possible Action Required'
          
        }
        if (!uniqueMigratableBy.includes('Rate_mgar') && !uniqueMigratableBy.includes('Rate')) {
          this.RatePlanbuttonClass='mg'
          this.RatePlanbuttonMessage='Ready'
        
        }

      }
    })
   }

  ngOnInit(): void {
  }

  ngDoCheck(): void{
  }


}

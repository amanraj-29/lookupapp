import { Component, OnInit, Input, ViewChild } from '@angular/core';
// import { UtilitiesService } from 'src/app/shared/services/utilities.service';
import { ApisService } from '../../shared/services/apis.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilitiesService, deviceRatesState } from 'src/app/shared/services/utilities.service';


const ELEMENT_DATA: any[] = []


@Component({
  selector: 'app-recommended-plans',
  templateUrl: './recommended-plans.component.html',
  styleUrls: ['./recommended-plans.component.scss']
})
export class RecommendedPlansComponent implements OnInit {
 accountData: any=[];
 billingInfo:any;
 isLoaded = false;
 length!: number;
 @ViewChild(MatPaginator)
 paginator!: MatPaginator;
 migratableBy:Array<string>=[];

 dataSource = new MatTableDataSource<deviceRatesState>(ELEMENT_DATA);


  constructor(
    private apiService: ApisService,private utils:UtilitiesService
  ) { 

    this.utils.billingObservable$.subscribe(deviceData=>{
      if(deviceData){
      this.billingInfo={...this.billingInfo,...deviceData};
      // console.log('billing info:',this.billingInfo);
      }else{
        this.billingInfo=undefined;
      }
    });

    this.utils.recommendedPlansObservable$.subscribe(plans=>{
      if(plans){
      this.accountData=plans;
      // console.log('billing info:',this.billingInfo);
      }else{
        this.accountData=undefined;
      }
    });

    this.utils.deviceRatesObservable$.subscribe(val => {
      console.log('  deviceRatesObservable$ :', val);
      if (val?.length > 0) {
        this.migratableBy = [];
        this.isLoaded = true;
        this.dataSource = new MatTableDataSource<deviceRatesState>(val);
        this.dataSource.paginator = this.paginator;
        this.length = val.length
       
        val.map((inrVal:any)=>{
          if(inrVal?.Migratable_By_Device_Config
            ==="Non-Migratable" || inrVal?.Migratable_by_Device_Config===null){
            this.migratableBy.push('Device_Config')
          }

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

      }
    })
    // this.apiService.retriveDeviceRecommendedPlan({account_no:sessionStorage.getItem('searchedNumber')}).subscribe((result) => {
    //   if(result){
    //     this.accountData = result.result
    //   }
      
    //   console.log('result==>',this.accountData)
    // });
  }

  ngOnInit(): void {
  }

}

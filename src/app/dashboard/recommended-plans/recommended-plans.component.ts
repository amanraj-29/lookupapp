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

 DevicebuttonClass: any;
 DevicebuttonMessage: any;

 SimGenbuttonClass: any;
 SimGenbuttonMessage: any;

 RatePlanbuttonClass: any;
 RatePlanbuttonMessage: any;


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

   
  
  }

  ngOnInit(): void {
  }

  ngDoCheck(): void{
  }

}

import { Component, OnInit } from '@angular/core';
import { UtilitiesService } from 'src/app/shared/services/utilities.service';
import { ApisService } from '../../shared/services/apis.service';

@Component({
  selector: 'app-recommended-plans',
  templateUrl: './recommended-plans.component.html',
  styleUrls: ['./recommended-plans.component.scss']
})
export class RecommendedPlansComponent implements OnInit {
 accountData: any=[];
 billingInfo:any;
  constructor(
    private apiService: ApisService,private utils:UtilitiesService
  ) { 

    this.utils.billingObservable$.subscribe(deviceData=>{
      if(deviceData){
      this.billingInfo={...this.billingInfo,...deviceData};
      // console.log('billing info:',this.billingInfo);
      }
    });

    this.utils.recommendedPlansObservable$.subscribe(plans=>{
      if(plans){
      this.accountData=plans;
      // console.log('billing info:',this.billingInfo);
      }
    });
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

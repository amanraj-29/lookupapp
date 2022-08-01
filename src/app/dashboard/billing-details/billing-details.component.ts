import { Component, OnInit } from '@angular/core';
import { UtilitiesService } from 'src/app/shared/services/utilities.service';

@Component({
  selector: 'app-billing-details',
  templateUrl: './billing-details.component.html',
  styleUrls: ['./billing-details.component.scss']
})
export class BillingDetailsComponent implements OnInit {
  length!: any;
  billingInfo:any={};

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
   }

  ngOnInit(): void {
  }

  ngDoCheck(): void{
  }


}

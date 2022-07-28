import { Component, OnInit } from '@angular/core';
import { UtilitiesService } from 'src/app/shared/services/utilities.service';

@Component({
  selector: 'app-billing-details',
  templateUrl: './billing-details.component.html',
  styleUrls: ['./billing-details.component.scss']
})
export class BillingDetailsComponent implements OnInit {

  billingInfo:any={};

  constructor(private utils:UtilitiesService) {

    this.utils.billingObservable$.subscribe(deviceData=>{
      this.billingInfo=deviceData;
      // console.log('billing info:',this.billingInfo);

    });
   }

  ngOnInit(): void {
  }


}

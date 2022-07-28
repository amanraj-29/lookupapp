import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApisService } from 'src/app/shared/services/apis.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-device-rate-details',
  templateUrl: './device-rate-details.component.html',
  styleUrls: ['./device-rate-details.component.scss']
})
export class DeviceRateDetailsComponent implements OnInit {

  deviceDetails:any={};
  constructor(private router:Router,private location:Location,private actRoute:ActivatedRoute,private apiService:ApisService) {
    let id=this.actRoute.snapshot.paramMap.get('id');
    console.log('id is:',id);
    this.apiService.deviceDetails(id).subscribe(val=>{
this.deviceDetails=val.result[0];
    })
   }
   goBack(){
     this.location.back();
   }
  ngOnInit(): void {
  }

}

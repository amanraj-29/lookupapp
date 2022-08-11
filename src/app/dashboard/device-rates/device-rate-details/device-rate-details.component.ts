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
  // ngDoCheck(){
  //   var devicestatus = document.getElementById("device");
  //   var simstatus = document.getElementById("sim");
  //   var ratestatus = document.getElementById("rate");
    
  //   var devicealertstatus = document.getElementById("devStatus");
  //   var simalertstatus = document.getElementById("simStatus");
  //   var ratealertstatus = document.getElementById("rateStatus");

  //   if (devicestatus?.textContent === "Migratable"){
  //     devicealertstatus?.classList.add("mg");
  //     }
  //   if (devicestatus?.textContent === "Non-Migratable"){
  //     devicealertstatus?.classList.remove("mg");
  //     devicealertstatus?.classList.add("nmg");
  //     }
  //   if (simstatus?.textContent === "Migratable"){
  //     simalertstatus?.classList.add("mg");
  //     }
  //   if (simstatus?.textContent === "Non-Migratable"){
  //     simalertstatus?.classList.remove("mg");
  //     simalertstatus?.classList.add("nmg");
      
  //     }
  //   if (ratestatus?.textContent === "Migratable"){
  //     ratealertstatus?.classList.add("mg");
  //     }
  //   if (ratestatus?.textContent === "Non-Migratable"){
  //     ratealertstatus?.classList.remove("mg");
  //     ratealertstatus?.classList.add("nmg");
      
  //     }
  // }

}

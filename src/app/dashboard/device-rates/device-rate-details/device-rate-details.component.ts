import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApisService } from 'src/app/shared/services/apis.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-device-rate-details',
  templateUrl: './device-rate-details.component.html',
  styleUrls: ['./device-rate-details.component.scss'],
})
export class DeviceRateDetailsComponent implements OnInit {
  deviceDetails: any = {};
  nonMigratableBy: Array<string> = [];

  DevicebuttonClass: any;
  DevicebuttonMessage: any;

  SimGenbuttonClass: any;
  SimGenbuttonMessage: any;

  RatePlanbuttonClass: any;
  RatePlanbuttonMessage: any;


  DeviceConfigbuttonClass:any;
  DeviceConfigbuttonMessage:any;

  constructor(
    private router: Router,
    private location: Location,
    private actRoute: ActivatedRoute,
    private apiService: ApisService
  ) {
    //     let id=this.actRoute.snapshot.paramMap.get('id');
    //     //console.log('id is:',id);
    //     this.apiService.deviceDetails(id).subscribe(val=>{
    // this.deviceDetails=val.result[0];
    //     })
    this.actRoute.data.subscribe((deviceDet) => {
      console.log('details are line36:', deviceDet);
      this.deviceDetails = deviceDet['deviceDetails']['result'][0];
  

      if (this.deviceDetails?.Migratable_By_Device_status_code == 0) {
        this.DevicebuttonClass = 'nmg';
        this.DevicebuttonMessage = 'Action Required';
      }
      if (this.deviceDetails?.Migratable_By_Device_status_code == 1) {
        this.DevicebuttonClass = 'mg';
        this.DevicebuttonMessage = 'Ready';
      }
      if (this.deviceDetails?.Migratable_By_Device_status_code == 2) {
        this.DevicebuttonClass = 'mg';
        this.DevicebuttonMessage = 'Ready';
      }
      if (this.deviceDetails?.Migratable_By_Device_status_code == 4) {
        this.DevicebuttonClass = 'mg';
        this.DevicebuttonMessage = 'Ready';
      }
      if (!this.deviceDetails?.Migratable_By_Device_status_code) {
        this.DevicebuttonClass = 'mgar';
        this.DevicebuttonMessage = 'Possible Action Required';
      }



      if (this.deviceDetails?.lock_sts == 'RSU') {
        this.DeviceConfigbuttonClass = 'nmg';
        this.DeviceConfigbuttonMessage = 'RSU';
      }
      if (this.deviceDetails?.lock_sts == 'Physical') {
        this.DeviceConfigbuttonClass  = 'nmg';
        this.DeviceConfigbuttonMessage = 'Action Required';
      }
      if (this.deviceDetails?.lock_sts=='Dual lock - AT&T' || this.deviceDetails?.lock_sts=='Dual lock - AT&T - Lab' || this.deviceDetails?.lock_sts=='Dual lock - Lab' ) {
        this.DeviceConfigbuttonClass  = 'mg';
        this.DeviceConfigbuttonMessage = this.deviceDetails?.lock_sts;
      }
      if (this.deviceDetails?.lock_sts=='IMEC - Lab' || this.deviceDetails?.lock_sts=='IMEC - AT&T') {
        this.DeviceConfigbuttonClass  = 'nmg';
        this.DeviceConfigbuttonMessage = this.deviceDetails?.lock_sts;
      }

      if (this.deviceDetails?.lock_sts == 'OTA') {
        this.DeviceConfigbuttonClass  = 'mg';
        this.DeviceConfigbuttonMessage = 'Ready';
      }
      if (this.deviceDetails?.lock_sts == 'Unlocked') {
        this.DeviceConfigbuttonClass  = 'mg';
        this.DeviceConfigbuttonMessage = 'Unlocked';
      }
      if (this.deviceDetails?.lock_sts == 'Unconfirmed') {
        this.DeviceConfigbuttonClass  = 'mgar';
        this.DeviceConfigbuttonMessage= 'Unconfirmed';
      }

      
      


      if (this.deviceDetails?.SIM_Gen_Status == "Migratable") {
        this.SimGenbuttonClass = 'mg';
        this.SimGenbuttonMessage = 'Ready';
      }
      if (this.deviceDetails?.SIM_Gen_Status == "Possible_Action_Required") {
        this.SimGenbuttonClass = 'mgar';
        this.SimGenbuttonMessage = 'Possible Action Required';
      }
      if (this.deviceDetails?.SIM_Gen_Status == "Non-Migratable") {
        this.SimGenbuttonClass = 'nmg';
        this.SimGenbuttonMessage = 'Action Required';
      }

      if (this.deviceDetails?.Migratable_by_rate_plan == "Migratable") {
        this.RatePlanbuttonClass = 'mg';
        this.RatePlanbuttonMessage = 'Ready';
      }
      if (this.deviceDetails?.Migratable_by_rate_plan == "Possible_Action_Required") {
        this.RatePlanbuttonClass = 'mgar';
        this.RatePlanbuttonMessage= 'Possible Action Required';
      }
      if (this.deviceDetails?.Migratable_by_rate_plan == "Non-Migratable") {
        this.RatePlanbuttonClass = 'nmg';
        this.RatePlanbuttonMessage = 'Action Required';
      }



    });
  }
  goBack() {
    this.router.navigate(['../dashboard'])
  }
  ngOnInit(): void {}
}

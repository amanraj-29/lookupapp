import { Component, OnInit, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import {
  UtilitiesService,
  deviceRatesState,
} from 'src/app/shared/services/utilities.service';

const ELEMENT_DATA: any[] = [];

@Component({
  selector: 'app-overall-alerts',
  templateUrl: './overall-alerts.component.html',
  styleUrls: ['./overall-alerts.component.scss']
})
export class OverallAlertsComponent implements OnInit {



  DevicebuttonClass: any;
  DevicebuttonMessage: any;

  SimGenbuttonClass: any;
  SimGenbuttonMessage: any;

  RatePlanbuttonClass: any;
  RatePlanbuttonMessage: any;

  DeviceConfigbuttonClass: any;
  DeviceConfigbuttonMessage:any;


  filteredDataByNumber:any;
  HidePhoneNumberTable: any='show';


  migratableBy: Array<string> = [];

 
  

  constructor(
    private util: UtilitiesService
    
  ) {
  
    this.util.deviceRatesObservable$.subscribe((val) => {
      // //console.log('  deviceRatesObservable$ :', val);

      if (val?.length > 0) {
       
     

   

     
     
      val.map((inrVal: any) => {
      //  console.log("inr value",inrVal);

          if (
            inrVal?.lock_sts
            === 'RSU' || inrVal?.lock_sts
            === 'Physical' || inrVal?.lock_sts
            === 'IMEC - Lab'  || inrVal?.lock_sts
            === 'IMEC - AT&T' || inrVal?.lock_sts=='IMEC' || inrVal?.lock_sts === 'IP / PC'
          ) {
            this.migratableBy.push('Device_Config_nmg');
          }



          if (inrVal?.lock_sts=== 'Possible_Action_Required' || inrVal?.lock_sts===null || inrVal?.lock_sts==='Unconfirmed') {
            this.migratableBy.push('Device_Config_mgar');
          }


          
          if (inrVal?.Migratable_by_rate_plan === 'Non-Migratable') {
            this.migratableBy.push('Rate');
          }

          if (inrVal?.Migratable_By_Device_status_code == 0) {
            this.migratableBy.push('Device');
          }

          if (inrVal?.SIM_Gen_Status === 'Non-Migratable') {
            this.migratableBy.push('Sim');
          }

          if (inrVal?.Migratable_by_rate_plan === 'Possible_Action_Required') {
            this.migratableBy.push('Rate_mgar');
          }
          if (
            !inrVal?.Migratable_By_Device_status_code || inrVal?.Migratable_By_Device_status_code == 2
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
        //console.log('Inside array of filter', uniqueMigratableBy);
        if (uniqueMigratableBy.includes('Device_Config_nmg') ) {
          this.DeviceConfigbuttonClass='nmg';
          this.DeviceConfigbuttonMessage='Action Required';
        
        }

        if (uniqueMigratableBy.includes('Device_Config_mgar')) {
          this.DeviceConfigbuttonClass='mgar';
          this.DeviceConfigbuttonMessage='Possible Action Required';
          //console.log("line 122",uniqueMigratableBy)
       
        
        }
        if (uniqueMigratableBy.includes('Device_Config_mgar') && uniqueMigratableBy.includes('Device_Config_nmg')
       ) {
          this.DeviceConfigbuttonClass='nmg';
          this.DeviceConfigbuttonMessage='Action Required';
          //console.log("line 129",uniqueMigratableBy)
        }
 
        if (!uniqueMigratableBy.includes('Device_Config_mgar') && !uniqueMigratableBy.includes('Device_Config_nmg')) {
          this.DeviceConfigbuttonClass='mg';
          this.DeviceConfigbuttonMessage='Ready';
          //console.log("line 129",uniqueMigratableBy)
        }
 


        if (uniqueMigratableBy.includes('Device') ) {
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

        //console.log('final ', uniqueMigratableBy);
        //console.log("device class",this.DevicebuttonClass)
      } 
    });

   
  }
  ngOnInit(): void {
  
  }



}

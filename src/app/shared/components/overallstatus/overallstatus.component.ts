import { Component,ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {
  UtilitiesService,
  deviceRatesState,
} from 'src/app/shared/services/utilities.service';

const ELEMENT_DATA: any[] = [];
@Component({
  selector: 'app-overallstatus',
  templateUrl: './overallstatus.component.html',
  styleUrls: ['./overallstatus.component.scss']
})
export class OverallstatusComponent implements OnInit {
  displayedAlerts: string[] = [

    'Equipment',
    'Device_Configuration',
    'SIM',
    'Rate_Plan'
  ];
   dataSource = new MatTableDataSource<deviceRatesState>(ELEMENT_DATA);

   dataSourcebyNum = new MatTableDataSource<deviceRatesState>(ELEMENT_DATA);
  isLoaded = false;
  length!: number;

  DevicebuttonClass: any;
  DevicebuttonMessage: any;

  SimGenbuttonClass: any;
  SimGenbuttonMessage: any;

  RatePlanbuttonClass: any;
  RatePlanbuttonMessage: any;
  filteredDataByNumber:any;
  HidePhoneNumberTable: any='show';

acct_nbr:any;
curr_srv_accs_nbr: any;
searchedNumber:any;
@ViewChild(MatPaginator)
  paginator!: MatPaginator;
  migratableBy: Array<string> = [];
  BANtableData: Boolean=true;
 


  constructor(
    private util: UtilitiesService
  ) {this.util.deviceRatesObservable$.subscribe((val) => {
    // //console.log('  deviceRatesObservable$ :', val);
  
    if (val?.length > 0) {
      this.migratableBy = [];
  
      this.isLoaded = true;
  
      //Complete Migratable //Non-Migratable by SIM Status //Non Migratable by Rate Plan //Non Migratable by Device //NMG By Both Device and Rate Plan
      val?.sort((a: any, b: any) =>
        a.Migratable_By_Device_message > b.Migratable_By_Device_message
          ? 1
          : -1
      );
      this.dataSource = new MatTableDataSource<deviceRatesState>(val);
      //console.log('this val', val);
     // console.log("Line 65",this.dataSource.filteredData)
      this.filteredDataByNumber=(this.dataSource.filteredData).filter(data=> data.phone_number == this.curr_srv_accs_nbr);
      this.dataSourcebyNum = new MatTableDataSource<deviceRatesState>(this.filteredDataByNumber);
      console.log("lineNumber83",this.filteredDataByNumber)
     // console.log("line 74",val.length)
  
  
     // console.log("line number 73",this.filteredDataByNumber)
      this.dataSource.paginator = this.paginator;
      this.length = val.length;
      console.log("length of this 88",this.length)
  
  
     
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
      //console.log('Inside array of filter', uniqueMigratableBy);
  
  
  
  
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
    } else {
      this.dataSource = new MatTableDataSource<deviceRatesState>([]);
      this.dataSource.paginator = this.paginator;
      this.length = 0;
    }
  }); }

  ngOnInit(): void {
  }
  ngDoCheck(){
    this.acct_nbr= sessionStorage.getItem('acct_nbr');
    this.curr_srv_accs_nbr=sessionStorage.getItem('curr_srv_accs_nbr')
    this.searchedNumber=sessionStorage.getItem('searchedNumber')
    this.filteredDataByNumber=(this.dataSource.filteredData).filter(data=> data.phone_number == this.curr_srv_accs_nbr);
    this.dataSourcebyNum = new MatTableDataSource<deviceRatesState>(this.filteredDataByNumber);

 if(this.searchedNumber===this.curr_srv_accs_nbr){
console.log("MOBILE NUMBER IS SEARCHED RIGHT NOW")
this.HidePhoneNumberTable='show'
 }
 if(this.searchedNumber===this.acct_nbr){
  console.log("ACCT NUMBER IS SEARCHED RIGHT NOW")
  this.HidePhoneNumberTable='hide'
   }

   if(this.length==1&& this.searchedNumber===this.curr_srv_accs_nbr){
    this.BANtableData=false;
   }


  }

}

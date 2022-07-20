import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { UtilitiesService } from 'src/app/shared/services/utilities.service';

export interface PeriodicElement {
  billing_account_info: string;
  ctn: number;
  date: string;
  status: string;
  device : string;
  button : string
}

const ELEMENT_DATA: PeriodicElement[] = [
  {billing_account_info: 'Jose csaLopez', ctn: 7873796289, date: 'Effective Date', status: 'Migratable/Non-Migratable', device:'Iphone 11', button: 'More Details'},
  {billing_account_info: 'Gloria Lopez', ctn: 7873796289, date: 'Effective Date', status: 'Migratable/Non-Migratable', device:'Iphone 11', button: 'More Details'},
  {billing_account_info: 'Jhonny', ctn: 7873796289, date: 'Effective Date', status: 'Migratable/Non-Migratable', device:'Iphone 11', button: 'More Details'},
  {billing_account_info: 'Jose Figueroa', ctn: 7873796289, date: 'Effective Date', status: 'Migratable/Non-Migratable', device:'Iphone 11', button: 'More Details'},
  {billing_account_info: 'Jake', ctn: 7873796289, date: 'Effective Date', status: 'Migratable/Non-Migratable', device:'Iphone 11', button: 'More Details'},
  {billing_account_info: 'Laura', ctn: 7873796289, date: 'Effective Date', status: 'Migratable/Non-Migratable', device:'Iphone 11', button: 'More Details'},
  
  
];

@Component({
  selector: 'app-devices-rates-list',
  templateUrl: './devices-rates-list.component.html',
  styleUrls: ['./devices-rates-list.component.scss']
})
export class DevicesRatesListComponent implements OnInit {

  displayedColumns: string[] = ['billing_account_info', 'ctn', 'date', 'status', 'device', 'button'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  
  displayStyle = "none";
  displayStyle1 = "block";

  constructor(private util : UtilitiesService) { }

  @Input() masterArray! : any[];

  ngDoCheck(): void{
    this.masterArray=this.util.getData()
    console.log("parent to child obtained data is ", this.masterArray)

}
 

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
  
    
  }

  nextscreen(){
this.displayStyle = "block"
this.displayStyle1 = "none"
  }
  back(){
    this.displayStyle = "none"
    this.displayStyle1 = "block"
      }
}

 
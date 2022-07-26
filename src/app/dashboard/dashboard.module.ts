import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { BillingDetailsComponent } from './billing-details/billing-details.component';
import { DevicesRatesListComponent } from './devices-rates-list/devices-rates-list.component';
import { DeviceRateDetailsComponent } from './device-rate-details/device-rate-details.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatChipsModule} from '@angular/material/chips';

const routes:Routes=[
{
  path:'',component:DashboardComponent,children:[
    {
      path:'',redirectTo:'billing',pathMatch:'full'
    },
    {
      path:'billing',component:BillingDetailsComponent
    },
    {
      path:'deviceRateList',component:DevicesRatesListComponent
    },
    {
      path:'deviceRateDetails',component:DeviceRateDetailsComponent
    }
  ]
},
]

@NgModule({
  declarations: [
    DashboardComponent,
    BillingDetailsComponent,
    DevicesRatesListComponent,
    DeviceRateDetailsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatTableModule,
    MatPaginatorModule,
    MatChipsModule,
    RouterModule.forChild(routes)
  ]
})
export class DashboardModule { }

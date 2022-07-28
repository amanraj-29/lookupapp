import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DevicesRatesListComponent } from './devices-rates-list/devices-rates-list.component';
import { DeviceRateDetailsComponent } from './device-rate-details/device-rate-details.component';
import { DeviceRatesComponent } from './device-rates.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

const routes:Routes=[
  {
    path:'',component:DeviceRatesComponent,children:[
      {
        path:'',redirectTo:'list',pathMatch:'prefix'
      },
      {
        path:'list',
        component:DevicesRatesListComponent
      },
      {
        path:'details/:id',component:DeviceRateDetailsComponent
      }
    ]
  },
  

]

@NgModule({
  declarations: [
    DeviceRatesComponent,
    DevicesRatesListComponent,
    DeviceRateDetailsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class DeviceRatesModule { }

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
import { LoaderComponent } from '../shared/components/loader/loader.component';
import { LoaderService } from '../shared/services/loader.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoaderInterceptor } from '../shared/services/loader-interceptor.service';



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
    DeviceRateDetailsComponent,
   LoaderComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatTableModule,
    MatPaginatorModule,
    MatChipsModule,
    RouterModule.forChild(routes)
  ],
  providers:[
    LoaderService,
    {
      provide:HTTP_INTERCEPTORS,useClass:LoaderInterceptor,multi:true
    }
  ]

})
export class DashboardModule { }

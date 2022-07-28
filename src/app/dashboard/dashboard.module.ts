import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { BillingDetailsComponent } from './billing-details/billing-details.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';



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
      path:'deviceRates',loadChildren:()=>import('./device-rates/device-rates.module').then(val=>val.DeviceRatesModule)
    }
  ]
},
]

@NgModule({
  declarations: [
    DashboardComponent,
    BillingDetailsComponent
  
  ],
  imports: [
    CommonModule,
    SharedModule,
    
    RouterModule.forChild(routes)
  ]

})
export class DashboardModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { BillingDetailsComponent } from './billing-details/billing-details.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { RecommendedPlansComponent } from './recommended-plans/recommended-plans.component';



const routes:Routes=[
{
  path:'',component:DashboardComponent,children:[
    {
      path:'',redirectTo:'deviceRates',pathMatch:'full'
    },
    {
      path:'billing',component:BillingDetailsComponent
    },
    {
      path:'deviceRates',loadChildren:()=>import('./device-rates/device-rates.module').then(val=>val.DeviceRatesModule)
    },
    {
      path:'recPlans',component:RecommendedPlansComponent
    }
  ]
},
]

@NgModule({
  declarations: [
    DashboardComponent,
    BillingDetailsComponent,
    RecommendedPlansComponent
  
  ],
  imports: [
    CommonModule,
    SharedModule,
    
    RouterModule.forChild(routes)
  ]

})
export class DashboardModule { }

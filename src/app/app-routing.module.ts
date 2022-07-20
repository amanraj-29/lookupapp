import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SearchComponent } from './search/search.component';
import { AuthGuardsService } from './shared/services/auth-guards.service';

const routes: Routes = [
  {
    path:'',redirectTo:'login',pathMatch:'full'
  },
  {
    path:'login',component:LoginComponent
  },
  {
    path:'search',component:SearchComponent,
    //  canActivate:[AuthGuardsService]
  },
  {
    path:'dashboard',
    // canActivateChild:[AuthGuardsService],
    loadChildren:()=>import('./dashboard/dashboard.module').then(val=>val.DashboardModule)
  },
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SearchComponent } from './search/search.component';
import { SharedModule } from './shared/shared.module';
import { MatTableModule } from '@angular/material/table';
import {MatTableDataSource} from '@angular/material/table';

import { LoaderService } from './shared/services/loader.service';
import { LoaderInterceptor } from './shared/services/loader-interceptor.service';
import { LoaderComponent } from './shared/components/loader/loader.component'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SearchComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    MatPaginatorModule,
    MatTableModule,
  ],
  providers: [LoaderService,
   
    {
      provide:HTTP_INTERCEPTORS,useClass:LoaderInterceptor,multi:true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }

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
import { InterceptorService } from './shared/services/interceptor.service';
// import {MatDialogModule} from '@angular/material/dialog';
import { SearchPopupComponent } from './shared/search-popup/search-popup.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SearchComponent
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
  providers: [{
    provide:HTTP_INTERCEPTORS,useClass:InterceptorService,multi:true
  }],
  bootstrap: [AppComponent],
  entryComponents: [SearchPopupComponent]
})
export class AppModule { }

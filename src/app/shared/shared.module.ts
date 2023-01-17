import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';
import { LoaderComponent } from './components/loader/loader.component';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import { SearchPopupComponent } from './search-popup/search-popup.component';
import { OverallAlertsComponent } from './components/overall-alerts/overall-alerts.component';


@NgModule({
  declarations: [
    HeaderComponent,
    LoaderComponent,
    SearchPopupComponent,
    OverallAlertsComponent
  ],
  entryComponents: [SearchPopupComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatChipsModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule
  ],
  exports:[HeaderComponent,LoaderComponent, FormsModule,MatInputModule,
    MatTabsModule,MatTableModule,
    MatPaginatorModule,
    MatChipsModule,
    MatCardModule,
    ReactiveFormsModule,MatButtonModule, MatMenuModule,MatIconModule, MatDialogModule, OverallAlertsComponent]
})
export class SharedModule { }

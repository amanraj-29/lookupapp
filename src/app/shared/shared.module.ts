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


@NgModule({
  declarations: [
    HeaderComponent,
    LoaderComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatChipsModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule
  ],
  exports:[HeaderComponent,LoaderComponent, FormsModule,MatInputModule,
    MatTabsModule,MatTableModule,
    MatPaginatorModule,
    MatChipsModule,
    MatCardModule,
    ReactiveFormsModule,MatButtonModule, MatMenuModule,MatIconModule]
})
export class SharedModule { }

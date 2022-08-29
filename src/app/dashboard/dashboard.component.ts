import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ApisService } from '../shared/services/apis.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilitiesService } from '../shared/services/utilities.service';

import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { SearchPopupComponent } from '../shared/search-popup/search-popup.component';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  searchednumber: any;
  email: any;
  formGroup!: FormGroup;
  search: any;

  constructor(
    private router: Router,
    private actRoute: ActivatedRoute,
    private apiService: ApisService,
    private http: HttpClient,
    private util: UtilitiesService,
    public dialog: MatDialog
  ) {
    this.email = sessionStorage.getItem('userData');
    this.searchednumber = sessionStorage.getItem('searchedNumber');
    if (this.searchednumber) {
      this.searchnum();
      this.searchdeviceandrateplan();
    }
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.formGroup = new FormGroup({
      search: new FormControl(this.searchednumber, [
        Validators.minLength(10),
        Validators.maxLength(15),
      ]),
      page: new FormControl(1),
    });
  }
  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    if(this.searchednumber!==this.formGroup.value.search){
   let searchPop= this.dialog.open(SearchPopupComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
    searchPop.afterClosed().subscribe(val=>{
      console.log('popup close event:',val);
      if(val==="yes"){
        this.searchednumber=this.formGroup.value.search;
        sessionStorage.setItem('searchedNumber', this.searchednumber);
        this.searchDetailAndRatePlan()
      }
    })
  }
  }
  Space(e: any) {
    var maxLength = 15;
    if (
      e.target.value.length >= maxLength &&
      ((e.keyCode >= 48 && e.keyCode <= 57) ||
        (e.keyCode >= 96 && e.keyCode <= 105))
    ) {
      e.preventDefault();
    }
  }
  searchDetailAndRatePlan() {
    this.searchdeviceandrateplan();
    this.searchnum();
  }

  searchdeviceandrateplan() {
    let num = this.formGroup && this.formGroup.value
        ? this.formGroup.value
        : { search: this.searchednumber };
    this.apiService.deviceandrateplan(num).subscribe((result) => {
      this.util.dispatchDeviceRates(result.result);
      // localStorage.setItem("Length", result.result.length)
      
    });
  }

  searchnum() {
    if (this.formGroup?.valid) {
      this.apiService.datasearch(this.formGroup.value).subscribe((result) => {
        this.util.dispatchBillingData(result.result[0]);
      });
    }
  }
}

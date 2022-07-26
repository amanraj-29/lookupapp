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
  masterArray!: Array<any>;
  
  constructor(
    private router: Router,
    private actRoute: ActivatedRoute,
    private apiService: ApisService,
    private http: HttpClient,
    private util: UtilitiesService
  ) {
    this.email = sessionStorage.getItem('userData');
    this.searchednumber = sessionStorage.getItem('searchedNumber');
    if(this.searchednumber){
      this.searchdeviceandrateplan();
    }
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.formGroup = new FormGroup({
      search: new FormControl(this.searchednumber, [
        Validators.minLength(4),
        Validators.maxLength(15),
      ]),
      page: new FormControl(1),
    });
  }

  searchdeviceandrateplan() {
    let num=(this.formGroup && this.formGroup.value)? this.formGroup.value:{search:this.searchednumber};
      this.apiService
        .deviceandrateplan(num)
        .subscribe((result) => {
          console.log(result)
          this.masterArray =result.result;
          console.log("masterArray parent",this.masterArray)
          this.util.setData(this.masterArray)
         // this.apiService.setDataInLocalStorage('DeviceAndRatePlanData', result);
          //this.router.navigate(['../dashboard'],{relativeTo:this.actRoute});
        });
    
  }

  searchnum() {
    if (this.formGroup.valid) {
      this.apiService.datasearch(this.formGroup.value).subscribe((result) => {
        console.log(result)
        this.router.navigate(['../dashboard'], { relativeTo: this.actRoute });
      });
    }
  }
}

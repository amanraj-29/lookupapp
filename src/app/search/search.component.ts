import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ApisService } from '../shared/services/apis.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  formGroup!: FormGroup;
  email: any;
  failureSearchMessage: any = null;

  constructor(
    private router: Router,
    private actRoute: ActivatedRoute,
    private apiService: ApisService,
    private http: HttpClient
  ) {
    this.email = sessionStorage.getItem('userData');
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.formGroup = new FormGroup({
      search: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(15),
        Validators.pattern('^[0-9]*$'),
      ]),
    });
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

  search() {
    if (this.formGroup.valid) {
      this.apiService.datasearch(this.formGroup.value).subscribe((result) => {
        if (result.success) {
          console.log(this.formGroup.value);
          console.log('length of data received', result);

          this.apiService.setDataInLocalStorage(
            'searchedNumber',
            this.formGroup.value.search
          );

this.apiService.setDataInLocalStorage('Billing_Account_Name',result.result[0].Billing_Account_Name);
this.apiService.setDataInLocalStorage('curr_srv_accs_nbr',result.result[0].curr_srv_accs_nbr);
this.apiService.setDataInLocalStorage('Libility_Type',result.result[0].Libility_Type);
this.apiService.setDataInLocalStorage('Billing_Address_1',result.result[0].Billing_Address_1);
this.apiService.setDataInLocalStorage('Billing_Address_2',result.result[0].Billing_Address_2);
this.apiService.setDataInLocalStorage('City',result.result[0].City);
this.apiService.setDataInLocalStorage('Effective_Date',result.result[0].Effective_Date);
this.apiService.setDataInLocalStorage('Service_ID',result.result[0].Service_ID);
this.apiService.setDataInLocalStorage('Account_Type',result.result[0].Account_Type);
this.apiService.setDataInLocalStorage('Account_Email',result.result[0].Account_Email);
this.apiService.setDataInLocalStorage('Account_start_date',result.result[0].Account_start_date);
this.apiService.setDataInLocalStorage('Billing_Cycle',result.result[0].Billing_Cycle);
this.apiService.setDataInLocalStorage('Billing_Close_Date',result.result[0].Billing_Close_Date);




       

          this.router.navigate(['../dashboard'], { relativeTo: this.actRoute });
        }

        if (!result.success) {
          this.failureSearchMessage = 'Search Not found';
          console.log('search not found');
        }
      });
    }
  }
}

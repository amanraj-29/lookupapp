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
import { UtilitiesService } from '../shared/services/utilities.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  formGroup!: FormGroup;
  email: any;
  failureSearchMessage: any = null;
  failureSearchMessage1: any = null;
  maxLength:number=15;

  constructor(
    private router: Router,
    private actRoute: ActivatedRoute,
    private apiService: ApisService,
    private http: HttpClient,
    private utils: UtilitiesService,
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
        Validators.maxLength(this.maxLength),
        Validators.pattern('^[0-9]*$'),
      ]),
    });
  }

  Space(e: any) {
    var maxLength = 15;
    if (
     
      (e.target.value.length >= maxLength &&
        ((e.keyCode >= 48 && e.keyCode <= 57) ||
        (e.keyCode >= 96 && e.keyCode <= 105)) || e.keyCode===69)
    ) {
      e.preventDefault();
    }
  }

  search() {
    if (this.formGroup.valid) {
      this.apiService.datasearch(this.formGroup.value).subscribe((result) => {
        if (result.success) {
          console.log(this.formGroup.value);
          // console.log('length of data received', result);
          this.utils.dispatchBillingData(result.result[0]);
          this.apiService.setDataInLocalStorage(
            'searchedNumber',
            this.formGroup.value.search
          );
          this.router.navigate(['../dashboard'], { relativeTo: this.actRoute });
        }

        if (!result.success) {
          this.failureSearchMessage = "We're sorry. We were not able to find a match.";
          this.failureSearchMessage1 = "Please try another search";
          console.log('search not found');
        }
      });
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApisService } from '../shared/services/apis.service';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})


export class SearchComponent implements OnInit {
  
  formGroup!: FormGroup;
  email: any;
 
  
  constructor(private router:Router,private actRoute:ActivatedRoute
    ,  private apiService:ApisService,private http:HttpClient) {
    this.email = sessionStorage.getItem('userData');
   }

  

   ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.formGroup = new FormGroup({
      search: new FormControl('', [Validators.minLength(4),Validators.maxLength(15)]),
    })}

    
   search(){
    
    if (this.formGroup.valid) {
      this.
        apiService.datasearch(this.formGroup.value)
        .subscribe((result) => {
          console.log(this.formGroup.value)
          console.log(result)
        
        

          this.apiService.setDataInLocalStorage('searchedNumber', this.formGroup.value.search);
      
          
         
         this.router.navigate(['../dashboard'],{relativeTo:this.actRoute});

          
         
          
        }
        )
      }
    }
  }
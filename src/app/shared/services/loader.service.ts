import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';



@Injectable({

  providedIn: 'root'

})

export class LoaderService {



  public isLoading = new BehaviorSubject(false);

  constructor() { }
  showLoader(){
    this.isLoading.next(true);
    setTimeout(()=>this.hideLoader(),5000);
  }
  hideLoader(){
    this.isLoading.next(false);
  }

}
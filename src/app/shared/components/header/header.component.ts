import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { UtilitiesService } from '../../services/utilities.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  showLogin=true;
  constructor(private utils:UtilitiesService,private router:Router) { 
    this.router.events.pipe(filter((val)=>val instanceof NavigationEnd)).subscribe((val:any)=>{ 
      // console.log('nav url is:',val);
    let urlArr=val.url.split('/');
    // console.log('url Arr:',urlArr);
      if(urlArr[urlArr.length-1]==='login'){
this.showLogin=false;
      }else{
this.showLogin=true;

      }
    })
  }

  ngOnInit(): void {
  }

  logout() {
   this.utils.logout();
  }

  home() {
    this.router.navigate(['../search'])
   }

}

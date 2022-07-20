import { Component, OnInit } from '@angular/core';
import { UtilitiesService } from '../../services/utilities.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private utils:UtilitiesService) { }

  ngOnInit(): void {
  }

  logout() {
  
   this.utils.logout();
  }

}

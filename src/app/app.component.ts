import { Component, HostListener } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'lookup';
  timeoutId: any;
  userInactive: Subject<any> = new Subject();
  utils: any;

  constructor(private router: Router) {
    this.checkTimeOut();
    if (sessionStorage.getItem('authToken')) {
      this.utils.callTimeInterval();
    }
    this.userInactive.subscribe((message) => {
      this.logout();
    });
  }

  checkTimeOut() {
    this.timeoutId = setTimeout(
      () => this.userInactive.next('Inactive'),
     300000
    );
  }

  logout() {
    console.log('Loggin out');
    //this.authService.clearStorage();
    sessionStorage.clear()
    this.router.navigate(['login']);
  }

  @HostListener('window:keydown')
  @HostListener('window:mousemove')
  @HostListener('window:scroll')
  checkUserActivity() {
    clearTimeout(this.timeoutId);

    this.checkTimeOut();
  }
}

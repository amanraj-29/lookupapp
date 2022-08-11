import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search-popup',
  templateUrl: './search-popup.component.html',
  styleUrls: ['./search-popup.component.scss']
})
export class SearchPopupComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<SearchPopupComponent>, private router: Router,) { }

  ngOnInit(): void {
  }
  // back(){
  //   this.router.navigate(['search'])
  // }
  close(val:string){
    this.dialogRef.close(val)
  }

}

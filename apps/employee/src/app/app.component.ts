import { Component , OnInit } from '@angular/core';
import { Location } from "@angular/common";
import { Router } from "@angular/router";

@Component({
  selector: 'facehiring-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  public isHeaderVisible = true;
  public currentUser:any;
  public loggedInEmployeeID:any;
  public loggedInRoleID:any;
  title = 'employee';
  constructor(location: Location,router: Router)
  {
    router.events.subscribe(val => {
      if(location.path() == '/manageJob')
      {
        this.isHeaderVisible = false;
      }
    
    });
    
  }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.loggedInEmployeeID  = this.currentUser[0].user_id;
    this.loggedInRoleID = this.currentUser[0].role_id;
  //   console.log(this.loggedInEmployeeID);
  console.log('app component ng onint')
  console.log(this.loggedInRoleID);
  console.log(this.loggedInEmployeeID);
    if(this.loggedInRoleID!=3)
    {
      window.location.href = '/';
    }
}

}

import { Component, OnInit,Output,EventEmitter,Input } from '@angular/core';
import { Location } from "@angular/common";
import { Router } from "@angular/router";


@Component({
  selector: 'facehiring-menucomponent',
  templateUrl: './menucomponent.component.html',
  styleUrls: ['./menucomponent.component.css']
})
export class MenucomponentComponent implements OnInit {
  route: string;
  isEditProfileRequired = true;
  isCRMLinksRequired = true;


  constructor(
              location: Location, 
              router: Router
              ) {
    router.events.subscribe(val => {
      // console.log(location.path());
      if(location.path() == '/signup')
      {
        this.isEditProfileRequired = false;
        this.isCRMLinksRequired = false;
      }
      if(location.path() == '/editprofile')
      {
        this.isCRMLinksRequired = false;
      }
      if(location.path() == '')
      {
        this.isCRMLinksRequired = false;
      }
      if(location.path() == '/profile')
      {
        this.isCRMLinksRequired = false;
      }
      if(location.path() == '/changePassword')
      {
        this.isCRMLinksRequired = false;
      }

     
    });
  }

  ngOnInit(): void {
  }

  
  logout()
  {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('companyID');
    localStorage.clear();
    window.location.href = '/login';
  }

  
}

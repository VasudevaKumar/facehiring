import { Component } from '@angular/core';
import { Location } from "@angular/common";
import { Router } from "@angular/router";

@Component({
  selector: 'facehiring-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  public isHeaderVisible = true;

  constructor(
    location: Location, 
    router: Router
    )
    {
      router.events.subscribe(val => {
       if(location.path() == '/manageJob')
       {
         this.isHeaderVisible = false;
       }
      
      });
    }
  title = 'employee';
}

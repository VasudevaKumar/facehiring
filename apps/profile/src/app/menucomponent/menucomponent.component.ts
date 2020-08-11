import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from '../_services/employee.service';

declare var jQuery: any;
declare var $: any;


@Component({
  selector: 'facehiring-menucomponent',
  templateUrl: './menucomponent.component.html',
  styleUrls: ['./menucomponent.component.css']
})
export class MenucomponentComponent implements OnInit {

  loggedInEmployeeID:any;
  currentUser:any;
  pendingRequests = [];
  constructor(
    private router: Router,
    private EmployeeService_:EmployeeService,
    private formBuilder: FormBuilder
    
) {
    // redirect to home if already logged in
}

  ngOnInit(): void {
    
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
     // this.loggedInEmployeeID  = this.currentUser['data'][0].id;
     this.loggedInEmployeeID  = 63;
     this.getPendingRequests();

  }

  getPendingRequests()
  {
    const _that = this;
    this.EmployeeService_
  .getPendingRequests(this.loggedInEmployeeID)
  .subscribe(pendingRequests => (_that.pendingRequests = pendingRequests))
  .add(() => {
    /*console.log(_that.employeeProfiles['profileData'][0].firstName);*/
    console.log(_that.pendingRequests);
   
  });
  }

  acceptRequest(connectID)
  {
    // alert(connectID);
    
   this.menudialog('Your friend request has been accepted', 450);
   const _that = this;
   this.EmployeeService_
  .acceptRequest(connectID)
  .subscribe()
  .add(() => {
    /*console.log(_that.employeeProfiles['profileData'][0].firstName);*/
    setTimeout(function(){
      $('#menuWaitDialog').dialog('close');
    }, 3000);

    _that.pendingRequests = _that.pendingRequests.filter(function( obj ) {
      return obj.connectID !== connectID;
  });

  });


  }

  menudialog(loadingMessage: any = 'Loading', defaultWidth: any = 350) {
    // tslint:disable-next-line: max-line-length
    $('#menuWaitDialog').html('<div>' + loadingMessage + ', please wait...</div>');
    $('#menuWaitDialog').dialog({
     modal: true,
     // title: 'Please wait',
      zIndex: 10000,
      maxWidth: defaultWidth,
      maxHeight: 50,
      width: defaultWidth,
      height: 50,
      resizable: false,
      dialogClass: 'no-titlebar'
    });
  }
  closemenuwaitdialog() {
    setTimeout(function(){
        $('#menuWaitDialog').dialog('close');
    }, 1000);
    
  }



}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from '../_services/employee.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgxSpinnerService } from "ngx-spinner";


@Component({
  selector: 'facehiring-profilecomponent',
  templateUrl: './profilecomponent.component.html',
  styleUrls: ['./profilecomponent.component.css']
})
export class ProfilecomponentComponent implements OnInit {

  myProfileBasicInfo = [];
  totalConnects = [];
  skillInfo = [];
  expInfo = [];
  companyProfiles = [];
  eduInfo = [];

  loggedInEmployeeID:any;
  currentUser:any;
  isContentLoaded = false;
  displayUser:any;

  constructor(
    private router: Router,
    private EmployeeService_:EmployeeService,
    private spinner: NgxSpinnerService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.spinner.show();
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.loggedInEmployeeID  = this.currentUser[0].user_id;
    this.displayUser = localStorage.getItem('searchUser');
    localStorage.removeItem('searchUser');
    if(this.displayUser>0)
    {
      this.loadContent(this.displayUser);
      this.countUpdate(this.displayUser);
      
    }
    else{
      this.loadContent(this.loggedInEmployeeID);
    }

  }

  async loadContent(employeeID)
    {
      const _that = this;
      const res1 = this.EmployeeService_.getMyProfileBasicInfo(employeeID).toPromise();
      const res2 = this.EmployeeService_.gettotalConnects(employeeID).toPromise();
      const res3 = this.EmployeeService_.getMyProfileSkillInfo(employeeID).toPromise();
      const res4 = this.EmployeeService_.getMyProfileExp(employeeID).toPromise();
      const res5 = this.EmployeeService_.geViewedCompanyProfiles(employeeID).toPromise();
      const res6 = this.EmployeeService_.getMyProfileEducation(employeeID).toPromise();
      

      let res = await Promise.all([res1 , res2, res3, res4, res5, res6]);
      //let res = await Promise.all([res1, res4]);
      _that.myProfileBasicInfo = res[0];
      _that.totalConnects = res[1];
      _that.skillInfo = res[2];
      _that.expInfo = res[3];
      _that.companyProfiles = res[4];
      _that.eduInfo = res[5];

      this.isContentLoaded = true;
      // console.log(this.myProfileBasicInfo);
      // console.log(this.companyProfiles);
      
      // _that.imageSrcLeft =  _that.isEmployeeProfileLoaded.data
      this.spinner.hide();

    }

    logout()
  {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('companyID');
    localStorage.clear();
    window.location.href = '/';
    
  }

  countUpdate(displayUser)
  {
    const _that = this;
        this.EmployeeService_.countUpdate(this.loggedInEmployeeID ,displayUser).subscribe();
  }


}

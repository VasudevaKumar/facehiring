import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from '../_services/employee.service';

declare var jQuery: any;
declare var $: any;


@Component({
  selector: 'facehiring-connectioncomponent',
  templateUrl: './connectioncomponent.component.html',
  styleUrls: ['./connectioncomponent.component.css']
})
export class ConnectioncomponentComponent implements OnInit {

  loggedInEmployeeID:any;
  currentUser:any;
  connectPeople=[];
  totalConnects = [];
  allGroups = [];

  GroupsForm: FormGroup;
  HashTagForm:FormGroup;

  hashtagMsg = '';
  hashtagValue = '';

  public isHashTagAvailable = true;

  submitted = false;
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
   this.loadContent(this.loggedInEmployeeID);

     this.GroupsForm = this.formBuilder.group({
       addGroup: ['',
          [
              Validators.required,
              Validators.pattern(/^([a-zA-Z]+\s)*[a-zA-Z]+$/)
              
          ]
      ]
     });

     this.HashTagForm = this.formBuilder.group({
      addHashtag: ['',
         [
             Validators.required,
             Validators.pattern(/^#\w+$/)
             
         ]
     ]
    });


  }

  get f() { return this.GroupsForm.controls; }
  get h() { return this.HashTagForm.controls; }
  
  onSubmit() {
   
    this.submitted = true;

    if (this.GroupsForm.invalid) {
      console.log('invalid');
     return;
  }

  const formData = new FormData();
  formData.append('addForm', this.GroupsForm.value.addGroup);
  formData.append('loggedInEmployeeID', this.loggedInEmployeeID);

  const _that = this;
            this.EmployeeService_
            .addGroup(formData)
            .subscribe((resp) => {
              });
  }

  onHashTagSubmit() {
   
    this.submitted = true;
    if (this.HashTagForm.invalid) {
      console.log('invalid');
     return;
  }

  const formData = new FormData();
  formData.append('hashTag', this.HashTagForm.value.addHashtag);
  formData.append('loggedInEmployeeID', this.loggedInEmployeeID);

  const _that = this;
            this.EmployeeService_
            .addHashTag(formData)
            .subscribe((resp) => {
              });
  }


  async loadContent(employeeID)
    {
      const _that = this;
      const res1 = this.EmployeeService_.getConnectPeople(employeeID).toPromise();
      const res2 = this.EmployeeService_.gettotalConnects(employeeID).toPromise();
      const res3 = this.EmployeeService_.gettotalGroups(employeeID).toPromise();
      
      let res = await Promise.all([res1, res2, res3]);
      //let res = await Promise.all([res1, res4]);
      _that.connectPeople = res[0];
      _that.totalConnects = res[1];
      _that.allGroups = res[2];

      console.log( _that.allGroups);

    }


    connectme(user_id , loopid)
    { 
      this.openwaitdialog('<img src="assets/img/loading.gif">', 200);
       const _that = this;
       this.EmployeeService_
     .connectme(user_id , this.loggedInEmployeeID)
     .subscribe((resp) => {})
     .add(() => {
      this.closewaitdialog();

      $("#btn_"+loopid).html('Request sent');
      $("#btn_"+loopid).prop('disabled', true);
     });

    }

    followMe(user_id , loopid)
    {

      this.openwaitdialog('<img src="assets/img/loading.gif">', 200);
       const _that = this;
       this.EmployeeService_
     .followMe(user_id , this.loggedInEmployeeID)
     .subscribe((resp) => {})
     .add(() => {
      this.closewaitdialog();

      $("#flbtn_"+loopid).html('<i class="feather-user-plus"></i> Following');
      $("#flbtn_"+loopid).prop('disabled', true);
     });

    }

    openwaitdialog(loadingMessage: any = 'Loading', defaultWidth: any = 350) {
      // tslint:disable-next-line: max-line-length
      $('#waitDialog').html('<div>' + loadingMessage + ', please wait...</div>');
      $('#waitDialog').dialog({
       modal: true,
       // title: 'Please wait',
        zIndex: 10000,
        maxWidth: defaultWidth,
        maxHeight: 100,
        width: defaultWidth,
        height: 100,
        resizable: false,
        dialogClass: 'no-titlebar'
      });
    }
    closewaitdialog() {
      setTimeout(function(){
          $('#waitDialog').dialog('close');
      }, 100);
      
    }

    addMeToGroup(group_id , loopid)
    { 
      this.openwaitdialog('<img src="assets/img/loading.gif">', 200);
       const _that = this;
       this.EmployeeService_
     .addMeToGroup(group_id , this.loggedInEmployeeID)
     .subscribe((resp) => {})
     .add(() => {
      this.closewaitdialog();

      $("#addGroupbtn_"+loopid).html('Added to group');
      $("#addGroupbtn_"+loopid).prop('disabled', true);
     });

    }

    verifyHashTag(hasTagValue)
    {
      this.isHashTagAvailable = true;
      this.openwaitdialog('<img src="assets/img/loading.gif">', 200);

      const _that = this;
       this.EmployeeService_
     .verifyHashTag(hasTagValue)
     .subscribe((resp) => {
      console.log(resp); 
      console.log(resp.data);

      if(resp.data.length > 0)
      {
        this.hashtagMsg = this.HashTagForm.value.addHashtag+' is not available';
        this.hashtagValue = '';
        this.isHashTagAvailable = false;
      }

     })
     .add(() => {
      this.closewaitdialog();
    });


    }

}

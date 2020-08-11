import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { ConfirmPasswordValidator } from './../_validators/confirm-password.validator';
import { HrserviceService } from './../../../../../_services/hrservice.service';

import { NgxSpinnerService } from "ngx-spinner";
import { AlertsService } from 'angular-alert-module';

declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'facehiring-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
  providers: [HrserviceService]
})
export class ChangePasswordComponent implements OnInit {

  editForm: FormGroup;
  loading = false;
  submitted = false;
  loggedInEmployeeID:any;
  public currentUser:any;


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private HrserviceService_:HrserviceService,
    private spinner: NgxSpinnerService,
    private alerts: AlertsService
   
) {
    // redirect to home if already logged in
}

  ngOnInit(): void {
    
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.loggedInEmployeeID  = this.currentUser[0].user_id;


    this.editForm = this.formBuilder.group({

      password: ['',
                [
                    Validators.required,
                    Validators.minLength(6)

                ]
            ],
            confirmPassword:
                ['',
                    [
                        Validators.required,
                        Validators.minLength(6)

                    ]
                ]
    },
      { validator: ConfirmPasswordValidator.MatchPassword }
    );

  }

  get f() { return this.editForm.controls; }


  onSubmit() {
    this.submitted = true;

        if (this.editForm.invalid) {
             return;
      }
      this.spinner.show();
       const formData = new FormData();
       formData.append('password', this.editForm.value.password);
       formData.append('loggedInUser', this.loggedInEmployeeID);  


       const _that = this;
        this.HrserviceService_
        .changePassword(formData)
        .subscribe((resp) => {
          
          this.spinner.hide();
          window.scrollTo({ top: 0, behavior: 'smooth' });
          $('.alertsContainer .alertsRow.error').attr("style", "display: none !important");
          this.alerts.setMessage('Thank you. Your password has been changed sucessfully! Please wait ..' ,'success');
            });
        
}

}

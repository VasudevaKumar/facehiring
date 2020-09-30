import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../../../../../_services/authentication.service';
import { Subscription } from 'rxjs';
import { AlertsService } from 'angular-alert-module';
declare var jQuery: any;
declare var $: any;


@Component({
  selector: 'facehiring-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  
  title = 'login';
  loginForm: FormGroup;
  submitted = false;
  loading = false;
  employeeDetails = [];
  returnUrl: '';
  currentUser =  '';
  isCredentialsCorrect = true;
  role_id = 2;
  userSubscription: Subscription;
  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
    private alerts: AlertsService,
  ){

    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
  }
  }
  ngOnInit(): void {
    this.authenticationService.logout();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    

    this.userSubscription = this.route.params.subscribe(
      (params: Params) => {
        console.log(params);
    })



    /*
    if(this.currentUser['data'].length > 0)
    {
        window.location.href = 'http://localhost/doffl';
    }
    */

    this.loginForm = this.formBuilder.group({
      emailAddress: ['',
                [
                  Validators.required, 
                  Validators.email,
                  Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
                ]
            ],
            password: ['',
                [
                    Validators.required,
                    Validators.minLength(6)

                ]
            ]
    });
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
            
             this.loading = true;
             this.authenticationService.login(this.f.emailAddress.value, this.f.password.value, this.role_id)
                 .pipe(first())
                 .subscribe(
                     data => {
                          
                        /// console.log(data);

                         if(data.data.msg == 'fail')
                         {

                             this.loading = false;
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                            this.alerts.setDefaults('timeout',500);
                            this.alerts.setMessage(data.data.returnMessage,'error');

                         }
                         else {
                          $('.alertsContainer .alertsRow.error').attr("style", "display: none !important");
                           this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
                          console.log(this.currentUser);
                          this.loading = false;
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                          this.alerts.setDefaults('timeout',500);
                          this.alerts.setMessage(data.data.returnMessage ,'success');
                          /*
                          if(this.currentUser.length > 0)
                          {
                            if(this.currentUser[0]['role_id'] == 2)
                            {
                              setTimeout(function(){
                                window.location.href = '/profile';
                                }, 3000);
                            }
                            if(this.currentUser[0]['role_id'] == 3)
                            {
                              setTimeout(function(){
                                window.location.href = '/employee';
                              }, 3000);
                            }
                          }
                         */
                         }
                        
                     },
                     error => {
                        this.loading = false;
                     });

  }

  forgotPassword()
  {
    alert('here');
  }
  
  register(roleID)
  {
    if(roleID == 2)
    {
      window.location.href = '/profile';
    }

    if(roleID == 3)
    {
      window.location.href = '/employee';
    }

  }
  openLoginForm(roleID)
  {
    this.role_id = roleID;
    
    $('#loginDialog').dialog({
      modal: true,
       title: 'Login here',
       zIndex: 10000,
       maxHeight: 370,
       height: 370,
       maxWidth: 425,
       width: 425,
       resizable: false,
       close: this.loginFormClose,
       dialogClass: 'no-titlebar'
     });
  }

  loginFormClose()
  {
    $('.alertsContainer .alertsRow.error').attr("style", "display: none !important");
  }
}

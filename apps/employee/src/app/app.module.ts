import { BrowserModule } from '@angular/platform-browser';
import { NgModule , CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { MatNativeDateModule } from '@angular/material/core';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { CommonModule } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { ImageCropperModule } from 'ngx-image-cropper';
import { MenucomponentComponent } from './menucomponent/menucomponent.component';
import { EditprofilecomponentComponent } from './editprofilecomponent/editprofilecomponent.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { AlertsModule } from 'angular-alert-module';
import { HomeComponentComponent } from './home-component/home-component.component';
import { CompanyProfileComponent } from './company-profile/company-profile.component';
import { AdminGuard } from  './../../../../_services/admin.guard';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { PostJobComponent } from './post-job/post-job.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { ManageJobPostingsComponent } from './manage-job-postings/manage-job-postings.component';
import { AgGridModule } from 'ag-grid-angular';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ConfirmationDialogComponentComponent } from './confirmation-dialog-component/confirmation-dialog-component.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EditJobPostComponent } from './edit-job-post/edit-job-post.component';
import { ScheduleModule } from '@syncfusion/ej2-angular-schedule';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { DayService, WeekService, WorkWeekService, MonthService, AgendaService, MonthAgendaService} from '@syncfusion/ej2-angular-schedule';
import { ScheduleComponentComponent } from './schedule-component/schedule-component.component';
import { JoblistingsComponent } from './joblistings/joblistings.component';


const appRoutes:Routes = [
  {
      path : '', 
      canActivate: [AdminGuard],
      component:HomeComponentComponent
      
  },
  {
      path : 'editprofile',
      component:EditprofilecomponentComponent,
      canActivate: [AdminGuard]
  },
  {
    path : 'signup',
    component:RegistrationComponent
    
},
{
  path : 'profile/:id',
  component:CompanyProfileComponent,
  canActivate: [AdminGuard]
},
{
  path : 'changePassword',
  component:ChangePasswordComponent,
  canActivate: [AdminGuard]
  
},
{
  path : 'postJob',
  component:PostJobComponent,
  canActivate: [AdminGuard]
  
},
{
  path : 'manageJob/:string',
  component:ManageJobPostingsComponent,
  canActivate: [AdminGuard]
  
},
{
  path : 'manageJob',
  component:ManageJobPostingsComponent,
  canActivate: [AdminGuard]
  
},
{
  path : 'editJob/:id',
  component:EditJobPostComponent,
  canActivate: [AdminGuard]
},
{
  path : 'schedule',
  component:ScheduleComponentComponent,
  canActivate: [AdminGuard]
},
{
  path : 'joblisting/:id',
  component:JoblistingsComponent,
  canActivate: [AdminGuard]
},
{
  path : '**',
  component:HomeComponentComponent,
  canActivate: [AdminGuard]
}

]

@Pipe({name: 'replaceImg78'})
export class replaceImg78Pipe implements PipeTransform {
  transform(value: string): string {
    return value.replace('profilePics_130','profilePics_78');
  }
}

@Pipe({name: 'replaceImg40'})
export class replaceImg40Pipe implements PipeTransform {
  transform(value: string): string {
    return value.replace('profilePics_130','profilePics_40');
  }
}



@NgModule({
  declarations: [AppComponent, RegistrationComponent, MenucomponentComponent, EditprofilecomponentComponent, HomeComponentComponent,replaceImg78Pipe,replaceImg40Pipe, CompanyProfileComponent, ChangePasswordComponent, PostJobComponent, ManageJobPostingsComponent,ConfirmationDialogComponentComponent, EditJobPostComponent, ScheduleComponentComponent, JoblistingsComponent],
  imports: [
     BrowserModule,
     ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    AutocompleteLibModule,
    AngularMultiSelectModule,
    MatNativeDateModule,
   // BsDropdownModule.forRoot(), 
    NgxIntlTelInputModule,
    AngularEditorModule ,
    ImageCropperModule,
    NgxSpinnerModule,
    FontAwesomeModule,
    AgGridModule.withComponents([]),
    AlertsModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    ScheduleModule ,
    ButtonModule,
    NgbModule,
    ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [DayService, 
    WeekService, 
    WorkWeekService, 
    MonthService,
    AgendaService,
    MonthAgendaService],
  bootstrap: [AppComponent],
})
export class AppModule {}

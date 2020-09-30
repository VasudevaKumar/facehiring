import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
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
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxSpinnerModule } from "ngx-spinner";
import { AlertsModule } from 'angular-alert-module';
import { AngularEditorModule } from '@kolkov/angular-editor';

import { AdminGuard } from  './../../../../_services/admin.guard';
import { HomecomponentComponent } from './homecomponent/homecomponent.component';
import { ProfilecomponentComponent } from './profilecomponent/profilecomponent.component';
import { EditprofilecomponentComponent } from './editprofilecomponent/editprofilecomponent.component';
import { ConnectioncomponentComponent } from './connectioncomponent/connectioncomponent.component';
import { MenucomponentComponent } from './menucomponent/menucomponent.component';
import { RegistrationComponent } from './registration/registration.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { JobSearchComponent } from './job-search/job-search.component';
import { JobdetailComponent } from './jobdetail/jobdetail.component';
import { MyjobsComponent } from './myjobs/myjobs.component';
import { ConfirmationDialogComponentComponent } from './confirmation-dialog-component/confirmation-dialog-component.component';
import { ModalModule } from 'ngx-bootstrap/modal';  


const appRoutes:Routes = [
  {
      path : '', 
      canActivate: [AdminGuard],
      component:HomecomponentComponent,
      
  },
  {
      path : 'myProfile',
      canActivate: [AdminGuard],
      component:ProfilecomponentComponent
  },
  {
      path : 'editprofile',
      canActivate: [AdminGuard],
      component:EditprofilecomponentComponent
  },
  {
      path : 'connections',
      canActivate: [AdminGuard],
      component:ConnectioncomponentComponent
  },
  
  {
    path : 'signup',
    component:RegistrationComponent
  },
  
  {
    path : 'changePassword',
    component:ChangePasswordComponent,
    canActivate: [AdminGuard]
    
  },
  {
    path : 'jobSearch',
    component:JobSearchComponent,
    canActivate: [AdminGuard]
    
  },
  {
    path : 'myjobs',
    component:MyjobsComponent,
    canActivate: [AdminGuard]
    
  },
  {
    path : 'jobdetail',
    component:JobdetailComponent,
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
  declarations: [AppComponent, ProfilecomponentComponent, MyjobsComponent , ConfirmationDialogComponentComponent
 ,     JobSearchComponent  , JobdetailComponent,  ChangePasswordComponent , ConnectioncomponentComponent, RegistrationComponent , EditprofilecomponentComponent, HomecomponentComponent,replaceImg78Pipe,replaceImg40Pipe,ConnectioncomponentComponent, MenucomponentComponent],
  imports: [
    CommonModule, 
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
    AngularEditorModule,
    ImageCropperModule,
    NgxSpinnerModule,
    AlertsModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    FontAwesomeModule,
    ModalModule.forRoot()

  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

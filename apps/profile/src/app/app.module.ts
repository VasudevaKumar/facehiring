import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { HomecomponentComponent } from './homecomponent/homecomponent.component';
import { ProfilecomponentComponent } from './profilecomponent/profilecomponent.component';
import { EditprofilecomponentComponent } from './editprofilecomponent/editprofilecomponent.component';
import { ConnectioncomponentComponent } from './connectioncomponent/connectioncomponent.component';
import { MenucomponentComponent } from './menucomponent/menucomponent.component';

import {HeaderwithoutsearchModule} from '../../../../libs/headerwithoutsearch/src/index';
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
import { NgChatModule } from 'ng-chat';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

const appRoutes:Routes = [
  {
      path : '', 
      component:HomecomponentComponent
  },
  {
      path : 'profile',
      component:ProfilecomponentComponent
  },
  {
      path : 'editprofile',
      component:EditprofilecomponentComponent
  },
  {
      path : 'connections',
      component:ConnectioncomponentComponent
  },
  {
    path : 'signup',
    component:RegistrationComponent
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
  declarations: [AppComponent, ProfilecomponentComponent, ConnectioncomponentComponent, RegistrationComponent , EditprofilecomponentComponent, HomecomponentComponent,replaceImg78Pipe,replaceImg40Pipe,ConnectioncomponentComponent, MenucomponentComponent],
  imports: [
    CommonModule, 
    BrowserModule,
    HeaderwithoutsearchModule,
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
    ImageCropperModule,
    NgChatModule,
    RouterModule.forRoot(appRoutes),
    FontAwesomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterModule, Routes } from '@angular/router';
import { ActivateComponent } from './activate/activate.component';
import { LoginComponent } from './login/login.component';
import { AlertsModule } from 'angular-alert-module';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';

const appRoutes:Routes = [{
  path : '', 
  component:LoginComponent
},
{
  path : 'activate/:string',
  component:ActivateComponent
},
{
  path : 'forgotPassword',
  component:ForgotPasswordComponent
},
{
  path : 'updatePassword/:string',
  component:UpdatePasswordComponent
},
{
  path : '**',
  component:LoginComponent
}
];

@NgModule({
  declarations: [AppComponent, ActivateComponent, LoginComponent, ForgotPasswordComponent, UpdatePasswordComponent],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
     MatFormFieldModule,
    MatInputModule,
    AlertsModule.forRoot(),
    RouterModule.forRoot(appRoutes),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

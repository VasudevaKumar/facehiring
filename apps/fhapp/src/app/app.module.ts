import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import { AlertsModule } from 'angular-alert-module';
import { LoginComponentComponent } from './login-component/login-component.component';

const appRoutes:Routes = [{
  path : '', 
  component:LoginComponentComponent
}];

@NgModule({
  declarations: [AppComponent , LoginComponentComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AlertsModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    AlertsModule.forRoot(),
    RouterModule.forRoot(appRoutes),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

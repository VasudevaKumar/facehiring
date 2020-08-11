import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }
  env = environment;

  submitRegister(formData:any)
  {     
    const api = this.env.apiBaseURL+'/register';
    return this.http.post(
        api,
        formData,
        ).pipe(map((data: any) => data));
  }
  editProfile(formData:any)
  {
    const api = this.env.apiBaseURL+'/edit';
    return this.http.post(
        api,
        formData,
        ).pipe(map((data: any) => data));
  }
  getEmployeeProfile(employeeID:any)
  {
    const api = this.env.apiBaseURL+'/getEmployeeProfile';
    return this.http.post(
        api,
        {employeeID:employeeID},
        ).pipe(map((data: any) => data.data));
  }

  verifyEmailAvailability(emailAddress:any)
  {
    const api = this.env.apiBaseURL+'/verifyEmail';
    return this.http.post(
        api,
        {emailAddress:emailAddress},
        ).pipe(map((data: any) => data.data));
  }
  
  verifyEmailAvailabilityForEdit(emailAddress:any, employeeID:any)
  {
    const api = this.env.apiBaseURL+'/verifyEmailForEdit';
    return this.http.post(
        api,
        {emailAddress:emailAddress , employeeID:employeeID},
        ).pipe(map((data: any) => data.data));
  }

  






}

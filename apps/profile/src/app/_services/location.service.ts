import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http: HttpClient) { }
  env = environment;
  getLocations()
  {     
    const api = this.env.apiBaseURL+'/locations';
    return this.http.get(
        api,
        ).pipe(map((data: any) => data.data));
  }



}

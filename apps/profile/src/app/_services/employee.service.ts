import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  env = environment;

  getEmployeeHomDetails(employeeID:any)
  {
    const api = this.env.apiBaseURL+'/getEmployeeHomDetails';
    return this.http.post(
        api,
        {employeeID:employeeID},
        ).pipe(map((data: any) => data.data));
  }

  getPeopleWhoMayKnow(employeeID:any)
  {
    const api = this.env.apiBaseURL+'/getPeopleWhoMayKnow';
    return this.http.post(
        api,
        {employeeID:employeeID},
        ).pipe(map((data: any) => data.data));
  }

  getEmployeeHomePics(employeeID:any)
  {
    const api = this.env.apiBaseURL+'/getEmployeeHomePics';
    return this.http.post(
        api,
        {employeeID:employeeID},
        ).pipe(map((data: any) => data.data));
  }

  uploadHomePageFileL(formData:any)
  {     
    const api = this.env.apiBaseURL+'/uploadHomePageFileL';
    return this.http.post(
        api,
        formData,
        ).pipe(map((data: any) => data.data));
  }

  uploadHomePageFileR(formData:any)
  {     
    const api = this.env.apiBaseURL+'/uploadHomePageFileR';
    return this.http.post(
        api,
        formData,
        ).pipe(map((data: any) => data.data));
  }

  getPosts(employeeID:any)
  {
    const api = this.env.apiBaseURL+'/getPosts';
    return this.http.post(
        api,
        {employeeID:employeeID},
        ).pipe(map((data: any) => data.data));
  }
  pushComments(employeeID:any , postID:any, commentNotes:any)
  {
    const api = this.env.apiBaseURL+'/pushComments';
    return this.http.post(
        api,
        {
            employeeID:employeeID,
            postID:postID,
            commentNotes:commentNotes
        },
        ).pipe(map((data: any) => data.data));
  }

  pushPost(employeeID:any , commentNotes:any)
  {
    const api = this.env.apiBaseURL+'/pushPost';
    return this.http.post(
        api,
        {
            employeeID:employeeID,
            commentNotes:commentNotes
        },
        ).pipe(map((data: any) => data.data));
  }

  postImage(formData:any)
  {     
    const api = this.env.apiBaseURL+'/postImage';
    return this.http.post(
        api,
        formData,
        ).pipe(map((data: any) => data.data));
  }

  postSharing(postID: any , employeeID:any)
  {
    const api = this.env.apiBaseURL+'/postSharing';
    return this.http.post(
        api,
        {
            employeeID:employeeID,
            postID:postID
        },
        ).pipe(map((data: any) => data.data));
  }

  postLike(postID: any , employeeID:any)
  {
    const api = this.env.apiBaseURL+'/postLike';
    return this.http.post(
        api,
        {
            employeeID:employeeID,
            postID:postID
        },
        ).pipe(map((data: any) => data.data));
  }

  getConnectPeople(employeeID:any)
  {
    const api = this.env.apiBaseURL+'/getConnectPeople';
    return this.http.post(
        api,
        {employeeID:employeeID},
        ).pipe(map((data: any) => data.data));
  }

  gettotalConnects(employeeID:any)
  {
    const api = this.env.apiBaseURL+'/gettotalConnects';
    return this.http.post(
        api,
        {employeeID:employeeID},
        ).pipe(map((data: any) => data.data));
  }

  gettotalGroups(employeeID:any)
  {
    const api = this.env.apiBaseURL+'/gettotalGroups';
    return this.http.post(
        api,
        {employeeID:employeeID},
        ).pipe(map((data: any) => data.data));
  }


  connectme(user_id: any , employeeID:any)
  {
    const api = this.env.apiBaseURL+'/connectme';
    return this.http.post(
        api,
        {
            employeeID:employeeID,
            connect_id:user_id
        },
        ).pipe(map((data: any) => data.data));
  }

  followMe(user_id: any , employeeID:any)
  {
    const api = this.env.apiBaseURL+'/followMe';
    return this.http.post(
        api,
        {
            employeeID:employeeID,
            follower_id:user_id
        },
        ).pipe(map((data: any) => data.data));
  }


  getPendingRequests(employeeID:any)
  {
    const api = this.env.apiBaseURL+'/getPendingRequests';
    return this.http.post(
        api,
        {employeeID:employeeID},
        ).pipe(map((data: any) => data.data));
  }
  acceptRequest(connectID:any)
  {
    const api = this.env.apiBaseURL+'/acceptRequest';
    return this.http.post(
        api,
        {connectID:connectID},
        ).pipe(map((data: any) => data.data));
  }


  addGroup(formData:any)
  {     
    const api = this.env.apiBaseURL+'/addGroup';
    return this.http.post(
        api,
        formData,
        ).pipe(map((data: any) => data));
  }

  addHashTag(formData:any)
  {     
    const api = this.env.apiBaseURL+'/addHashTag';
    return this.http.post(
        api,
        formData,
        ).pipe(map((data: any) => data));
  }


  addMeToGroup(group_id: any , employeeID:any)
  {
    const api = this.env.apiBaseURL+'/addMeToGroup';
    return this.http.post(
        api,
        {
            employeeID:employeeID,
            group_id:group_id
        },
        ).pipe(map((data: any) => data.data));
  }

  verifyHashTag(hashTagValue:any)
  {
    const api = this.env.apiBaseURL+'/verifyHashTag';
    return this.http.post(
        api,
        {hashTagValue:hashTagValue},
        ).pipe(map((data: any) => data));
  }

  

}

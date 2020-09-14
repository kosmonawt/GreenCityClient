import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {EditProfileDto, EditProfileModel} from '@user-models/edit-profile.model';
import { environment } from '@environment/environment';

@Injectable({
  providedIn: 'root'
})
export class EditProfileService {
  private url: string = environment.backendLink;
  private accessToken = localStorage.getItem('accessToken');
  private httpOptions = {
    headers: new HttpHeaders({
      Authorization: 'my-auth-token'
    })
  };

  constructor(private http: HttpClient) { }

  postDataUserProfile(data: FormData): Observable<EditProfileDto> {
    this.httpOptions.headers.set('Authorization', `Bearer ${this.accessToken}`);

    return this.http.put<EditProfileDto>(`${this.url}user/profile`, data, this.httpOptions);
  }

}

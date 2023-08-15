import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { User } from '../types/User';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private appUrl = environment.appUrl;
  private headers = new HttpHeaders({
    'X-Parse-Application-Id': environment.appId,
    'X-Parse-JavaScript-Key': environment.javascriptKey,
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) {}

  getUserProfile(id: string) {
    const request = this.http.get<User>(`${this.appUrl}/users/${id}`, {
      headers: this.headers,
    });
    return request;
  }

  register(username: string, email: string, image: string, password: string) {
    const data = {
      username,
      email,
      imageUrl: image,
      password,
      posts: [],
    };
    
    return this.http.post<User>(`${this.appUrl}/users`, data, {
      headers: this.headers,
    });
  }

  login(username: string, password: string) {
    const url = `${this.appUrl}/login?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`;
    return this.http.get<User>(url, {
      headers: this.headers,
    });
  }
}

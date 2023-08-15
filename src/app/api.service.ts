import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { BidItems } from './types/BidItem';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private appUrl = environment.appUrl;
  private headers = new HttpHeaders({
    'X-Parse-Application-Id': environment.appId,
    'X-Parse-JavaScript-Key': environment.javascriptKey,
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient) { }

  getCatalog() {
    const request = this.http.get<BidItems[]>(`${this.appUrl}/classes/BidItems`, { headers: this.headers })
    return request;
  }

  createBid(data: BidItems) {
    const request = this.http.post(`${this.appUrl}/classes/BidItems`, data, { headers: this.headers });
    return request;
  }

  getSpecificBid(id: string) {
    const request = this.http.get<BidItems>(`${this.appUrl}/classes/BidItems/${id}`, { headers: this.headers });
    return request;
  }

  updateBidItem(id: string, data: BidItems) {
    const request = this.http.put<BidItems>(`${this.appUrl}/classes/BidItems/${id}`, data, { headers: this.headers });
    return request;
  }

  deleteBid(id: string | undefined) {
    const request = this.http.delete(`${this.appUrl}/classes/BidItems/${id}`, { headers: this.headers })
    return request;
  }
}
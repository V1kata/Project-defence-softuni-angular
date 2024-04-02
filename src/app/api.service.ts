import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { BidItems } from './types/BidItem';
import { UserService } from './user/user.service';
import { switchMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private appUrl = environment.appUrl;
  private headers = new HttpHeaders({
    'X-Parse-Application-Id': environment.appId,
    'X-Parse-JavaScript-Key': environment.javascriptKey,
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient, private userService: UserService) { }

  getCatalog() {
    const request = this.http.get<BidItems[]>(
      `${this.appUrl}/classes/BidItems`,
      { headers: this.headers }
    );
    return request;
  }

  createBid(data: BidItems) {
    const request = this.http.post(`${this.appUrl}/classes/BidItems`, data, {
      headers: this.headers,
    });
    return request;
  }

  getSpecificBid(id: string | undefined) {
    const request = this.http.get<BidItems>(
      `${this.appUrl}/classes/BidItems/${id}`,
      { headers: this.headers }
    );
    return request;
  }

  editBidItem(id: string | undefined, data: BidItems | null) {
    const request = this.http.put(
      `${this.appUrl}/classes/BidItems/${id}`,
      data,
      { headers: this.headers }
    );
    return request;
  }

  updateBidItem(
    id: string | undefined,
    data: { bids: string[] | undefined; price: number | undefined }
  ) {
    const request = this.http.put(
      `${this.appUrl}/classes/BidItems/${id}`,
      data,
      { headers: this.headers }
    );
    return request;
  }


  deleteBid(id: string | undefined) {
    let userId: string | undefined; // Store the user ID
    let objectId: string; // Store the object ID

    // Fetch the bid item and store its details
    return this.getSpecificBid(id).pipe(
      tap((item) => {
        userId = item.author.objectId;
        objectId = item.objectId;
      }),
      // Fetch the user details
      switchMap(() => this.userService.getUserProfile(userId)),
      // Remove the bid item ID from the user's posts array
      tap((user) => {
        if (user && user.posts) {
          const index = user.posts.indexOf(objectId);
          if (index !== -1) {
            user.posts.splice(index, 1);
            console.log(user)
          }
        }
      }),
      // Update the user
      switchMap((user) => this.userService.updateUser(user.objectId, { posts: user.posts }, user?.sessionToken)),
      // Delete the bid item
      switchMap(() => this.http.delete(`${this.appUrl}/classes/BidItems/${id}`, {
        headers: this.headers,
      }))
    );
  }

}

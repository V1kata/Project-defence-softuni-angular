import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { BidItems } from 'src/app/types/BidItem';
import { User } from 'src/app/types/User';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  owner: boolean = false;
  selectedItem: BidItems | null = null;
  username: string | null = null;
  lastBidder: string = '';

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.apiService.getSpecificBid(id).subscribe({
        next: (res) => {
          this.selectedItem = res;

          this.userService.getUserProfile(res.author['objectId']).subscribe({
            next: (userRef) => {
              this.username = userRef.username;

              if (this.userService.user) {
                const currentUser: User = this.userService.user;
                this.owner = currentUser.posts.find(id => id === res.objectId) ? true : false;
              }

              if (res.bids.length > 0) {
                const lastBidUserId = res.bids[res.bids.length - 1];
                this.userService.getUserProfile(lastBidUserId).subscribe({
                  next: (lastBidUser) => {
                    this.lastBidder = lastBidUser.username;
                  },
                  error: (err) => {
                    console.log(err);
                  },
                });
              }
            },
            error: (err) => {
              console.log(err);
            },
          });
        },
        error: (err) => {
          console.log('Error res ' + err);
        },
      });
    }
  }
}

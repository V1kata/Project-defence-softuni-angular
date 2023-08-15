import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { BidItems } from 'src/app/types/BidItem';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  selectedItem: BidItems | null = null;
  username: string | null = null;
  lastBidder: string = '';

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private userServise: UserService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.apiService.getSpecificBid(id).subscribe({
        next: (res) => {
          this.selectedItem = res;

          this.userServise.getUserProfile(res.author.objectId).subscribe({
            next: (userRef) => {
              this.username = userRef.username;

              if (res.bids.length > 0) {
                this.userServise.getUserProfile(res.bids[res.bids.length]);
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

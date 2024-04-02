import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { ErrorService } from 'src/app/core/error/error.service';
import { LoaderService } from 'src/app/core/loader/loader.service';
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
  currentUser: User | null = null;
  showBidFormContainer: boolean = false;
  bidAmount: number = 0;
  hasBidded: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private userService: UserService,
    private router: Router,
    private loadService: LoaderService,
    private errorService: ErrorService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.loadService.showLoader();
      this.apiService.getSpecificBid(id).subscribe({
        next: (res) => {
          this.selectedItem = res;
          
          this.userService.getUserProfile(res.author['objectId']).subscribe({
            next: (userRef) => {
              this.username = userRef.username;
              
              if (this.userService.user) {
                this.owner = res.author.objectId === userRef.objectId ? true : false;
                this.hasBidded = this.selectedItem?.bids.find(id => id === this.currentUser?.objectId) ? true : false;
              }

              if (res.bids.length > 0) {
                const lastBidUserId = res.bids[res.bids.length - 1];
                this.userService.getUserProfile(lastBidUserId).subscribe({
                  next: (lastBidUser) => {
                    this.lastBidder = lastBidUser.username;
                    this.loadService.hideLoader()
                  },
                  error: (err) => {
                    console.log(err);
                    this.errorService.setError(err)
                    this.loadService.hideLoader()
                  },
                });
              } else {
                this.loadService.hideLoader()
              }
            },
            error: (err) => {
              console.log(err);
              this.errorService.setError(err)
              this.loadService.hideLoader()
            },
          });
        },
        error: (err) => {
          console.log('Error res ' + err);
          this.errorService.setError(err)
          this.loadService.hideLoader()
        },
      });
    }
  }

  deleteBid(id: string | undefined): void {
    this.apiService.deleteBid(id).subscribe(() => this.router.navigate(['/catalog']));
  }

  bidForItem(id: string | undefined, form: NgForm) {
    const { bidPrice } = form.value;

    if (this.currentUser?.objectId && this.selectedItem) {
      this.selectedItem.bids.push(this.currentUser?.objectId);
      this.selectedItem.price += bidPrice;
    }

    const data = {
      bids: this.selectedItem?.bids,
      price: this.selectedItem?.price
    }

    console.log(this.selectedItem);
    console.log(form.value)
    console.log(id)
    this.apiService.updateBidItem(id, data).subscribe(() => {
      alert('You succefully bidded for this item')
      this.hideBidForm();
    })
  }

  showBidForm() {
    this.showBidFormContainer = true;
  }

  hideBidForm() {
    this.showBidFormContainer = false;
  }
}

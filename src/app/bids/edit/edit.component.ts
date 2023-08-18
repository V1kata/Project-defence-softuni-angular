import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { LoaderService } from 'src/app/core/loader/loader.service';
import { DEFAULT_IMAGE_DOMAINS } from 'src/app/shared/constants';
import { BidItems } from 'src/app/types/BidItem';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  formData: BidItems | null = null;
  defaultType: string = 'sell';
  appImageValidator = DEFAULT_IMAGE_DOMAINS;
  id: string | null = '';

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private router: Router,
    private loaderService: LoaderService
  ) {}

  ngOnInit(): void {
    this.loaderService.showLoader()
    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id) {
      this.apiService.getSpecificBid(this.id).subscribe({
        next: (res) => {
          this.formData = res;
          this.defaultType = res.type.toLowerCase();
          this.loaderService.hideLoader();
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

  edit(form: NgForm) {
    if (form.invalid) {
      console.log('bad form');
      return;
    }

    const data = {
      ...form.value,
      author: {
        __type: 'Pointer',
        className: '_User',
        objectId: this.formData?.author.objectId,
      },
      bids: this.formData?.bids,
    };
    console.log(JSON.stringify(data));

    this.apiService.editBidItem(this.id!, data).subscribe({
      next: (res) => {
        this.router.navigate([`/details/${this.formData?.objectId}`]);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { BidItems } from 'src/app/types/BidItem';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  formData: BidItems | null = null;
  defaultType: string = 'sell';
  id: string | null = '';
  
  constructor(private route: ActivatedRoute, private apiService: ApiService, private router: Router) {}
  
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    
    if (this.id) {
      this.apiService.getSpecificBid(this.id).subscribe({
        next: (res) => {
          this.formData = res;
          this.defaultType = res.type.toLowerCase();
        },
        error: (err) => {
          console.log(err);
        }
      })
    }
  }

  edit(form: NgForm) {
    if (form.invalid) {
      console.log('bad form')
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

    this.apiService.updateBidItem(this.id!, data).subscribe({
      next: (res) => {
        this.router.navigate([`/details/${this.formData?.objectId}`])
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}

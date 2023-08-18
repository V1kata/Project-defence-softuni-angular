import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { LoaderService } from 'src/app/core/loader/loader.service';
import { BidItems } from 'src/app/types/BidItem';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css'],
})
export class CatalogComponent implements OnInit {
  posts: BidItems[] = [];
  constructor(private apiService: ApiService, private loaderService: LoaderService) {}

  ngOnInit(): void {
    this.loaderService.showLoader();
    this.apiService.getCatalog().subscribe((data: any) => {
      this.posts = data.results;
      this.loaderService.hideLoader()
    });
  }
}

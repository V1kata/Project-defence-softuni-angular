import { Component, OnInit } from '@angular/core';
import { LoaderService } from './core/loader/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isLoaderHidden = true;

  constructor(private loaderService: LoaderService) {}

  ngOnInit(): void {
    this.loaderService.showLoader();

    setTimeout(() => {
      this.isLoaderHidden = this.loaderService.isHidden;
    });
  }
}

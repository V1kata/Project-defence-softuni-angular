import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { ApiService } from 'src/app/api.service';
import { User } from 'src/app/types/User';
import { LoaderService } from 'src/app/core/loader/loader.service';
import { ErrorService } from 'src/app/core/error/error.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  creations: any = '';
  profile: User | undefined = undefined;
  constructor(
    private router: Router,
    private userService: UserService,
    private apiService: ApiService,
    private loaderService: LoaderService,
    private errorService: ErrorService
  ) {}

  ngOnInit(): void {
    this.loaderService.showLoader();
    this.profile = this.userService.user;
    this.apiService.getCatalog().subscribe({
      next: (res: any) => {
        this.creations = res.results.filter(
          (item: any) => item.author.objectId === this.profile?.objectId
        );
        this.loaderService.hideLoader();
      },
      error: (err) => {
        this.errorService.setError(err)
      }
    });
  }
}

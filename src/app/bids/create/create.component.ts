import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { DEFAULT_IMAGE_DOMAINS } from 'src/app/shared/constants';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent {
  defaultType: string = 'Sell';
  appImageValidator = DEFAULT_IMAGE_DOMAINS;
  
  @ViewChild('createForm') createForm: NgForm | undefined;

  constructor(
    private apiServise: ApiService,
    private router: Router,
    private userService: UserService
  ) {}

  submitHandler(): void {
    if (!this.createForm) {
      return;
    }

    const user = this.userService.user;
    const form = this.createForm;
    if (form.invalid) {
      console.log(form.invalid);
      console.log('bad form');
      return;
    }
    const data = {
      ...form.value,
      author: {
        __type: 'Pointer',
        className: '_User',
        objectId: user?.objectId,
      },
      bids: [],
    };

    this.apiServise.createBid(data).subscribe({
      next: (res: any) => {
        user?.posts.push(res.objectId);
        const posts = { posts: user?.posts };
        this.userService
          .createBidUser(user?.objectId, posts, user?.sessionToken)
          .subscribe(() => this.router.navigate(['/catalog']));
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}

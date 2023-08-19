import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DEFAULT_EMAIL_DOMAINS } from 'src/app/shared/constants';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { ErrorService } from 'src/app/core/error/error.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  appEmailDomains = DEFAULT_EMAIL_DOMAINS;
  showPass: boolean = false;

  constructor(
    private userService: UserService,
    private router: Router,
    private errorService: ErrorService
  ) {}

  login(form: NgForm): void {
    if (form.invalid) {
      console.log('bad form');
      return;
    }
    const { username, password } = form.value;

    this.userService.login(username, password).subscribe({
      next: (res) => {
        this.router.navigate(['/catalog']);
      },
      error: (err) => {
        console.log(err);
        this.errorService.setError(err);
      },
    });
  }

  showPassword(): void {
    this.showPass = !this.showPass;
  }

  toggleShowPassword(id: string) {
    const inputField = document.querySelector(`#${id}`) as HTMLInputElement;

    if (inputField) {
      inputField.type = this.showPass ? 'password' : 'text';
      this.showPassword();
    }
  }
}

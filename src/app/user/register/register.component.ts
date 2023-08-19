import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DEFAULT_EMAIL_DOMAINS, DEFAULT_IMAGE_DOMAINS } from 'src/app/shared/constants';
import { appEmailValidator } from 'src/app/shared/validators/app-email-validator';
import { appImageValidator } from 'src/app/shared/validators/app-image-validator';
import { matchPassValidator } from 'src/app/shared/validators/match-password-validator';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { appPasswordValidator } from 'src/app/shared/validators/app-password-validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  showPass: boolean = false;
  error: string = ''
  form = this.fb.group({
    username: ['', Validators.required],
    email: ['', [Validators.required, appEmailValidator(DEFAULT_EMAIL_DOMAINS)]],
    image: ['', [Validators.required, appImageValidator(DEFAULT_IMAGE_DOMAINS)]],
    passGroup: this.fb.group({
      password: ['', [Validators.required, Validators.minLength(4), appPasswordValidator()]],
      rePass: ['', [Validators.required]],
    },
    {
      validators: [matchPassValidator('password', 'rePass')]
    }),
  });
  constructor(private fb: FormBuilder, private userServise: UserService, private router: Router) {}

  register(): void {
    if (this.form.invalid) {
      console.log('bad form')
      return;
    }

    const { username, email, image, passGroup } = this.form.value;
    
    this.userServise.register(username!, email!, image!, passGroup?.password!).subscribe({
      next: (res) => {
        console.log(res)
        this.router.navigate(['/login'])
      },
      error: (err) => {
        console.log(err)
      }
    });
  }

  showPassword(): void {
    this.showPass = !this.showPass;
  }

  toggleShowPassword(id: string) {
    const inputField = document.querySelector(`#${id}`) as HTMLInputElement;
    console.log(this.showPass)

    if (inputField) {
      inputField.type = this.showPass ? 'password' : 'text';
      this.showPassword();
    }
  }
}

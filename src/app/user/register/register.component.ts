import { Component } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { DEFAULT_EMAIL_DOMAINS, DEFAULT_IMAGE_DOMAINS } from 'src/app/shared/constants';
import { appEmailValidator } from 'src/app/shared/validators/app-email-validator';
import { appImageValidator } from 'src/app/shared/validators/app-image-validator';
import { matchPassValidator } from 'src/app/shared/validators/match-password-validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  form = this.fb.group({
    username: ['', Validators.required, Validators.minLength(4)],
    email: ['', [Validators.required, appEmailValidator(DEFAULT_EMAIL_DOMAINS)]],
    image: ['', [Validators.required, appImageValidator(DEFAULT_IMAGE_DOMAINS)]],
    passGroup: this.fb.group({
      password: ['', [Validators.required, Validators.minLength(4)]],
      rePass: ['', [Validators.required]],
    },
    {
      validators: [matchPassValidator('password', 'rePass')]
    }),
  });
  constructor(private fb: FormBuilder) {}

  register(): void {
    if (this.form.invalid) {
      console.log('bad form')
      return;
    }
  }
}

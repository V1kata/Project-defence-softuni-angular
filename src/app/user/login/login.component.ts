import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DEFAULT_EMAIL_DOMAINS } from 'src/app/shared/constants';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  appEmailDomains = DEFAULT_EMAIL_DOMAINS;

  constructor(private userService: UserService, private router: Router) {}
  
  login(form: NgForm): void {
    if (form.invalid) {
      console.log('bad form');
      return
    }
    const { username, password } = form.value;

    this.userService.login(username, password).subscribe(() => {
      this.router.navigate(['/catalog'])
    })
  }
}

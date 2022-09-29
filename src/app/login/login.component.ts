import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  error = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: [''],
      password: [''],
    });
  }

  login() {
    this.authService
      .authenticate(this.loginForm.value)
      .subscribe(({ isAuthenticated }) => {
        if (isAuthenticated) {
          this.authService.isAuthenticated = true;
          this.loginForm.reset();
          this.router.navigate(['dashboard']);
        } else {
          this.error = true;
          setTimeout(() => {
            this.error = false;
          }, 5000);
        }
      });
  }
}

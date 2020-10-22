import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  isLoading = false;
  error: string = null;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onSwitchMode() {
    this.isLoginMode = ! this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.isLoading = true;
    if (this.isLoginMode) {
      this.authService.login(email, password).subscribe(data => {
        this.router.navigate(['/recipes']);
        this.isLoading = false;
      }, error => {
        this.error = error;
        this.isLoading = false;
      })
    } else {
      this.authService.signUp(email, password).subscribe(data => {
        this.router.navigate(['/recipes']);
        this.isLoading = false;
      }, error => {
        this.error = error;
        this.isLoading = false;
      })
    }

    form.reset();
  }

  onClose() {
    this.error = null;
  }

}

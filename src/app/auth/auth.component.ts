import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';
import { Store } from '@ngrx/store';
import { Subscriber, Subscription } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {
  isLoginMode = true;
  isLoading = false;
  error: string = null;
  subscription: Subscription;

  constructor(private authService: AuthService, private router: Router, private store: Store<fromApp.AppState>) { }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  ngOnInit() {
    this.subscription = this.store.select('auth').subscribe(authData => {
      this.isLoading = authData.loading;
      this.error = authData.authError;
    })
  }

  onSwitchMode() {
    this.isLoginMode = ! this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.isLoading = true;
    if (this.isLoginMode) {
      this.store.dispatch(new AuthActions.LoginStart({email, password}))
      // this.authService.login(email, password).subscribe(data => {
      //   this.router.navigate(['/recipes']);
      //   this.isLoading = false;
      // }, error => {
      //   this.error = error;
      //   this.isLoading = false;
      // })
    } else {
      // this.authService.signUp(email, password).subscribe(data => {
      //   this.router.navigate(['/recipes']);
      //   this.isLoading = false;
      // }, error => {
      //   this.error = error;
      //   this.isLoading = false;
      // })
      this.store.dispatch(new AuthActions.SignupStart({email, password}))
    }

    form.reset();
  }

  onClose() {
    this.store.dispatch(new AuthActions.ClearError());
  }

}

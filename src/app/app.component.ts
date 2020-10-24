import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from './_services/auth.service';
import * as fromAPP from './store/app.reducer';
import * as AuthActions from './auth/store/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private authService: AuthService, private store: Store<fromAPP.AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(new AuthActions.AutoLogin());
    // this.authService.autoLogin();
  }
}

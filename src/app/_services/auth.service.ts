import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { User } from '../auth/user.model';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.actions';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router, private store: Store<fromApp.AppState>) {}

  setLogoutTimer(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.store.dispatch(new AuthActions.Logout());
    }, expirationDuration);
  }

  clearLogoutTimer() {
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
      this.tokenExpirationTimer = null;
    }
  }

  // logout() {
  //   // this.user.next(null);
  //   this.store.dispatch(new AuthActions.Logout());
  //   this.router.navigate(['/auth']);
  //   localStorage.clear();
  //   if(this.tokenExpirationTimer) {
  //     clearTimeout(this.tokenExpirationTimer)
  //   }
  //   this.tokenExpirationTimer = null;
  // }

  // autoLogin() {
  //   const userData: {
  //     email: string;
  //     id: string;
  //     _token: string;
  //     _tokenExpirationDate: string;
  //   } = JSON.parse(localStorage.getItem('userData'));
  //   if (!userData) {
  //     return;
  //   }
  //   const loadedUser = new User(
  //     userData.email,
  //     userData.id,
  //     userData._token,
  //     new Date(userData._tokenExpirationDate)
  //   );

  //   if (loadedUser.token) {
  //     this.store.dispatch(new AuthActions.AuthSuccess(loadedUser));
  //     // this.user.next(loadedUser)
  //     const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime()
  //     this.setLogoutTimer(expirationDuration);
  //   }
  // }

  // private handleAuthentication(
  //   email: string,
  //   userId,
  //   token: string,
  //   expiresIn: number
  // ) {
  //   const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);
  //   const user = new User(email, userId, token, expirationDate);
  //   this.store.dispatch(new AuthActions.AuthSuccess(user));
  //   // this.user.next(user);
  //   this.autoLogout(expiresIn * 1000)
  //   localStorage.setItem('userData', JSON.stringify(user));
  // }

  // private handleError(errorRes: HttpErrorResponse) {
  //   let errorMsg = 'An unknown error occured';
  //   if (!errorRes.error || !errorRes.error.error) {
  //     return throwError(errorMsg);
  //   }
  //   switch (errorRes.error.error.message) {
  //     case 'EMAIL_EXISTS':
  //       errorMsg = 'This email already exists';
  //       break;
  //     case 'EMAIL_NOT_FOUND':
  //       errorMsg = 'Email doesnt exist';
  //       break;
  //     case 'INVALID_PASSWORD':
  //       errorMsg = 'Password is invalid';
  //       break;
  //   }
  //   return throwError(errorMsg);
  // }

  // signUp(email: string, password: string) {
  //   return this.http
  //     .post<AuthResponseData>(
  //       'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseApiKey,
  //       {
  //         email,
  //         password,
  //         returnSecureToken: true,
  //       }
  //     )
  //     .pipe(
  //       catchError(this.handleError),
  //       tap((resData) => {
  //         this.handleAuthentication(
  //           resData.email,
  //           resData.localId,
  //           resData.idToken,
  //           +resData.expiresIn
  //         );
  //       })
  //     );
  // }

  // login(email: string, password: string) {
  //   return this.http
  //     .post<AuthResponseData>(
  //       'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseApiKey,
  //       {
  //         email,
  //         password,
  //         returnSecureToken: true,
  //       }
  //     )
  //     .pipe(
  //       catchError(this.handleError),
  //       tap((resData) => {
  //         this.handleAuthentication(
  //           resData.email,
  //           resData.localId,
  //           resData.idToken,
  //           +resData.expiresIn
  //         );
  //       })
  //     );
  // }
}

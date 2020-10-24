import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/_services/auth.service';
import { environment } from 'src/environments/environment';
import { User } from '../user.model';
import * as AuthActions from './auth.actions';

interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

const handleSuccess = (resData) => {
  const expirationDate = new Date(
    new Date().getTime() + +resData.expiresIn * 1000
  );
  const user = new User(
    resData.email,
    resData.localId,
    resData.idToken,
    expirationDate
  );
  localStorage.setItem('userData', JSON.stringify(user));
  return new AuthActions.AuthSuccess(user);
};

const handleError = (errorRes) => {
  let errorMsg = 'An unknown error occured';
  if (!errorRes.error || !errorRes.error.error) {
    return of(new AuthActions.AuthFail(errorMsg));
  }
  switch (errorRes.error.error.message) {
    case 'EMAIL_EXISTS':
      errorMsg = 'This email already exists';
      break;
    case 'EMAIL_NOT_FOUND':
      errorMsg = 'Email doesnt exist';
      break;
    case 'INVALID_PASSWORD':
      errorMsg = 'Password is invalid';
      break;
  }
  return of(new AuthActions.AuthFail(errorMsg));
};

@Injectable()
export class AuthEffects {
  // will only trigger when action is login start
  // effect observables cant die so we shouldnt return an error
  // of creates new observables
  // map creates an observable automatically
  @Effect()
  authLogin = this.actions$.pipe(
    ofType(AuthActions.LOGIN_START),
    switchMap((authData: AuthActions.LoginStart) => {
      return this.http
        .post<AuthResponseData>(
          'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
            environment.firebaseApiKey,
          {
            email: authData.payload.email,
            password: authData.payload.password,
            returnSecureToken: true,
          }
        )
        .pipe(
          tap((resData) =>
            this.authService.setLogoutTimer(+resData.expiresIn * 1000)
          ),
          map((resData) => {
            return handleSuccess(resData);
          }),
          catchError((errorRes) => {
            return handleError(errorRes);
          })
        );
    })
  );

  // doesnt yield a dispatchable action
  @Effect({ dispatch: false })
  authRedirect = this.actions$.pipe(
    ofType(AuthActions.AUTH_SUCCESS),
    tap((data) => {
      this.router.navigate(['/']);
    })
  );

  @Effect({ dispatch: false })
  logOut = this.actions$.pipe(
    ofType(AuthActions.LOGOUT),
    tap((data) => {
        this.authService.clearLogoutTimer()
        this.router.navigate(['/auth']);
        localStorage.clear();
    })
  );

  @Effect()
  autoLogin = this.actions$.pipe(
    ofType(AuthActions.AUTO_LOGIN),
    map(() => {
      const userData: {
        email: string;
        id: string;
        _token: string;
        _tokenExpirationDate: string;
      } = JSON.parse(localStorage.getItem('userData'));
      if (!userData) {
        return { type: 'DUMMY' };
      }
      const loadedUser = new User(
        userData.email,
        userData.id,
        userData._token,
        new Date(userData._tokenExpirationDate)
      );

      if (loadedUser.token) {
        const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
        this.authService.setLogoutTimer(expirationDuration);
        return new AuthActions.AuthSuccess(loadedUser);
        //  this.autoLogout(expirationDuration);
      }
      return { type: 'DUMMY' };
    })
  );

  @Effect()
  authSignup = this.actions$.pipe(
    ofType(AuthActions.SIGNUP_START),
    switchMap((authData: AuthActions.SignupStart) => {
      return this.http
        .post<AuthResponseData>(
          'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +
            environment.firebaseApiKey,
          {
            email: authData.payload.email,
            password: authData.payload.password,
            returnSecureToken: true,
          }
        )
        .pipe(
          tap((resData) =>
            this.authService.setLogoutTimer(+resData.expiresIn * 1000)
          ),
          map((resData) => {
            return handleSuccess(resData);
          }),
          catchError((errorRes) => {
            return handleError(errorRes);
          })
        );
    })
  );

  // actions is an observable
  // after this is complete we can dispatch other actions
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}
}

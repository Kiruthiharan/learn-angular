import { Action } from '@ngrx/store';
import { User } from '../user.model';

export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const LOGOUT = 'LOGOUT';
export const LOGIN_START = 'LOGIN_START';
export const AUTH_FAIL = 'AUTH_FAIL';
export const CLEAR_ERROR = 'CLEAR_ERROR';
export const SIGNUP_START = 'SIGNUP_START';
export const AUTO_LOGIN = 'AUTO_LOGIN';

export class AuthSuccess implements Action {
    readonly type: string = AUTH_SUCCESS;
   constructor(public payload: User) {}
}

export class Logout implements Action {
    readonly type: string = LOGOUT;
}

export class ClearError implements Action {
    readonly type: string = CLEAR_ERROR;
}

export class AuthFail implements Action {
    readonly type: string = AUTH_FAIL;

    constructor(private payload: string) {}
}

export class LoginStart implements Action {
    readonly type: string = LOGIN_START;
   constructor(public payload: {email: string, password: string}) {}
}

export class SignupStart implements Action {
    readonly type: string = SIGNUP_START;
   constructor(public payload: {email: string, password: string}) {}
}

export class AutoLogin implements Action {
    readonly type: string = AUTO_LOGIN;
}



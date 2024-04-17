
import { AuthState } from "../models/authState.interface";
import * as AuthActions from '../actions/auth.actions';
import { Action, createReducer,on } from "@ngrx/store";
import { AuthDTO } from "../models/auth.dto";

export const initialState: AuthState = { credentials: new AuthDTO("","","",""), loading: false, loaded: false, error: null };



const authReducer = createReducer(
    initialState,
    on(AuthActions.setUserCredentials, (state, { credentials }) => ({ ...state, credentials: credentials })),
    on(AuthActions.clearUserCredentials, state => ({ ...state, credentials: null })),
    on(AuthActions.loadUserCredentials, state => ({ ...state, loading: true, error: null })),
);

export function reducer(state: AuthState | undefined, action: Action) {
    return authReducer(state, action);
  }
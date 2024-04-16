import { createAction, props } from "@ngrx/store";
import { AuthState } from "../models/authState.interface";

export const autho = createAction(
    '[Auth] Cheking Auth',
    props<AuthState>()
)
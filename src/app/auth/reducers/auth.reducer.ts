import { Action } from "rxjs/internal/scheduler/Action";
import { AuthDTO } from "../models/auth.dto";
import { AuthState } from "../models/authState.interface";

export const initialState: AuthDTO = new AuthDTO('', '', '', '');

// const _authReducer = createReducer(
//     initialState,
//     on(autho, (state, { credentials }) => { }
//     ));

export function checkAuth(state: AuthState, action: Action) {

    switch (action.type) {
        case 'autho':
            return state;
        default:
            return state;
    }
    
}
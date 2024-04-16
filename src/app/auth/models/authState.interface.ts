import { AuthDTO } from "./auth.dto";

export interface AuthState {
    credentials: AuthDTO;
    loading: boolean;
    loaded: boolean;
    error: any;

}
import { AuthDTO } from "./auth.dto";

export interface AuthState {
    credentials: AuthDTO|null;
    loading: boolean;
    loaded: boolean;
    error: any;

}
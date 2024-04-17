import { createAction, props } from "@ngrx/store";
import { AuthDTO } from "../models/auth.dto";

export const setUserCredentials = createAction('[Auth] Creando credenciales', props<{ credentials: AuthDTO }>());
export const clearUserCredentials = createAction('[Auth] Limpiando credenciales');
export const loadUserCredentials = createAction('[Auth] Cargando credenciales');
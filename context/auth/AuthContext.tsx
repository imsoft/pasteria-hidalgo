import { createContext } from "react";
import { Usuario } from "../../interfaces";

interface ContextProps {
  isLoggedIn: boolean;
  user?: Usuario;

  loginUser: (
    correoElectronico: string,
    contrasenia: string
  ) => Promise<boolean>;

  regiterUser: (
    nombre: string,
    correoElectronico: string,
    contrasenia: string,
    role: string,
    sucursalOFranquicia: string,
    nombreSucursalOFranquicia: string
  ) => Promise<{
    hasError: boolean;
    message?: string;
  }>;

  logout: () => void;
}

export const AuthContext = createContext({} as ContextProps);

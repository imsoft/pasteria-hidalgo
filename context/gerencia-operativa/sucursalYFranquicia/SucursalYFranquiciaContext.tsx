import { createContext } from "react";
import { SucursalYFranquicia } from "../../../interfaces";

interface ContextProps {
  sucursalesYFranquicias: SucursalYFranquicia[];

  //Métodos
  agregarSucursalYFranquicia: (
    direccion: string,
    distancia: string,
    showNotificacion?: boolean
  ) => void;

  actualizarSucursalYFranquicia: (
    sucursalYFranquicia: SucursalYFranquicia,
    showNotificacion?: boolean
  ) => void;

  eliminarSucursalYFranquicia: (
    sucursalYFranquicia: SucursalYFranquicia,
    showNotificacion?: boolean
  ) => void;
}

export const SucursalesYFranquiciasContext = createContext({} as ContextProps);

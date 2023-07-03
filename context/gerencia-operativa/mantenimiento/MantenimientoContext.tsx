import { createContext } from "react";
import { Mantenimiento } from "../../../interfaces";

interface ContextProps {
  mantenimientos: Mantenimiento[];

  //Métodos
  agregarNuevoMantenimiento: (
    sucursalOFranquicia: string,
    nombreSucursalOFranquicia: string,
    nombreMaquina: string,
    proveedor: string,
    fechaDeGarantia: string,
    fechaDeMantenimiento: string,
    modificacionDeMantenimiento: string,
    showNotificacion?: boolean
  ) => void;

  actualizarMantenimiento: (
    mantenimiento: Mantenimiento,
    showNotificacion?: boolean
  ) => void;

  eliminarMantenimiento: (
    mantenimiento: Mantenimiento,
    showNotificacion?: boolean
  ) => void;

  refreshMantenimientos: () => Promise<void>;
}

export const MantenimientosContext = createContext({} as ContextProps);

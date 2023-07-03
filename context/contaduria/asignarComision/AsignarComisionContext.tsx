import { createContext } from "react";
import { AsignarComision } from "../../../interfaces";

interface ContextProps {
  asignarComisiones: AsignarComision[];

  //Métodos
  agregarNuevoAsignarComision: (
    sucursalOFranquicia: string,
    nombreSucursalOFranquicia: string,
    mes: string,
    anio: string,
    minimoDeLaMeta: number,
    showNotification?: boolean
  ) => void;

  actualizarAsignarComision: (
    asignarComision: AsignarComision,
    showNotificacion?: boolean
  ) => void;

  eliminarAsignarComision: (
    asignarComision: AsignarComision,
    showNotificacion?: boolean
  ) => void;

  refreshAsignarComision: () => Promise<void>;
}

export const AsignarComisionContext = createContext({} as ContextProps);

import { createContext } from "react";
import { AsignarComision } from "../../../interfaces/asignarComision";

interface ContextProps {
  asignarComisiones: AsignarComision[];

  //Métodos
  agregarNuevoAsignarComision: (
    sucursalOFranquicia: string,
    minimoDeLaMeta: number,
    sucursales?: string,
    franquicias?: string,
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
}

export const AsignarComisionContext = createContext({} as ContextProps);

import { createContext } from "react";
import { AsignarPrecio } from "../../../interfaces";

interface ContextProps {
  asignarPrecios: AsignarPrecio[];

  //Métodos
  agregarNuevoAsignarPrecio: (
    producto: string,
    precioMaximo: string,
    showNotificacion?: boolean
  ) => void;

  actualizarAsignarPrecio: (
    asignarPrecio: AsignarPrecio,
    showNotificacion?: boolean
  ) => void;

  eliminarAsignarPrecio: (
    asignarPrecio: AsignarPrecio,
    showNotificacion?: boolean
  ) => void;
}

export const AsignarPreciosContext = createContext({} as ContextProps);

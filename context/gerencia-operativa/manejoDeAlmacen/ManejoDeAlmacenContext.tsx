import { createContext } from "react";
import { ManejoDeAlmacen } from "../../../interfaces";

interface ContextProps {
  manejosDeAlmacen: ManejoDeAlmacen[];

  //Métodos
  agregarNuevoManejoDeAlmacen: (
    materiaPrima: string,
    unidades: string,
    temperatura: string,
    cantidad: number,
    showNotificacion?: boolean
  ) => void;

  actualizarManejoDeAlmacen: (
    manejoDeAlmacen: ManejoDeAlmacen,
    showNotificacion?: boolean
  ) => void;

  eliminarManejoDeAlmacen: (
    manejoDeAlmacen: ManejoDeAlmacen,
    showNotificacion?: boolean
  ) => void;
}

export const ManejosDeAlmacenContext = createContext({} as ContextProps);

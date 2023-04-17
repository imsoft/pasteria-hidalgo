import { createContext } from "react";
import { ListaManejoDeAlmacen } from "../../../interfaces";

interface ContextProps {
  manejosDeAlmacen: ListaManejoDeAlmacen[];

  //Métodos
  agregarNuevoManejoDeAlmacen: (
    listaManejoDeAlmacen: ListaManejoDeAlmacen[],
    showNotificacion?: boolean
  ) => void;

  actualizarManejoDeAlmacen: (
    manejoDeAlmacen: ListaManejoDeAlmacen,
    showNotificacion?: boolean
  ) => void;

  eliminarManejoDeAlmacen: (
    manejoDeAlmacen: ListaManejoDeAlmacen,
    showNotificacion?: boolean
  ) => void;
}

export const ManejosDeAlmacenContext = createContext({} as ContextProps);

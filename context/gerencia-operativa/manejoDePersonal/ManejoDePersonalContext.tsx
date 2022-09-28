import { createContext } from "react";
import { ManejoPersonal } from '../../../interfaces';

interface ContextProps {
  manejosDePersonal: ManejoPersonal[];

  //Métodos
  agregarNuevoManejoDePersonal: (
    nombre: string,
    descripcionDelPuesto: string,
    showNotificacion?: boolean
  ) => void;

  actualizarManejoDePersonal: (
    manejoDePersonal: ManejoPersonal,
    showNotificacion?: boolean
  ) => void;
  
  eliminarManejoDePersonal: (manejoDePersonal: ManejoPersonal, showNotificacion?: boolean) => void;
}

export const ManejosDePersonalContext = createContext({} as ContextProps);

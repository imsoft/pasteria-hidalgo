import { createContext } from "react";
import { PersonalDeMantenimiento } from "../../../interfaces";

interface ContextProps {
  personalesDeMantenimiento: PersonalDeMantenimiento[];

  //Métodos
  agregarNuevoPersonalDeMantenimiento: (
    nombre: string,
    oficio: string,
    direccion: string,
    telefono: string,
    showNotificacion?: boolean
  ) => void;

  actualizarPersonalDeMantenimiento: (
    personalDeMantenimiento: PersonalDeMantenimiento,
    showNotificacion?: boolean
  ) => void;

  eliminarPersonalDeMantenimiento: (
    personalDeMantenimiento: PersonalDeMantenimiento,
    showNotificacion?: boolean
  ) => void;
}

export const PersonalesDeMantenimientoContext = createContext(
  {} as ContextProps
);

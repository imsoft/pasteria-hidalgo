import { createContext } from "react";
import { CheckInPersonal } from "../../../interfaces";

interface ContextProps {
  checksInPersonal: CheckInPersonal[];

  //Métodos
  agregarCheckInPersonal: (
    franquicias: string,
    sucursales: string,
    nombre: string,
    fecha: string,
    horaDeIngreso: string,
    horaDeSalida: string,
    sucursalOFranquicia: string,
    showNotificacion?: boolean
  ) => void;

  actualizarCheckInPersonal: (
    candidato: CheckInPersonal,
    showNotificacion?: boolean
  ) => void;

  eliminarCheckInPersonal: (
    checksInPersonal: CheckInPersonal,
    showNotificacion?: boolean
  ) => void;
}

export const CheckInPersonalContext = createContext({} as ContextProps);

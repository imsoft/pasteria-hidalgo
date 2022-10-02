import { createContext } from "react";
import { CheckInPersonal } from "../../../interfaces";

interface ContextProps {
  checksInPersonal: CheckInPersonal[];

  //Métodos
  agregarCheckInPersonal: (
    idFranquicia: string,
    idSucursal: string,
    nombre: string,
    fecha: string,
    idPersonal: string,
    horaDeIngreso: string,
    horaDeSalida: string,
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

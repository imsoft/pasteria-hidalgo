import { createContext } from "react";
import { ApartadoJuridico } from "../../../interfaces";

interface ContextProps {
  apartadosJuridicos: ApartadoJuridico[];

  //Métodos
  agregarNuevoApartadoJuridico: (
    sucursalOFranquicia: string,
    nombreSucursalOFranquicia: string,
    nombreDelArchivo: string,
    urlDelArchivo: string,
    showNotificacion?: boolean
  ) => void;

  actualizarApartadoJuridico: (
    apartadoJuridico: ApartadoJuridico,
    showNotificacion?: boolean
  ) => void;

  eliminarApartadoJuridico: (
    apartadoJuridico: ApartadoJuridico,
    showNotificacion?: boolean
  ) => void;

  refreshApartadosJuridicos: () => Promise<void>;
}

export const ApartadosJuridicosContext = createContext({} as ContextProps);

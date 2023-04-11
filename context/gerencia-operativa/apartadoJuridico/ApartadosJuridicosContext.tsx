import { createContext } from "react";
import { ApartadoJuridico } from "../../../interfaces";

interface ContextProps {
  apartadosJuridicos: ApartadoJuridico[];

  //Métodos
  agregarNuevoApartadoJuridico: (
    sucursalOFranquicia: string,
    nombreSucursalOFranquicia: string,
    documento: string,
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
}

export const ApartadosJuridicosContext = createContext({} as ContextProps);

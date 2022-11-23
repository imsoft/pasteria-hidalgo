import { createContext } from "react";
import { ClienteFrecuente } from "../../../interfaces";

interface ContextProps {
  clientesFrecuentes: ClienteFrecuente[];

  //Métodos
  agregarClienteFrecuente: (
    nombre: string,
    correoElectronico: string,
    fechaDeNacimiento: string,
    puntosDeCompra: number,
    showNotificacion?: boolean
  ) => void;

  actualizarClienteFrecuente: (
    clienteFrecuente: ClienteFrecuente,
    showNotificacion?: boolean
  ) => void;

  eliminarClienteFrecuente: (
    clienteFrecuente: ClienteFrecuente,
    showNotificacion?: boolean
  ) => void;
}

export const ClientesFrecuentesContext = createContext({} as ContextProps);

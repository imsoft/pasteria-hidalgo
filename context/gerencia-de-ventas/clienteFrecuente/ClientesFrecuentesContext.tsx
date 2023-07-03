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
    sucursalOFranquicia: string,
    nombreSucursalOFranquicia: string,
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

  refreshClientesFrecuentes: () => Promise<void>;
}

export const ClientesFrecuentesContext = createContext({} as ContextProps);

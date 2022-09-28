import { createContext } from "react";
import { ClienteFrecuente } from "../../../interfaces/clienteFrecuente";

interface ContextProps {
  clientesFrecuentes: ClienteFrecuente[];

  //Métodos
  agregarClienteFrecuente: (
    nombre: string,
    correoElectronico: string,
    fechaDeNacimiento: string,
    showNotificacion?: boolean
  ) => void;

  actualizarClienteFrecuente: (
    candidato: ClienteFrecuente,
    showNotificacion?: boolean
  ) => void;

  eliminarClienteFrecuente: (
    candidato: ClienteFrecuente,
    showNotificacion?: boolean
  ) => void;
}

export const ClientesFrecuentesContext = createContext({} as ContextProps);

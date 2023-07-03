import { createContext } from "react";
import { PersonalActivo } from "../../../interfaces";

interface ContextProps {
  personasActivas: PersonalActivo[];

  //Métodos
  agregarPersonalActivo: (
    nombre: string,
    puesto: string,
    fechaDeContratacion: string,
    noContrato: string,
    noExpediente: string,
    bajaTemporal: string,
    comentarios: string,
    showNotification?: boolean
  ) => void;

  actualizarPersonalActivo: (
    personalActivo: PersonalActivo,
    showNotification?: boolean
  ) => void;

  eliminarPersonalActivo: (
    personalActivo: PersonalActivo,
    showNotification?: boolean
  ) => void;

  refreshPersonalActivo: () => Promise<void>;
}

export const PersonalActivoContext = createContext({} as ContextProps);

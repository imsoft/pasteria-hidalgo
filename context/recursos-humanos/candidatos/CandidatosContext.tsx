import { createContext } from "react";
import { Candidato } from "../../../interfaces";

interface ContextProps {
  candidatos: Candidato[];

  //Métodos
  agregarNuevoCandidato: (
    nombre: string,
    puesto: string,
    descripcionDelPuesto: string,
    fechaDeNacimiento: string,
    domicilio: string,
    curp: string,
    noImss: string,
    noCartaDePolicia: string,
    showNotificacion?: boolean
  ) => void;

  actualizarCandidato: (
    candidato: Candidato,
    showNotificacion?: boolean
  ) => void;

  eliminarCandidato: (
    candidato: Candidato,
    showNotificacion?: boolean
  ) => void;
}

export const CandidatosContext = createContext({} as ContextProps);

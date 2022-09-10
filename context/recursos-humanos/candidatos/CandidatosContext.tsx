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
    noCartaDePolicia: string
  ) => void;

  actualizarCandidato: (candidato: Candidato) => void;
  eliminarCandidato: (candidato: Candidato) => void;

  // No hacer caso por el momento
  // actualizarCandidato: (candidato: Candidato, showSnackbar?: boolean) => void;
  // eliminarCandidato: (candidato: Candidato, showSnackbar?: boolean) => void;
}

export const CandidatosContext = createContext({} as ContextProps);

import { createContext } from 'react';
import { Candidato } from '../../../interfaces';

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
}

export const CandidatosContext = createContext({} as ContextProps);

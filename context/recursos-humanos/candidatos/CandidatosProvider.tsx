import { FC, ReactNode, useEffect, useReducer } from "react";

import { entriesApi } from "../../../apis";
import { Candidato } from "../../../interfaces";
import { CandidatosContext, candidatosReducer } from ".";

export interface CandidatosState {
  candidatos: Candidato[];
}

const Candidatos_INITIAL_STATE: CandidatosState = {
  candidatos: [],
};

interface Props {
  children: ReactNode;
}

export const CandidatosProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(
    candidatosReducer,
    Candidatos_INITIAL_STATE
  );

  const agregarNuevoCandidato = async (
    nombre: string,
    puesto: string,
    descripcionDelPuesto: string,
    fechaDeNacimiento: string,
    domicilio: string,
    curp: string,
    noImss: string,
    noCartaDePolicia: string
  ) => {
    const { data } = await entriesApi.post<Candidato>("/candidatos", {
      nombre,
      puesto,
      descripcionDelPuesto,
      fechaDeNacimiento,
      domicilio,
      curp,
      noImss,
      noCartaDePolicia,
    });
    dispatch({ type: "[Candidato] Agregar-Candidato", payload: data });
  };

  const refreshCandidatos = async () => {
    const { data } = await entriesApi.get<Candidato[]>("/candidatos");
    console.log(data);
    dispatch({ type: "[Candidato] Refrescar-Datos", payload: data });
  };

  useEffect(() => {
    refreshCandidatos();
  }, []);

  return (
    <CandidatosContext.Provider
      value={{
        ...state,

        //Methods
        agregarNuevoCandidato,
      }}
    >
      {children}
    </CandidatosContext.Provider>
  );
};

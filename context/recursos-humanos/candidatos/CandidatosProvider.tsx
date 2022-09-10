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

  const eliminarCandidato = async (candidato: Candidato) => {
    try {
      const { data } = await entriesApi.delete<Candidato>(
        `/candidatos/${candidato._id}`
      );

      dispatch({
        type: "[Candidato] Eliminar-Candidato",
        payload: data,
      });
    } catch (error) {
      console.log({ error });
    }
  };

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
    try {
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
    } catch (error) {
      console.log({ error });
    }
  };

  const actualizarCandidato = async ({
    _id,
    nombre,
    puesto,
    descripcionDelPuesto,
    fechaDeNacimiento,
    domicilio,
    curp,
    noImss,
    noCartaDePolicia,
  }: Candidato) => {
    try {
      const { data } = await entriesApi.put<Candidato>(`/candidatos/${_id}`, {
        nombre,
        puesto,
        descripcionDelPuesto,
        fechaDeNacimiento,
        domicilio,
        curp,
        noImss,
        noCartaDePolicia,
      });
      dispatch({ type: "[Candidato] Actualizar-Candidato", payload: data });
    } catch (error) {
      console.log({ error });
    }
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
        actualizarCandidato,
        eliminarCandidato,
      }}
    >
      {children}
    </CandidatosContext.Provider>
  );
};

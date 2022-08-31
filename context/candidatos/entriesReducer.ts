import { Candidato } from "../../interfaces";
import { CandidatosState } from "./CandidatosProvider";

type CandidatosActionType =
  | { type: "[Candidato] Agregar-Candidato"; payload: Candidato }
  | { type: "[Candidato] Actualizar-Candidato"; payload: Candidato }
  | { type: "[Candidato] Refrescar-Datos"; payload: Candidato[] };

export const candidatosReducer = (
  state: CandidatosState,
  action: CandidatosActionType
): CandidatosState => {
  switch (action.type) {
    case "[Candidato] Agregar-Candidato":
      return {
        ...state,
        candidatos: [...state.candidatos, action.payload],
      };

    case "[Candidato] Actualizar-Candidato":
      return {
        ...state,
        candidatos: state.candidatos.map((candidato) => {
          if (candidato.curp === action.payload.curp) {
            candidato.curp = action.payload.curp;
            candidato.descripcionDelPuesto =
              action.payload.descripcionDelPuesto;
            candidato.domicilio = action.payload.domicilio;
            candidato.fechaDeNacimiento = action.payload.fechaDeNacimiento;
            candidato.noCartaDePolicia = action.payload.noCartaDePolicia;
            candidato.noImss = action.payload.noImss;
            candidato.nombre = action.payload.nombre;
            candidato.puesto = action.payload.puesto;
          }
          return candidato;
        }),
      };

    case "[Candidato] Refrescar-Datos":
      return {
        ...state,
        candidatos: [...action.payload],
      };

    default:
      return state;
  }
};

import { Candidato } from "../../../interfaces";
import { CandidatosState } from "./CandidatosProvider";

type CandidatosActionType =
  | { type: "[Candidato] Agregar-Candidato"; payload: Candidato }
  | { type: "[Candidato] Actualizar-Candidato"; payload: Candidato }
  | { type: "[Candidato] Refrescar-Datos"; payload: Candidato[] }
  | { type: "[Candidato] Eliminar-Candidato"; payload: Candidato };

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
          if (candidato._id === action.payload._id) {
            candidato.nombre = action.payload.nombre;
            candidato.puesto = action.payload.puesto;
            candidato.descripcionDelPuesto = action.payload.descripcionDelPuesto;
            candidato.fechaDeNacimiento = action.payload.fechaDeNacimiento;
            candidato.domicilio = action.payload.domicilio;
            candidato.curp = action.payload.curp;
            candidato.noImss = action.payload.noImss;
            candidato.noCartaDePolicia = action.payload.noCartaDePolicia;
          }
          return candidato;
        }),
      };

    case "[Candidato] Refrescar-Datos":
      return {
        ...state,
        candidatos: [...action.payload],
      };

    case "[Candidato] Eliminar-Candidato":
      return {
        ...state,
        candidatos: state.candidatos.filter(
          (candidato) => candidato._id !== action.payload._id
        ),
      };

    default:
      return state;
  }
};

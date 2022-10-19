import { CandidatosState } from ".";
import { Candidato } from "../../../interfaces";

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
            candidato.descripcionDelPuesto =
              action.payload.descripcionDelPuesto;
            candidato.fechaDeNacimiento = action.payload.fechaDeNacimiento;
            candidato.domicilio = action.payload.domicilio;
            candidato.curp = action.payload.curp;
            candidato.noImss = action.payload.noImss;
            candidato.noCartaDePolicia = action.payload.noCartaDePolicia;
            candidato.celular = action.payload.celular;
            candidato.contactoDeEmergencia =
              action.payload.contactoDeEmergencia;
            candidato.correoElectronico = action.payload.correoElectronico;
            candidato.referencia1Nombre = action.payload.referencia1Nombre;
            candidato.referencia1Empresa = action.payload.referencia1Empresa;
            candidato.referencia1CorreoElectronico =
              action.payload.referencia1CorreoElectronico;
            candidato.referencia2Nombre = action.payload.referencia2Nombre;
            candidato.referencia2Empresa = action.payload.referencia2Empresa;
            candidato.referencia2CorreoElectronico =
              action.payload.referencia2CorreoElectronico;
            candidato.referencia3Nombre = action.payload.referencia3Nombre;
            candidato.referencia3Empresa = action.payload.referencia3Empresa;
            candidato.referencia3CorreoElectronico =
              action.payload.referencia3CorreoElectronico;
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

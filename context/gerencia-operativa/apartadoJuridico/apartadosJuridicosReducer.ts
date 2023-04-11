import { ApartadosJuridicosState } from ".";
import { ApartadoJuridico } from "../../../interfaces";

type ApartadosJuridicosActionType =
  | {
      type: "[Apartado Juridico] Agregar-Apartado Juridico";
      payload: ApartadoJuridico;
    }
  | {
      type: "[Apartado Juridico] Actualizar-Apartado Juridico";
      payload: ApartadoJuridico;
    }
  | { type: "[Apartado Juridico] Refrescar-Datos"; payload: ApartadoJuridico[] }
  | {
      type: "[Apartado Juridico] Eliminar-Apartado Juridico";
      payload: ApartadoJuridico;
    };

export const apartadosJuridicosReducer = (
  state: ApartadosJuridicosState,
  action: ApartadosJuridicosActionType
): ApartadosJuridicosState => {
  switch (action.type) {
    case "[Apartado Juridico] Agregar-Apartado Juridico":
      return {
        ...state,
        apartadosJuridicos: [...state.apartadosJuridicos, action.payload],
      };

    case "[Apartado Juridico] Actualizar-Apartado Juridico":
      return {
        ...state,
        apartadosJuridicos: state.apartadosJuridicos.map((apartadoJuridico) => {
          if (apartadoJuridico._id === action.payload._id) {
            apartadoJuridico.sucursalOFranquicia =
              action.payload.sucursalOFranquicia;
            apartadoJuridico.nombreSucursalOFranquicia = action.payload.nombreSucursalOFranquicia;
            apartadoJuridico.documento = action.payload.documento;
          }
          return apartadoJuridico;
        }),
      };

    case "[Apartado Juridico] Refrescar-Datos":
      return {
        ...state,
        apartadosJuridicos: [...action.payload],
      };

    case "[Apartado Juridico] Eliminar-Apartado Juridico":
      return {
        ...state,
        apartadosJuridicos: state.apartadosJuridicos.filter(
          (apartadoJuridico) => apartadoJuridico._id !== action.payload._id
        ),
      };

    default:
      return state;
  }
};

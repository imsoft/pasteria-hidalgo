import { ApartadoJuridico } from "../../../interfaces";
import { ApartadosJuridicosState } from "./ApartadosJuridicosProvider";

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
            apartadoJuridico.sucursales = action.payload.sucursales;
            apartadoJuridico.franquicias = action.payload.franquicias;
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

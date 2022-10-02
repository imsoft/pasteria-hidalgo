import { AsignarPrecio } from '../../../interfaces';
import { AsignarPreciosState } from './AsignarPreciosProvider';


type CandidatosActionType =
  | { type: "[Asignar Precios] Agregar-Asignar Precios"; payload: AsignarPrecio }
  | { type: "[Asignar Precios] Actualizar-Asignar Precios"; payload: AsignarPrecio }
  | { type: "[Asignar Precios] Refrescar-Datos"; payload: AsignarPrecio[] }
  | { type: "[Asignar Precios] Eliminar-Asignar Precio"; payload: AsignarPrecio };

export const asignarPreciosReducer = (
  state: AsignarPreciosState,
  action: CandidatosActionType
): AsignarPreciosState => {
  switch (action.type) {
    case "[Asignar Precios] Agregar-Asignar Precios":
      return {
        ...state,
        asignarPrecios: [...state.asignarPrecios, action.payload],
      };

    case "[Asignar Precios] Actualizar-Asignar Precios":
      return {
        ...state,
        asignarPrecios: state.asignarPrecios.map((asignarPrecio) => {
          if (asignarPrecio._id === action.payload._id) {
            asignarPrecio.producto = action.payload.producto;
            asignarPrecio.precioMaximo = action.payload.precioMaximo;
          }
          return asignarPrecio;
        }),
      };

    case "[Asignar Precios] Refrescar-Datos":
      return {
        ...state,
        asignarPrecios: [...action.payload],
      };

    case "[Asignar Precios] Eliminar-Asignar Precio":
      return {
        ...state,
        asignarPrecios: state.asignarPrecios.filter(
          (asignarPrecio) => asignarPrecio._id !== action.payload._id
        ),
      };

    default:
      return state;
  }
};

import { ManejoPersonal } from '../../../interfaces';
import { ManejosDePersonalState } from './ManejoDePersonalProvider';

type ManejosDePersonalActionType =
  | { type: "[Manejo De Personal] Agregar-Manejo De Personal"; payload: ManejoPersonal }
  | { type: "[Manejo De Personal] Actualizar-Manejo De Personal"; payload: ManejoPersonal }
  | { type: "[Manejo De Personal] Refrescar-Datos"; payload: ManejoPersonal[] }
  | { type: "[Manejo De Personal] Eliminar-Manejo De Personal"; payload: ManejoPersonal };

export const manejosDePersonalReducer = (
  state: ManejosDePersonalState,
  action: ManejosDePersonalActionType
): ManejosDePersonalState => {
  switch (action.type) {
    case '[Manejo De Personal] Agregar-Manejo De Personal':
      return {
        ...state,
        manejosDePersonal: [...state.manejosDePersonal, action.payload],
      };

    case '[Manejo De Personal] Actualizar-Manejo De Personal':
      return {
        ...state,
        manejosDePersonal: state.manejosDePersonal.map((manejoDePersonal) => {
          if (manejoDePersonal._id === action.payload._id) {
            manejoDePersonal.nombre = action.payload.nombre;
            manejoDePersonal.descripcionDelPuesto = action.payload.descripcionDelPuesto;
          }
          return manejoDePersonal;
        }),
      };

    case '[Manejo De Personal] Refrescar-Datos':
      return {
        ...state,
        manejosDePersonal: [...action.payload],
      };

    case '[Manejo De Personal] Eliminar-Manejo De Personal':
      return {
        ...state,
        manejosDePersonal: state.manejosDePersonal.filter(
          (manejoDePersonal) => manejoDePersonal._id !== action.payload._id
        ),
      };

    default:
      return state;
  }
};

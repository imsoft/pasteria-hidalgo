import { ManejosDeAlmacenState } from ".";
import { ListaManejoDeAlmacen } from "../../../interfaces";

type ManejosDeAlmacenActionType =
  | {
      type: "[Manejo De Almacen] Agregar-Manejo De Almacen";
      payload: ListaManejoDeAlmacen;
    }
  | {
      type: "[Manejo De Almacen] Actualizar-Manejo De Almacen";
      payload: ListaManejoDeAlmacen;
    }
  | {
      type: "[Manejo De Almacen] Refrescar-Datos";
      payload: ListaManejoDeAlmacen[];
    }
  | {
      type: "[Manejo De Almacen] Eliminar-Manejo De Almacen";
      payload: ListaManejoDeAlmacen;
    };

export const manejosDeAlmacenReducer = (
  state: ManejosDeAlmacenState,
  action: ManejosDeAlmacenActionType
): ManejosDeAlmacenState => {
  switch (action.type) {
    case "[Manejo De Almacen] Agregar-Manejo De Almacen":
      return {
        ...state,
        manejosDeAlmacen: [...state.manejosDeAlmacen, action.payload],
      };

    case "[Manejo De Almacen] Actualizar-Manejo De Almacen":
      return {
        ...state,
        manejosDeAlmacen: state.manejosDeAlmacen.map((manejoDeAlmacen) => {
          if (manejoDeAlmacen._id === action.payload._id) {
            manejoDeAlmacen.listaManejoDeAlmacen =
              action.payload.listaManejoDeAlmacen;
          }
          return manejoDeAlmacen;
        }),
      };

    case "[Manejo De Almacen] Refrescar-Datos":
      return {
        ...state,
        manejosDeAlmacen: [...action.payload],
      };

    case "[Manejo De Almacen] Eliminar-Manejo De Almacen":
      return {
        ...state,
        manejosDeAlmacen: state.manejosDeAlmacen.filter(
          (manejoDeAlmacen) => manejoDeAlmacen._id !== action.payload._id
        ),
      };

    default:
      return state;
  }
};

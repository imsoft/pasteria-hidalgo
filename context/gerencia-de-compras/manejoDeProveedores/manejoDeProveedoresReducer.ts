import { ProveedoresState } from ".";
import { Proveedor } from "../../../interfaces";

type ProveedoresActionType =
  | { type: "[Proveedor] Agregar-Proveedor"; payload: Proveedor }
  | { type: "[Proveedor] Actualizar-Proveedor"; payload: Proveedor }
  | { type: "[Proveedor] Refrescar-Datos"; payload: Proveedor[] }
  | { type: "[Proveedor] Eliminar-Proveedor"; payload: Proveedor };

export const proveedoresReducer = (
  state: ProveedoresState,
  action: ProveedoresActionType
): ProveedoresState => {
  switch (action.type) {
    case "[Proveedor] Agregar-Proveedor":
      return {
        ...state,
        proveedores: [...state.proveedores, action.payload],
      };

    case "[Proveedor] Actualizar-Proveedor":
      return {
        ...state,
        proveedores: state.proveedores.map((proveedor) => {
          if (proveedor._id === action.payload._id) {
            proveedor.nombre = action.payload.nombre;
            proveedor.direccion = action.payload.direccion;
            proveedor.telefono = action.payload.telefono;
            proveedor.horarioDeApertura = action.payload.horarioDeApertura;
            proveedor.horarioDeCierre = action.payload.horarioDeCierre;
            proveedor.productosQueSeCompran =
              action.payload.productosQueSeCompran;
            proveedor.entregasADomicilio = action.payload.entregasADomicilio;
            proveedor.rfc = action.payload.rfc;
          }
          return proveedor;
        }),
      };

    case "[Proveedor] Refrescar-Datos":
      return {
        ...state,
        proveedores: [...action.payload],
      };

    case "[Proveedor] Eliminar-Proveedor":
      return {
        ...state,
        proveedores: state.proveedores.filter(
          (proveedor) => proveedor._id !== action.payload._id
        ),
      };

    default:
      return state;
  }
};

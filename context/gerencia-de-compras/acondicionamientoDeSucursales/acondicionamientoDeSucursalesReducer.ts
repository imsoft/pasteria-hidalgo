import { AcondicionamientoDeSucursal } from "../../../interfaces/acondicionamientoDeSucursal";
import { AcondicionamientoDeSucursalesState } from "./AcondicionamientoDeSucursalesProvider";

type AcondicionamientoDeSucursalesActionType =
  | {
      type: "[Acondicionamiento De Sucursales] Agregar-Acondicionamiento De Sucursal";
      payload: AcondicionamientoDeSucursal;
    }
  | {
      type: "[Acondicionamiento De Sucursales] Actualizar-Acondicionamiento De Sucursal";
      payload: AcondicionamientoDeSucursal;
    }
  | {
      type: "[Acondicionamiento De Sucursales] Refrescar-Datos";
      payload: AcondicionamientoDeSucursal[];
    }
  | {
      type: "[Acondicionamiento De Sucursales] Eliminar-Acondicionamiento De Sucursal";
      payload: AcondicionamientoDeSucursal;
    };

export const acondicionamientoDeSucursalesReducer = (
  state: AcondicionamientoDeSucursalesState,
  action: AcondicionamientoDeSucursalesActionType
): AcondicionamientoDeSucursalesState => {
  switch (action.type) {
    case "[Acondicionamiento De Sucursales] Agregar-Acondicionamiento De Sucursal":
      return {
        ...state,
        acondicionamientoDeSucursales: [
          ...state.acondicionamientoDeSucursales,
          action.payload,
        ],
      };

    case "[Acondicionamiento De Sucursales] Actualizar-Acondicionamiento De Sucursal":
      return {
        ...state,
        acondicionamientoDeSucursales: state.acondicionamientoDeSucursales.map(
          (acondicionamientoDeSucursal) => {
            if (acondicionamientoDeSucursal._id === action.payload._id) {
              acondicionamientoDeSucursal.producto = action.payload.producto;
              acondicionamientoDeSucursal.fechaDeCompra =
                action.payload.fechaDeCompra;
              acondicionamientoDeSucursal.descripcionDelProducto =
                action.payload.descripcionDelProducto;
              acondicionamientoDeSucursal.precioDeCompra =
                action.payload.precioDeCompra;
              acondicionamientoDeSucursal.fechaEstimadaDeEntrega =
                action.payload.fechaEstimadaDeEntrega;
              acondicionamientoDeSucursal.proveedor = action.payload.proveedor;
              acondicionamientoDeSucursal.factura = action.payload.factura;
              acondicionamientoDeSucursal.totalAcomulado =
                action.payload.totalAcomulado;
            }
            return acondicionamientoDeSucursal;
          }
        ),
      };

    case "[Acondicionamiento De Sucursales] Refrescar-Datos":
      return {
        ...state,
        acondicionamientoDeSucursales: [...action.payload],
      };

    case "[Acondicionamiento De Sucursales] Eliminar-Acondicionamiento De Sucursal":
      return {
        ...state,
        acondicionamientoDeSucursales:
          state.acondicionamientoDeSucursales.filter(
            (acondicionamientoDeSucursal) =>
              acondicionamientoDeSucursal._id !== action.payload._id
          ),
      };

    default:
      return state;
  }
};

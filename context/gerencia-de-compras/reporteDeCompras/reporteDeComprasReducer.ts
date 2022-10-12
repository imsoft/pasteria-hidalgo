import { ReportesDeComprasState } from "./ReporteDeComprasProvider";
import { ReporteDeCompra } from '../../../interfaces/reporteDeCompra';

type ReportesDeComprasActionType =
  | { type: "[Reporte De Compra] Agregar-Reporte De Compra"; payload: ReporteDeCompra }
  | { type: "[Reporte De Compra] Actualizar-Reporte De Compra"; payload: ReporteDeCompra }
  | { type: "[Reporte De Compra] Refrescar-Datos"; payload: ReporteDeCompra[] }
  | { type: "[Reporte De Compra] Eliminar-Reporte De Compra"; payload: ReporteDeCompra };

export const reportesDeComprasReducer = (
  state: ReportesDeComprasState,
  action: ReportesDeComprasActionType
): ReportesDeComprasState => {
  switch (action.type) {
    case '[Reporte De Compra] Agregar-Reporte De Compra':
      return {
        ...state,
        reportesDeCompras: [...state.reportesDeCompras, action.payload],
      };

    case '[Reporte De Compra] Actualizar-Reporte De Compra':
      return {
        ...state,
        reportesDeCompras: state.reportesDeCompras.map((reporteDeCompra) => {
          if (reporteDeCompra._id === action.payload._id) {
            reporteDeCompra.fechaDeCompra = action.payload.fechaDeCompra;
            reporteDeCompra.credito = action.payload.credito;
            reporteDeCompra.materiaPrima = action.payload.materiaPrima;
            reporteDeCompra.unidades = action.payload.unidades;
            reporteDeCompra.nombreProveedor = action.payload.nombreProveedor;
            reporteDeCompra.tempetatura = action.payload.tempetatura;
            reporteDeCompra.caducidad = action.payload.caducidad;
            reporteDeCompra.factura = action.payload.factura;
            reporteDeCompra.cantidad = action.payload.cantidad;
            reporteDeCompra.precioPorUnidad = action.payload.precioPorUnidad;
            reporteDeCompra.precioTotalDelProducto = action.payload.precioTotalDelProducto;
            reporteDeCompra.precioTotalDelCompra = action.payload.precioTotalDelCompra;
          }
          return reporteDeCompra;
        }),
      };

    case '[Reporte De Compra] Refrescar-Datos':
      return {
        ...state,
        reportesDeCompras: [...action.payload],
      };

    case '[Reporte De Compra] Eliminar-Reporte De Compra':
      return {
        ...state,
        reportesDeCompras: state.reportesDeCompras.filter(
          (reporteDeCompra) => reporteDeCompra._id !== action.payload._id
        ),
      };

    default:
      return state;
  }
};

// idReporteDeCompra: string,
// codigoDeReporte: string,
// fechaDeCompra: string,
// credito: boolean,
// fechaDePago: string,
// idMateriaPrima: string,
// materiaPrima: string[],
// cantidad: number,
// unidades: string,
// idProveedor: string,
// nombreProveedor: string,
// precioPorUnidad: number,
// precioTotalDelProducto: number,
// precioTotalDelCompra: number,
// tempetatura: number,
// caducidad: string,
// factura: boolean,

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
            reporteDeCompra.idReporteDeCompra = action.payload.idReporteDeCompra;
            reporteDeCompra.codigoDeReporte = action.payload.codigoDeReporte;
            reporteDeCompra.fechaDeCompra = action.payload.fechaDeCompra;
            reporteDeCompra.credito = action.payload.credito;
            reporteDeCompra.fechaDePago = action.payload.fechaDePago;
            reporteDeCompra.idMateriaPrima = action.payload.idMateriaPrima;
            reporteDeCompra.materiaPrima = action.payload.materiaPrima;
            reporteDeCompra.cantidad = action.payload.cantidad;
            reporteDeCompra.unidades = action.payload.unidades;
            reporteDeCompra.idProveedor = action.payload.idProveedor;
            reporteDeCompra.nombreProveedor = action.payload.nombreProveedor;
            reporteDeCompra.precioPorUnidad = action.payload.precioPorUnidad;
            reporteDeCompra.precioTotalDelProducto = action.payload.precioTotalDelProducto;
            reporteDeCompra.precioTotalDelCompra = action.payload.precioTotalDelCompra;
            reporteDeCompra.tempetatura = action.payload.tempetatura;
            reporteDeCompra.caducidad = action.payload.caducidad;
            reporteDeCompra.factura = action.payload.factura;
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

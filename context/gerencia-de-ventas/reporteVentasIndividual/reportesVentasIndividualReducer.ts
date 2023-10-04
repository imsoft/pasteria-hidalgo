import { ReporteVentasIndividual } from "../../../interfaces";
import { ReportesVentasIndividualState } from ".";

type ReportesVentasIndividualActionType =
  | {
      type: "[Reporte Ventas Individual] Agregar-Reporte Ventas Individual";
      payload: ReporteVentasIndividual;
    }
  | {
      type: "[Reporte Ventas Individual] Actualizar-Reporte Ventas Individual";
      payload: ReporteVentasIndividual;
    }
  | {
      type: "[Reporte Ventas Individual] Refrescar-Datos";
      payload: ReporteVentasIndividual[];
    }
  | {
      type: "[Reporte Ventas Individual] Eliminar-Reporte Ventas Individual";
      payload: ReporteVentasIndividual;
    };

export const reportesVentasIndividualReducer = (
  state: ReportesVentasIndividualState,
  action: ReportesVentasIndividualActionType
): ReportesVentasIndividualState => {
  switch (action.type) {
    case "[Reporte Ventas Individual] Agregar-Reporte Ventas Individual":
      return {
        ...state,
        reportesVentasIndividual: [
          ...state.reportesVentasIndividual,
          action.payload,
        ],
      };

    case "[Reporte Ventas Individual] Actualizar-Reporte Ventas Individual":
      return {
        ...state,
        reportesVentasIndividual: state.reportesVentasIndividual.map(
          (reporteVentasIndividual) => {
            if (reporteVentasIndividual._id === action.payload._id) {
              reporteVentasIndividual.fecha = action.payload.fecha;
              reporteVentasIndividual.nombreDelVendedor =
                action.payload.nombreDelVendedor;
              reporteVentasIndividual.lugarDeVenta =
                action.payload.lugarDeVenta;
              reporteVentasIndividual.nombreLugarDeVenta =
                action.payload.nombreLugarDeVenta;
              reporteVentasIndividual.totalDeLaVenta =
                action.payload.totalDeLaVenta;
              reporteVentasIndividual.promocionUsada =
                action.payload.promocionUsada;
              reporteVentasIndividual.metodoDePago =
                action.payload.metodoDePago;
              reporteVentasIndividual.listadoDeProductos =
                action.payload.listadoDeProductos;
              reporteVentasIndividual.correoElectronicoClienteFrecuente =
                action.payload.correoElectronicoClienteFrecuente;
              reporteVentasIndividual.puntosClienteFrecuente =
                action.payload.puntosClienteFrecuente;
            }
            return reporteVentasIndividual;
          }
        ),
      };

    case "[Reporte Ventas Individual] Refrescar-Datos":
      return {
        ...state,
        reportesVentasIndividual: [...action.payload],
      };

    case "[Reporte Ventas Individual] Eliminar-Reporte Ventas Individual":
      return {
        ...state,
        reportesVentasIndividual: state.reportesVentasIndividual.filter(
          (reporteVentasIndividual) =>
            reporteVentasIndividual._id !== action.payload._id
        ),
      };

    default:
      return state;
  }
};

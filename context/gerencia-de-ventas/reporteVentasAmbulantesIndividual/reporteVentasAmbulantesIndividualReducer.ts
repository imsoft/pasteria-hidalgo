import { ReporteVentasAmbulantesIndividual } from '../../../interfaces';
import { ReporteVentasAmbulantesIndividualState } from '.';

type ReporteVentasAmbulantesIndividualActionType =
  | { type: "[Reporte De Ventas Ambulantes Individual] Agregar-Reporte De Ventas Ambulantes Individual"; payload: ReporteVentasAmbulantesIndividual }
  | { type: "[Reporte De Ventas Ambulantes Individual] Actualizar-Reporte De Ventas Ambulantes Individual"; payload: ReporteVentasAmbulantesIndividual }
  | { type: "[Reporte De Ventas Ambulantes Individual] Refrescar-Datos"; payload: ReporteVentasAmbulantesIndividual[] }
  | { type: "[Reporte De Ventas Ambulantes Individual] Eliminar-Reporte De Ventas Ambulantes Individual"; payload: ReporteVentasAmbulantesIndividual };

export const reporteVentasAmbulantesIndividualReducer = (
  state: ReporteVentasAmbulantesIndividualState,
  action: ReporteVentasAmbulantesIndividualActionType
): ReporteVentasAmbulantesIndividualState => {
  switch (action.type) {
    case "[Reporte De Ventas Ambulantes Individual] Agregar-Reporte De Ventas Ambulantes Individual":
      return {
        ...state,
        reporteVentasAmbulantesIndividual: [...state.reporteVentasAmbulantesIndividual, action.payload],
      };

    case "[Reporte De Ventas Ambulantes Individual] Actualizar-Reporte De Ventas Ambulantes Individual":
      return {
        ...state,
        reporteVentasAmbulantesIndividual: state.reporteVentasAmbulantesIndividual.map((reportesVentasAmbulantesIndividual) => {
          if (reportesVentasAmbulantesIndividual._id === action.payload._id) {
            reportesVentasAmbulantesIndividual.fecha = action.payload.fecha;
            reportesVentasAmbulantesIndividual.nombreDelVendedor = action.payload.nombreDelVendedor;
            reportesVentasAmbulantesIndividual.nombreLugarDeVenta = action.payload.nombreLugarDeVenta;
            reportesVentasAmbulantesIndividual.totalDeLaVenta = action.payload.totalDeLaVenta;
            reportesVentasAmbulantesIndividual.listadoDeProductos = action.payload.listadoDeProductos;
            reportesVentasAmbulantesIndividual.correoElectronicoClienteFrecuente = action.payload.correoElectronicoClienteFrecuente;
            reportesVentasAmbulantesIndividual.puntosClienteFrecuente = action.payload.puntosClienteFrecuente;
          }
          return reportesVentasAmbulantesIndividual;
        }),
      };

    case "[Reporte De Ventas Ambulantes Individual] Refrescar-Datos":
      return {
        ...state,
        reporteVentasAmbulantesIndividual: [...action.payload],
      };

    case "[Reporte De Ventas Ambulantes Individual] Eliminar-Reporte De Ventas Ambulantes Individual":
      return {
        ...state,
        reporteVentasAmbulantesIndividual: state.reporteVentasAmbulantesIndividual.filter(
          (reportesVentasAmbulantesIndividual) => reportesVentasAmbulantesIndividual._id !== action.payload._id
        ),
      };

    default:
      return state;
  }
};

import { ReportesDeGananciasState } from ".";
import { ReporteDeGanancia } from "../../../interfaces";

type ReportesDeGananciasActionType =
  | {
      type: "[Reporte De Ganancia] Agregar-Reporte De Ganancia";
      payload: ReporteDeGanancia;
    }
  | {
      type: "[Reporte De Ganancia] Actualizar-Reporte De Ganancia";
      payload: ReporteDeGanancia;
    }
  | { type: "[Reporte De Ganancia] Refrescar-Datos"; payload: ReporteDeGanancia[] }
  | {
      type: "[Reporte De Ganancia] Eliminar-Reporte De Ganancia";
      payload: ReporteDeGanancia;
    };

export const reportesDeGananciasReducer = (
  state: ReportesDeGananciasState,
  action: ReportesDeGananciasActionType
): ReportesDeGananciasState => {
  switch (action.type) {
    case "[Reporte De Ganancia] Agregar-Reporte De Ganancia":
      return {
        ...state,
        reportesDeGanancias: [...state.reportesDeGanancias, action.payload],
      };

    case "[Reporte De Ganancia] Actualizar-Reporte De Ganancia":
      return {
        ...state,
        reportesDeGanancias: state.reportesDeGanancias.map((reporteDeGanancia) => {
          if (reporteDeGanancia._id === action.payload._id) {
            reporteDeGanancia.mes = action.payload.mes;
            reporteDeGanancia.anio = action.payload.anio;
            reporteDeGanancia.ventasSucursalIndividual = action.payload.ventasSucursalIndividual;
            reporteDeGanancia.totalVentas = action.payload.totalVentas;
            reporteDeGanancia.totalCompras = action.payload.totalCompras;
            reporteDeGanancia.balance = action.payload.balance;
          }
          return reporteDeGanancia;
        }),
      };

    case "[Reporte De Ganancia] Refrescar-Datos":
      return {
        ...state,
        reportesDeGanancias: [...action.payload],
      };

    case "[Reporte De Ganancia] Eliminar-Reporte De Ganancia":
      return {
        ...state,
        reportesDeGanancias: state.reportesDeGanancias.filter(
          (ReporteDeGanancia) => ReporteDeGanancia._id !== action.payload._id
        ),
      };

    default:
      return state;
  }
};

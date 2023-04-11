import { ReportesDeSalidaState } from ".";
import { ReporteDeSalida } from "../../../interfaces";

type ReportesDeSalidaActionType =
  | {
      type: "[Reporte De Salida] Agregar-Reporte De Salida";
      payload: ReporteDeSalida;
    }
  | {
      type: "[Reporte De Salida] Actualizar-Reporte De Salida";
      payload: ReporteDeSalida;
    }
  | { type: "[Reporte De Salida] Refrescar-Datos"; payload: ReporteDeSalida[] }
  | {
      type: "[Reporte De Salida] Eliminar-Reporte De Salida";
      payload: ReporteDeSalida;
    };

export const reportesDeSalidaReducer = (
  state: ReportesDeSalidaState,
  action: ReportesDeSalidaActionType
): ReportesDeSalidaState => {
  switch (action.type) {
    case "[Reporte De Salida] Agregar-Reporte De Salida":
      return {
        ...state,
        reportesDeSalida: [...state.reportesDeSalida, action.payload],
      };

    case "[Reporte De Salida] Actualizar-Reporte De Salida":
      return {
        ...state,
        reportesDeSalida: state.reportesDeSalida.map((reporteDeSalida) => {
          if (reporteDeSalida._id === action.payload._id) {
            reporteDeSalida.sucursalAEnviar = action.payload.sucursalAEnviar;
            reporteDeSalida.nombreDelRepartidor =
              action.payload.nombreDelRepartidor;
            reporteDeSalida.datosDeLaRuta = action.payload.datosDeLaRuta;
            reporteDeSalida.kilometrajeDeEntrada =
              action.payload.kilometrajeDeEntrada;
            reporteDeSalida.kilometrajeDeSalida =
              action.payload.kilometrajeDeSalida;
            reporteDeSalida.listadoReporteDeSalida =
              action.payload.listadoReporteDeSalida;
          }
          return reporteDeSalida;
        }),
      };

    case "[Reporte De Salida] Refrescar-Datos":
      return {
        ...state,
        reportesDeSalida: [...action.payload],
      };

    case "[Reporte De Salida] Eliminar-Reporte De Salida":
      return {
        ...state,
        reportesDeSalida: state.reportesDeSalida.filter(
          (reporteDeSalida) => reporteDeSalida._id !== action.payload._id
        ),
      };

    default:
      return state;
  }
};

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
            reporteDeSalida.fecha = action.payload.fecha;
            reporteDeSalida.productoExtra = action.payload.productoExtra;
            reporteDeSalida.codigoDeProductoExtra =
              action.payload.codigoDeProductoExtra;
            reporteDeSalida.cantidadDeProductoExtra =
              action.payload.cantidadDeProductoExtra;
            reporteDeSalida.unidadesDeProductoExtra =
              action.payload.unidadesDeProductoExtra;
            reporteDeSalida.listadoDeProductos =
              action.payload.listadoDeProductos;
            reporteDeSalida.sucursalAEnviar = action.payload.sucursalAEnviar;
            reporteDeSalida.datosDeRepartidor =
              action.payload.datosDeRepartidor;
            reporteDeSalida.datosDeLaRuta = action.payload.datosDeLaRuta;
            reporteDeSalida.kilometrajeDeEntrada =
              action.payload.kilometrajeDeEntrada;
            reporteDeSalida.kilometrajeDeSalida =
              action.payload.kilometrajeDeSalida;
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

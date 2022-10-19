import { FC, ReactNode, useEffect, useReducer } from "react";

import { entriesApi } from "../../../apis";
import { ReportesDeSalidaContext, reportesDeSalidaReducer } from ".";
import { ReporteDeSalida } from "../../../interfaces";

import Swal from "sweetalert2";

export interface ReportesDeSalidaState {
  reportesDeSalida: ReporteDeSalida[];
}

const ReportesDeSalida_INITIAL_STATE: ReportesDeSalidaState = {
  reportesDeSalida: [],
};

interface Props {
  children: ReactNode;
}

export const ReportesDeSalidaProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(
    reportesDeSalidaReducer,
    ReportesDeSalida_INITIAL_STATE
  );

  const eliminarReporteDeSalida = async (
    reporteDeSalida: ReporteDeSalida,
    showNotificacion = false
  ) => {
    try {
      const { data } = await entriesApi.delete<ReporteDeSalida>(
        `/candidatos/${reporteDeSalida._id}`
      );

      dispatch({
        type: "[Reporte De Salida] Eliminar-Reporte De Salida",
        payload: data,
      });
    } catch (error) {
      console.log({ error });
    }

    if (showNotificacion) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Reporte De Salida Eliminado",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  const agregarNuevoReporteDeSalida = async (
    fecha: string,
    productoExtra: string,
    codigoDeProductoExtra: string,
    cantidadDeProductoExtra: string,
    unidadesDeProductoExtra: string,
    codigoDeMasa: string,
    masa: string,
    cantidadDeMasa: string,
    unidadesDeMasa: string,
    rellenos: string,
    codigosDeRelleno: string,
    cantidadDeProductoExtraRelleno: string,
    unidadesDeRelleno: string,
    temperaturaDeRellenos: string,
    sucursalAEnviar: string,
    datosDeRepartidor: string,
    datosDeLaRuta: string,
    kilometrajeDeEntrada: string,
    kilometrajeDeSalida: string,
    showNotificacion = false
  ) => {
    try {
      const { data } = await entriesApi.post<ReporteDeSalida>(
        "/reportesDeSalida",
        {
          fecha,
          productoExtra,
          codigoDeProductoExtra,
          cantidadDeProductoExtra,
          unidadesDeProductoExtra,
          codigoDeMasa,
          masa,
          cantidadDeMasa,
          unidadesDeMasa,
          rellenos,
          codigosDeRelleno,
          cantidadDeProductoExtraRelleno,
          unidadesDeRelleno,
          temperaturaDeRellenos,
          sucursalAEnviar,
          datosDeRepartidor,
          datosDeLaRuta,
          kilometrajeDeEntrada,
          kilometrajeDeSalida,
        }
      );
      dispatch({
        type: "[Reporte De Salida] Agregar-Reporte De Salida",
        payload: data,
      });

      if (showNotificacion) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Reporte De Salida Agregado",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    } catch (error) {
      console.log({ error });
    }
  };

  const actualizarReporteDeSalida = async (
    {
      _id,
      fecha,
      productoExtra,
      codigoDeProductoExtra,
      cantidadDeProductoExtra,
      unidadesDeProductoExtra,
      codigoDeMasa,
      masa,
      cantidadDeMasa,
      unidadesDeMasa,
      rellenos,
      codigosDeRelleno,
      cantidadDeProductoExtraRelleno,
      unidadesDeRelleno,
      temperaturaDeRellenos,
      sucursalAEnviar,
      datosDeRepartidor,
      datosDeLaRuta,
      kilometrajeDeEntrada,
      kilometrajeDeSalida,
    }: ReporteDeSalida,
    showNotificacion = false
  ) => {
    try {
      const { data } = await entriesApi.put<ReporteDeSalida>(
        `/reportesDeSalida/${_id}`,
        {
          fecha,
          productoExtra,
          codigoDeProductoExtra,
          cantidadDeProductoExtra,
          unidadesDeProductoExtra,
          codigoDeMasa,
          masa,
          cantidadDeMasa,
          unidadesDeMasa,
          rellenos,
          codigosDeRelleno,
          cantidadDeProductoExtraRelleno,
          unidadesDeRelleno,
          temperaturaDeRellenos,
          sucursalAEnviar,
          datosDeRepartidor,
          datosDeLaRuta,
          kilometrajeDeEntrada,
          kilometrajeDeSalida,
        }
      );
      dispatch({
        type: "[Reporte De Salida] Actualizar-Reporte De Salida",
        payload: data,
      });

      if (showNotificacion) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Reporte De Salida Actualizado",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    } catch (error) {
      console.log({ error });
    }
  };

  const refreshReportesDeSalida = async () => {
    const { data } = await entriesApi.get<ReporteDeSalida[]>(
      "/reportesDeSalida"
    );
    console.log(data);
    dispatch({ type: "[Reporte De Salida] Refrescar-Datos", payload: data });
  };

  useEffect(() => {
    refreshReportesDeSalida();
  }, []);

  return (
    <ReportesDeSalidaContext.Provider
      value={{
        ...state,

        //Methods
        eliminarReporteDeSalida,
        agregarNuevoReporteDeSalida,
        actualizarReporteDeSalida,
      }}
    >
      {children}
    </ReportesDeSalidaContext.Provider>
  );
};

import { FC, ReactNode, useEffect, useReducer } from "react";

import { entriesApi } from "../../../baseUrlApi";
import { ReportesDeSalidaContext, reportesDeSalidaReducer } from ".";
import {
  IListadoReporteDeSalida,
  ListadoDeProductos,
  ReporteDeSalida,
} from "../../../interfaces";

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
    sucursalAEnviar: string,
    nombreDelRepartidor: string,
    datosDeLaRuta: string,
    kilometrajeDeEntrada: string,
    kilometrajeDeSalida: string,
    listadoReporteDeSalida: IListadoReporteDeSalida[],
    showNotificacion = false
  ) => {
    try {
      const { data } = await entriesApi.post<ReporteDeSalida>(
        "/reportesDeSalida",
        {
          sucursalAEnviar,
          nombreDelRepartidor,
          datosDeLaRuta,
          kilometrajeDeEntrada,
          kilometrajeDeSalida,
          listadoReporteDeSalida,
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
      sucursalAEnviar,
      nombreDelRepartidor,
      datosDeLaRuta,
      kilometrajeDeEntrada,
      kilometrajeDeSalida,
      listadoReporteDeSalida,
    }: ReporteDeSalida,
    showNotificacion = false
  ) => {
    try {
      const { data } = await entriesApi.put<ReporteDeSalida>(
        `/reportesDeSalida/${_id}`,
        {
          sucursalAEnviar,
          nombreDelRepartidor,
          datosDeLaRuta,
          kilometrajeDeEntrada,
          kilometrajeDeSalida,
          listadoReporteDeSalida,
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

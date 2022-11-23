import { FC, ReactNode, useEffect, useReducer } from "react";

import { entriesApi } from "../../../apis";

import {
  ReportesVentasIndividualContext,
  reportesVentasIndividualReducer,
} from ".";
import {
  ListadoDeProductos,
  ReporteVentasIndividual,
} from "../../../interfaces";

import Swal from "sweetalert2";

export interface ReportesVentasIndividualState {
  reportesVentasIndividual: ReporteVentasIndividual[];
}

const ReportesVentasIndividual_INITIAL_STATE: ReportesVentasIndividualState = {
  reportesVentasIndividual: [],
};

interface Props {
  children: ReactNode;
}

export const ReportesVentasIndividualProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(
    reportesVentasIndividualReducer,
    ReportesVentasIndividual_INITIAL_STATE
  );

  const eliminarReporteVentasIndividual = async (
    reporteVentasIndividual: ReporteVentasIndividual,
    showNotificacion = false
  ) => {
    try {
      const { data } = await entriesApi.delete<ReporteVentasIndividual>(
        `/reportesVentasIndividual/${reporteVentasIndividual._id}`
      );

      dispatch({
        type: "[Reporte Ventas Individual] Eliminar-Reporte Ventas Individual",
        payload: data,
      });
    } catch (error) {
      console.log({ error });
    }

    if (showNotificacion) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Reporte Ventas Individual Eliminado",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  const agregarNuevoReporteVentasIndividual = async (
    fecha: string,
    nombreDelVendedor: string,
    lugarDeVenta: string,
    nombreLugarDeVenta: string,
    totalDeLaVenta: number,
    listadoDeProductos: ListadoDeProductos[],
    correoElectronicoClienteFrecuente?: string,
    puntosClienteFrecuente?: number,
    showNotificacion = false
  ) => {
    try {
      const { data } = await entriesApi.post<ReporteVentasIndividual>(
        "/reportesVentasIndividual",
        {
          fecha,
          nombreDelVendedor,
          lugarDeVenta,
          nombreLugarDeVenta,
          totalDeLaVenta,
          listadoDeProductos,
          correoElectronicoClienteFrecuente,
          puntosClienteFrecuente,
        }
      );
      dispatch({
        type: "[Reporte Ventas Individual] Agregar-Reporte Ventas Individual",
        payload: data,
      });

      if (showNotificacion) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Reporte Ventas Individual Agregado",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    } catch (error) {
      console.log({ error });
    }
  };

  const actualizarReporteVentasIndividual = async (
    {
      _id,
      fecha,
      nombreDelVendedor,
      lugarDeVenta,
      nombreLugarDeVenta,
      totalDeLaVenta,
      listadoDeProductos,
      correoElectronicoClienteFrecuente,
      puntosClienteFrecuente,
    }: ReporteVentasIndividual,
    showNotificacion = false
  ) => {
    try {
      const { data } = await entriesApi.put<ReporteVentasIndividual>(
        `/reportesVentasIndividual/${_id}`,
        {
          fecha,
          nombreDelVendedor,
          lugarDeVenta,
          nombreLugarDeVenta,
          totalDeLaVenta,
          listadoDeProductos,
          correoElectronicoClienteFrecuente,
          puntosClienteFrecuente,
        }
      );
      dispatch({
        type: "[Reporte Ventas Individual] Actualizar-Reporte Ventas Individual",
        payload: data,
      });

      if (showNotificacion) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Reporte Ventas Individual Actualizado",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    } catch (error) {
      console.log({ error });
    }
  };

  const refreshReportesVentasIndividual = async () => {
    const { data } = await entriesApi.get<ReporteVentasIndividual[]>(
      "/reportesVentasIndividual"
    );
    console.log(data);
    dispatch({
      type: "[Reporte Ventas Individual] Refrescar-Datos",
      payload: data,
    });
  };

  useEffect(() => {
    refreshReportesVentasIndividual();
  }, []);

  return (
    <ReportesVentasIndividualContext.Provider
      value={{
        ...state,

        //Methods
        eliminarReporteVentasIndividual,
        agregarNuevoReporteVentasIndividual,
        actualizarReporteVentasIndividual,
      }}
    >
      {children}
    </ReportesVentasIndividualContext.Provider>
  );
};

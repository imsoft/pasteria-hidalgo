import { FC, ReactNode, useEffect, useReducer } from "react";

import { entriesApi } from "../../../baseUrlApi";

import {
  ReportesVentasAmbulantesIndividualContext,
  reporteVentasAmbulantesIndividualReducer,
} from ".";
import {
  ListadoDeProductos,
  ReporteVentasAmbulantesIndividual,
} from "../../../interfaces";

import Swal from "sweetalert2";

export interface ReporteVentasAmbulantesIndividualState {
  reportesVentasAmbulantesIndividual: ReporteVentasAmbulantesIndividual[];
}

const ReporteVentasAmbulantesIndividual_INITIAL_STATE: ReporteVentasAmbulantesIndividualState =
  {
    reportesVentasAmbulantesIndividual: [],
  };

interface Props {
  children: ReactNode;
}

export const ReporteVentasAmbulantesIndividualProvider: FC<Props> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(
    reporteVentasAmbulantesIndividualReducer,
    ReporteVentasAmbulantesIndividual_INITIAL_STATE
  );

  const eliminarReporteVentasAmbulantesIndividual = async (
    reporteVentasAmbulantesIndividual: ReporteVentasAmbulantesIndividual,
    showNotificacion = false
  ) => {
    try {
      const { data } =
        await entriesApi.delete<ReporteVentasAmbulantesIndividual>(
          `/reportesVentasAmbulantesIndividual/${reporteVentasAmbulantesIndividual._id}`
        );

      dispatch({
        type: "[Reporte De Ventas Ambulantes Individual] Eliminar-Reporte De Ventas Ambulantes Individual",
        payload: data,
      });
    } catch (error) {
      console.log({ error });
    }

    if (showNotificacion) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Reporte Ventas Ambulantes Individual Eliminado",
        showConfirmButton: false,
        timer: 1000,
      });
    }
  };

  const agregarNuevoReporteVentasAmbulantesIndividual = async (
    fecha: string,
    nombreDelVendedor: string,
    totalDeLaVenta: number,
    listadoDeProductos: ListadoDeProductos[],
    showNotificacion = false
  ) => {
    try {
      const { data } = await entriesApi.post<ReporteVentasAmbulantesIndividual>(
        "/reportesVentasAmbulantesIndividual",
        {
          fecha,
          nombreDelVendedor,
          totalDeLaVenta,
          listadoDeProductos,
        }
      );
      dispatch({
        type: "[Reporte De Ventas Ambulantes Individual] Agregar-Reporte De Ventas Ambulantes Individual",
        payload: data,
      });

      if (showNotificacion) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Reporte Ventas Ambulantes Individual Agregado",
          showConfirmButton: false,
          timer: 1000,
        });
      }
    } catch (error) {
      console.log({ error });
    }
  };

  const actualizarReporteVentasAmbulantesIndividual = async (
    {
      _id,
      fecha,
      nombreDelVendedor,
      totalDeLaVenta,
      listadoDeProductos,
    }: ReporteVentasAmbulantesIndividual,
    showNotificacion = false
  ) => {
    try {
      const { data } = await entriesApi.put<ReporteVentasAmbulantesIndividual>(
        `/reportesVentasAmbulantesIndividual/${_id}`,
        {
          fecha,
          nombreDelVendedor,
          totalDeLaVenta,
          listadoDeProductos,
        }
      );
      dispatch({
        type: "[Reporte De Ventas Ambulantes Individual] Actualizar-Reporte De Ventas Ambulantes Individual",
        payload: data,
      });

      if (showNotificacion) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Reporte Ventas Ambulantes Individual Actualizado",
          showConfirmButton: false,
          timer: 1000,
        });
      }
    } catch (error) {
      console.log({ error });
    }
  };

  const refreshReporteVentasAmbulantesIndividual = async () => {
    const { data } = await entriesApi.get<ReporteVentasAmbulantesIndividual[]>(
      "/reportesVentasAmbulantesIndividual"
    );
    // console.log(data);
    dispatch({
      type: "[Reporte De Ventas Ambulantes Individual] Refrescar-Datos",
      payload: data,
    });
  };

  useEffect(() => {
    refreshReporteVentasAmbulantesIndividual();
  }, []);

  return (
    <ReportesVentasAmbulantesIndividualContext.Provider
      value={{
        ...state,

        //Methods
        agregarNuevoReporteVentasAmbulantesIndividual,
        actualizarReporteVentasAmbulantesIndividual,
        eliminarReporteVentasAmbulantesIndividual,
      }}
    >
      {children}
    </ReportesVentasAmbulantesIndividualContext.Provider>
  );
};
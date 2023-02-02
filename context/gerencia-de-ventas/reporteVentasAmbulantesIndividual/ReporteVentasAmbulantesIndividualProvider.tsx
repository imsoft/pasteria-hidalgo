import { FC, ReactNode, useEffect, useReducer } from "react";

import { entriesApi } from "../../../baseUrlApi";

import {
  reporteVentasAmbulantesIndividualReducer,
} from ".";
import {
  ListadoDeProductos,
  ReporteVentasAmbulantesIndividual,
} from "../../../interfaces";

import Swal from "sweetalert2";
import { ReporteVentasAmbulantesIndividualContext } from "./ReporteVentasAmbulantesIndividualContext";

export interface ReporteVentasAmbulantesIndividualState {
  reporteVentasAmbulantesIndividual: ReporteVentasAmbulantesIndividual[];
}

const ReporteVentasAmbulantesIndividual_INITIAL_STATE: ReporteVentasAmbulantesIndividualState = {
  reporteVentasAmbulantesIndividual: [],
};

interface Props {
  children: ReactNode;
}

export const ReporteVentasAmbulantesIndividualProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(
    reporteVentasAmbulantesIndividualReducer,
    ReporteVentasAmbulantesIndividual_INITIAL_STATE
  );

  const eliminarReporteVentasAmbulantesIndividual = async (
    reporteVentasAmbulantesIndividual: ReporteVentasAmbulantesIndividual,
    showNotificacion = false
  ) => {
    try {
      const { data } = await entriesApi.delete<ReporteVentasAmbulantesIndividual>(
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
        timer: 2000,
      });
    }
  };

  const agregarNuevoReporteVentasAmbulantesIndividual = async (
    fecha: string,
    nombreDelVendedor: string,
    nombreLugarDeVenta: string,
    totalDeLaVenta: number,
    listadoDeProductos: ListadoDeProductos[],
    correoElectronicoClienteFrecuente?: string,
    puntosClienteFrecuente?: number,
    showNotificacion = false
  ) => {
    try {
      const { data } = await entriesApi.post<ReporteVentasAmbulantesIndividual>(
        "/reportesVentasAmbulantesIndividual",
        {
          fecha,
          nombreDelVendedor,
          nombreLugarDeVenta,
          totalDeLaVenta,
          listadoDeProductos,
          correoElectronicoClienteFrecuente,
          puntosClienteFrecuente,
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
          title: "Reporte Ventas Individual Agregado",
          showConfirmButton: false,
          timer: 2000,
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
      nombreLugarDeVenta,
      totalDeLaVenta,
      listadoDeProductos,
      correoElectronicoClienteFrecuente,
      puntosClienteFrecuente,
    }: ReporteVentasAmbulantesIndividual,
    showNotificacion = false
  ) => {
    try {
      const { data } = await entriesApi.put<ReporteVentasAmbulantesIndividual>(
        `/reportesVentasAmbulantesIndividual/${_id}`,
        {
          fecha,
          nombreDelVendedor,
          nombreLugarDeVenta,
          totalDeLaVenta,
          listadoDeProductos,
          correoElectronicoClienteFrecuente,
          puntosClienteFrecuente,
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
          timer: 2000,
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
    console.log(data);
    dispatch({
      type: "[Reporte De Ventas Ambulantes Individual] Refrescar-Datos",
      payload: data,
    });
  };

  useEffect(() => {
    refreshReporteVentasAmbulantesIndividual();
  }, []);

  return (
    <ReporteVentasAmbulantesIndividualContext.Provider
      value={{
        ...state,

        //Methods
        eliminarReporteVentasAmbulantesIndividual,
        agregarNuevoReporteVentasAmbulantesIndividual,
        actualizarReporteVentasAmbulantesIndividual,
      }}
    >
      {children}
    </ReporteVentasAmbulantesIndividualContext.Provider>
  );
};

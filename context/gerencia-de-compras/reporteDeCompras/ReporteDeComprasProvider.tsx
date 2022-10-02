import { FC, ReactNode, useEffect, useReducer } from "react";

import { entriesApi } from "../../../apis";
import { ReporteDeCompra } from "../../../interfaces/reporteDeCompra";
import { ReporteDeCompraContext, reportesDeComprasReducer } from ".";

import Swal from "sweetalert2";

export interface ReportesDeComprasState {
  reportesDeCompras: ReporteDeCompra[];
}

const ReportesDeCompras_INITIAL_STATE: ReportesDeComprasState = {
  reportesDeCompras: [],
};

interface Props {
  children: ReactNode;
}

export const ReportesDeComprasProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(
    reportesDeComprasReducer,
    ReportesDeCompras_INITIAL_STATE
  );

  const eliminarReporteDeCompra = async (
    reporteDeCompra: ReporteDeCompra,
    showNotificacion = false
  ) => {
    try {
      const { data } = await entriesApi.delete<ReporteDeCompra>(
        `/reportesDeCompras/${reporteDeCompra._id}`
      );

      dispatch({
        type: "[Reporte De Compra] Eliminar-Reporte De Compra",
        payload: data,
      });
    } catch (error) {
      console.log({ error });
    }

    if (showNotificacion) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Reporte De Compra Eliminado",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  const agregarReporteDeCompra = async (
    idReporteDeCompra: string,
    codigoDeReporte: string,
    credito: string,
    fechaDeCompra: string,
    idMateriaPrima: string,
    materiaPrima: string,
    cantidad: string,
    unidades: string,
    idProveedor: string,
    nombreProveedor: string,
    precioPorUnidad: string,
    precioTotalDelProducto: string,
    precioTotalDelCompra: string,
    tempetatura: string,
    caducidad: string,
    factura: string,
    showNotificacion = false
  ) => {
    try {
      const { data } = await entriesApi.post<ReporteDeCompra>(
        "/reportesDeCompras",
        {
          idReporteDeCompra,
          codigoDeReporte,
          credito,
          fechaDeCompra,
          idMateriaPrima,
          materiaPrima,
          cantidad,
          unidades,
          idProveedor,
          nombreProveedor,
          precioPorUnidad,
          precioTotalDelProducto,
          precioTotalDelCompra,
          tempetatura,
          caducidad,
          factura,
        }
      );
      dispatch({ type: "[Reporte De Compra] Agregar-Reporte De Compra", payload: data });

      if (showNotificacion) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Reportes De Compras Agregado",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    } catch (error) {
      console.log({ error });
    }
  };

  const actualizarReporteDeCompra = async (
    {
      _id,
      idReporteDeCompra,
      codigoDeReporte,
      fechaDeCompra,
      credito,
      idMateriaPrima,
      materiaPrima,
      cantidad,
      unidades,
      idProveedor,
      nombreProveedor,
      precioPorUnidad,
      precioTotalDelProducto,
      precioTotalDelCompra,
      tempetatura,
      caducidad,
      factura,
    }: ReporteDeCompra,
    showNotificacion = false
  ) => {
    try {
      const { data } = await entriesApi.put<ReporteDeCompra>(
        `/reportesDeCompras/${_id}`,
        {
          idReporteDeCompra,
          codigoDeReporte,
          fechaDeCompra,
          credito,
          idMateriaPrima,
          materiaPrima,
          cantidad,
          unidades,
          idProveedor,
          nombreProveedor,
          precioPorUnidad,
          precioTotalDelProducto,
          precioTotalDelCompra,
          tempetatura,
          caducidad,
          factura,
        }
      );
      dispatch({ type: "[Reporte De Compra] Actualizar-Reporte De Compra", payload: data });

      if (showNotificacion) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Reporte De Compra Actualizado",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    } catch (error) {
      console.log({ error });
    }
  };

  const refreshReportesDeCompras = async () => {
    const { data } = await entriesApi.get<ReporteDeCompra[]>(
      "/reportesDeCompras"
    );
    console.log(data);
    dispatch({ type: "[Reporte De Compra] Refrescar-Datos", payload: data });
  };

  useEffect(() => {
    refreshReportesDeCompras();
  }, []);

  return (
    <ReporteDeCompraContext.Provider
      value={{
        ...state,

        //Methods
        agregarReporteDeCompra,
        actualizarReporteDeCompra,
        eliminarReporteDeCompra,
      }}
    >
      {children}
    </ReporteDeCompraContext.Provider>
  );
};

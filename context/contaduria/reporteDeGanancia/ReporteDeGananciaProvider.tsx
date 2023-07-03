import { FC, ReactNode, useEffect, useReducer } from "react";

import { entriesApi } from "../../../baseUrlApi";

import Swal from "sweetalert2";
import { ReporteDeGanancia } from "../../../interfaces";
import { ReporteDeGananciaContext, reportesDeGananciasReducer } from ".";

export interface ReportesDeGananciasState {
  reportesDeGanancias: ReporteDeGanancia[];
}

const ReporteDeGanancia_INITIAL_STATE: ReportesDeGananciasState = {
  reportesDeGanancias: [],
};

interface Props {
  children: ReactNode;
}

export const ReporteDeGananciaProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(
    reportesDeGananciasReducer,
    ReporteDeGanancia_INITIAL_STATE
  );

  const eliminarReporteDeGanancia = async (
    reporteDeGanancia: ReporteDeGanancia,
    showNotificacion = false
  ) => {
    try {
      const { data } = await entriesApi.delete<ReporteDeGanancia>(
        `/reportesDeGanancias/${reporteDeGanancia._id}`
      );

      dispatch({
        type: "[Reporte De Ganancia] Eliminar-Reporte De Ganancia",
        payload: data,
      });
    } catch (error) {
      console.log({ error });
    }

    if (showNotificacion) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Reporte De Ganancia Eliminado",
        showConfirmButton: false,
        timer: 1000,
      });
    }
  };

  const agregarNuevoReporteDeGanancia = async (
    mes: string,
    anio: string,
    sucursal: string,
    totalVentas: number,
    totalCompras: number,
    balance: number,
    showNotificacion = false
  ) => {
    try {
      const { data } = await entriesApi.post<ReporteDeGanancia>(
        "/reportesDeGanancias",
        {
          mes,
          anio,
          sucursal,
          totalVentas,
          totalCompras,
          balance,
        }
      );
      dispatch({
        type: "[Reporte De Ganancia] Agregar-Reporte De Ganancia",
        payload: data,
      });

      if (showNotificacion) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Reporte De Ganancia Agregado",
          showConfirmButton: false,
          timer: 1000,
        });
      }
    } catch (error) {
      console.log({ error });
    }
  };

  const actualizarReporteDeGanancia = async (
    {
      _id,
      mes,
      anio,
      sucursal,
      totalVentas,
      totalCompras,
      balance,
    }: ReporteDeGanancia,
    showNotificacion = false
  ) => {
    try {
      const { data } = await entriesApi.put<ReporteDeGanancia>(
        `/reportesDeGanancias/${_id}`,
        {
          mes,
          anio,
          sucursal,
          totalVentas,
          totalCompras,
          balance,
        }
      );
      dispatch({
        type: "[Reporte De Ganancia] Actualizar-Reporte De Ganancia",
        payload: data,
      });

      if (showNotificacion) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Reporte De Ganancia Actualizado",
          showConfirmButton: false,
          timer: 1000,
        });
      }
    } catch (error) {
      console.log({ error });
    }
  };

  const refreshReporteDeGanancia = async () => {
    const { data } = await entriesApi.get<ReporteDeGanancia[]>(
      "/reportesDeGanancias"
    );
    // console.log(data);
    dispatch({ type: "[Reporte De Ganancia] Refrescar-Datos", payload: data });
  };

  // useEffect(() => {
  //   refreshReporteDeGanancia();
  // }, []);

  return (
    <ReporteDeGananciaContext.Provider
      value={{
        ...state,

        //Methods
        agregarNuevoReporteDeGanancia,
        actualizarReporteDeGanancia,
        eliminarReporteDeGanancia,
        refreshReporteDeGanancia,
      }}
    >
      {children}
    </ReporteDeGananciaContext.Provider>
  );
};

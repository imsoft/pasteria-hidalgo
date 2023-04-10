import { ChangeEvent, useContext, useMemo, useState, useEffect } from "react";
import Link from "next/link";

import { ReportesVentasAmbulantesIndividualContext } from "../../../context/gerencia-de-ventas/reporteVentasAmbulantesIndividual/ReporteVentasAmbulantesIndividualContext";

import { SidebarLayoutGerenciaVentas } from "../../../components/layouts/gerencia-de-ventas/SidebarLayoutGerenciaVentas";
import ListaReportesVentasAmbulantesIndividual from "../../../components/ui/gerencia-de-ventas/ListaReportesVentasAmbulantesIndividual";

const tiempoTranscurrido = Date.now();
const hoy = new Date(tiempoTranscurrido);

const VerReporteVentaAmbulantesIndividual = () => {
  const [inputFecha, setInputFecha] = useState(hoy.toLocaleDateString());
  const [inputNuevaFecha, setInputNuevaFecha] = useState(
    hoy.toLocaleDateString()
  );
  const [change, setChange] = useState(false);

  const { reportesVentasAmbulantesIndividual } = useContext(
    ReportesVentasAmbulantesIndividualContext
  );

  const reportesVentasAmbulantesIndividualMemo = useMemo(
    () => reportesVentasAmbulantesIndividual,
    [reportesVentasAmbulantesIndividual]
  );

  const onTextFieldChangedFecha = (event: ChangeEvent<HTMLInputElement>) => {
    setInputFecha(event.target.value);
    const nuevaFecha = event.target.value.split("-", 3);
    const dia = nuevaFecha[2];
    const mes = nuevaFecha[1];
    const anio = nuevaFecha[0];
    setInputNuevaFecha(`${dia}/${mes}/${anio}`);
    setChange(true);
  };

  const mostrarTodos = () => {
    setChange(false);
    setInputFecha(hoy.toLocaleDateString());
    setInputNuevaFecha(hoy.toLocaleDateString());
  };

  useEffect(() => {
    reportesVentasAmbulantesIndividualMemo
      .filter(
        (reporteVentasAmbulantesIndividual) =>
          reporteVentasAmbulantesIndividual.fecha === inputNuevaFecha
      )
      .map((reporteVentasAmbulantesIndividual) => (
        <ListaReportesVentasAmbulantesIndividual
          key={reporteVentasAmbulantesIndividual._id}
          reporteVentasAmbulantesIndividual={reporteVentasAmbulantesIndividual}
        />
      ));
  }, [inputFecha]);

  return (
    <SidebarLayoutGerenciaVentas>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900">
              Reporte De Ventas Ambulantes Individual
            </h1>
            <p className="mt-2 text-sm text-gray-700">
              Aquí podras ver los Reporte de ventas individual para la empresa.
            </p>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-primary-yellow px-4 py-2 text-sm font-medium text-gray-600 shadow-sm hover:bg-primary-blue hover:text-white focus:outline-none focus:ring-2 focus:ring-primary-yellow focus:ring-offset-2 sm:w-auto"
            >
              <Link
                href={
                  "/gerencia-de-ventas/reporteDeVentasIndividual/AgregarReporteDeVentasIndividual"
                }
              >
                <a>Agregar Reporte de ventas individual</a>
              </Link>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-6 gap-6 mt-6">
          <div className="col-span-6 sm:col-span-3">
            <label
              htmlFor="TxtFecha"
              className="block text-sm font-medium text-gray-700"
            >
              Filtrado por fecha
            </label>
            <input
              type="date"
              name="TxtFecha"
              id="TxtFecha"
              autoComplete="off"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
              value={inputFecha}
              onChange={onTextFieldChangedFecha}
            />
          </div>

          <div className="mt-3 px-4 py-3 bg-white text-right sm:px-2">
            <button
              type="submit"
              className="bg-primary-blue border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-primary-yellow hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-yellow"
              onClick={mostrarTodos}
            >
              Mostrar todos
            </button>
          </div>
        </div>

        <div className="mt-8 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        Fecha
                      </th>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        Nombre Del Vendedor
                      </th>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        Listado De Productos
                      </th>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        Total De La Venta
                      </th>
                    </tr>
                  </thead>

                  {!change
                    ? reportesVentasAmbulantesIndividualMemo.map(
                        (reporteVentasAmbulantesIndividual) => (
                          <ListaReportesVentasAmbulantesIndividual
                            key={reporteVentasAmbulantesIndividual._id}
                            reporteVentasAmbulantesIndividual={
                              reporteVentasAmbulantesIndividual
                            }
                          />
                        )
                      )
                    : reportesVentasAmbulantesIndividualMemo
                        .filter(
                          (reporteVentasAmbulantesIndividual) =>
                            reporteVentasAmbulantesIndividual.fecha ===
                            inputNuevaFecha
                        )
                        .map((reporteVentasAmbulantesIndividual) => (
                          <ListaReportesVentasAmbulantesIndividual
                            key={reporteVentasAmbulantesIndividual._id}
                            reporteVentasAmbulantesIndividual={
                              reporteVentasAmbulantesIndividual
                            }
                          />
                        ))}
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SidebarLayoutGerenciaVentas>
  );
};

export default VerReporteVentaAmbulantesIndividual;

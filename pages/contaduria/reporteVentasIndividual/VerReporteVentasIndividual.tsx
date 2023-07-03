import { ChangeEvent, useContext, useMemo, useState, useEffect } from "react";

import { ReportesVentasIndividualContext } from "../../../context/gerencia-de-ventas/reporteVentasIndividual/ReportesVentasIndividualContext";
import ListaReportesVentasIndividual from "../../../components/ui/gerencia-de-ventas/ListaReportesDeVentaIndividual";

import { SidebarLayoutContaduria } from "../../../components/layouts/contaduria/SidebarLayoutContaduria";

const tiempoTranscurrido = Date.now();
const hoy = new Date(tiempoTranscurrido);

const VerReporteVentasIndividual = () => {
  const [inputFecha, setInputFecha] = useState(hoy.toLocaleDateString());
  const [inputNuevaFecha, setInputNuevaFecha] = useState(
    hoy.toLocaleDateString()
  );
  const [change, setChange] = useState(false);

  const { reportesVentasIndividual, refreshReportesVentasIndividual } = useContext(
    ReportesVentasIndividualContext
  );

  const reportesVentasIndividualMemo = useMemo(
    () => reportesVentasIndividual,
    [reportesVentasIndividual]
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
    refreshReportesVentasIndividual();
  }, []);

  useEffect(() => {
    reportesVentasIndividualMemo
      .filter(
        (reporteVentasIndividual) =>
          reporteVentasIndividual.fecha === inputNuevaFecha
      )
      .map((reporteVentasIndividual) => (
        <ListaReportesVentasIndividual
          key={reporteVentasIndividual._id}
          reporteVentasIndividual={reporteVentasIndividual}
        />
      ));
  }, [inputFecha]);

  return (
    <SidebarLayoutContaduria>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900">
              Reporte de ventas individual
            </h1>
            <p className="mt-2 text-sm text-gray-700">
              Aquí podras ver los Reporte de ventas individual para la empresa.
            </p>
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
                        Lugar De Venta
                      </th>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        Nombre Lugar De Venta
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
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        Correo Electrónico Cliente Frecuente
                      </th>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        Puntos usados Cliente Frecuente
                      </th>
                    </tr>
                  </thead>

                  {!change
                    ? reportesVentasIndividualMemo.map(
                        (reporteVentasIndividual) => (
                          <ListaReportesVentasIndividual
                            key={reporteVentasIndividual._id}
                            reporteVentasIndividual={reporteVentasIndividual}
                          />
                        )
                      )
                    : reportesVentasIndividualMemo
                        .filter(
                          (reporteVentasIndividual) =>
                            reporteVentasIndividual.fecha === inputNuevaFecha
                        )
                        .map((reporteVentasIndividual) => (
                          <ListaReportesVentasIndividual
                            key={reporteVentasIndividual._id}
                            reporteVentasIndividual={reporteVentasIndividual}
                          />
                        ))}
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SidebarLayoutContaduria>
  );
};

export default VerReporteVentasIndividual;

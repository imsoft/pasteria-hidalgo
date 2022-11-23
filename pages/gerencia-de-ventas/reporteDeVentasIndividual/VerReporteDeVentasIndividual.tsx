import { useContext, useMemo } from "react";
import Link from "next/link";

import { ReportesVentasIndividualContext } from "../../../context/gerencia-de-ventas/reporteVentasIndividual/ReportesVentasIndividualContext";
import ListaReportesVentasIndividual from "../../../components/ui/gerencia-de-ventas/ListaReportesDeVentaIndividual";

import { SidebarLayoutGerenciaVentas } from "../../../components/layouts/gerencia-de-ventas/SidebarLayoutGerenciaVentas";

const VerReporteDeVentasIndividual = () => {
  const { reportesVentasIndividual } = useContext(
    ReportesVentasIndividualContext
  );
  const reportesVentasIndividualMemo = useMemo(
    () => reportesVentasIndividual,
    [reportesVentasIndividual]
  );

  return (
    <SidebarLayoutGerenciaVentas>
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
                        Total De La Venta
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
                  {reportesVentasIndividualMemo.map(
                    (reporteVentasIndividual) => (
                      <ListaReportesVentasIndividual
                        key={reporteVentasIndividual._id}
                        reporteVentasIndividual={reporteVentasIndividual}
                      />
                    )
                  )}
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SidebarLayoutGerenciaVentas>
  );
};

export default VerReporteDeVentasIndividual;

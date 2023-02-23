import { useContext, useMemo } from "react";
import { SidebarLayoutContaduria } from "../../../components/layouts/contaduria/SidebarLayoutContaduria";
import { ReporteDeCompraContext } from "../../../context/gerencia-de-compras/reporteDeCompras";
import ListaReporteDeComprasContaduria from "../../../components/ui/contaduria/ListaReporteDeComprasContaduria";
import ListaReporteDeGanancias from '../../../components/ui/contaduria/ListaReporteDeGanancias';
import { AsignarComisionContext } from "../../../context/contaduria/asignarComision";

export default function ReporteGanancias() {
  const { reportesDeCompras } = useContext(ReporteDeCompraContext);
  const reportesDeComprasMemo = useMemo(
    () => reportesDeCompras,
    [reportesDeCompras]
  );

  const { asignarComisiones } = useContext(AsignarComisionContext);
  const asignarComisionesMemo = useMemo(
    () => asignarComisiones,
    [asignarComisiones]
  );

  return (
    <SidebarLayoutContaduria>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900">
              Reporte de ganancias
            </h1>
            <p className="mt-2 text-sm text-gray-700">
              Aquí podras ver los reportes de ganancia para la empresa.
            </p>
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
                        Franquicia o Sucursal
                      </th>

                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        Franquicia
                      </th>

                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        Sucursal
                      </th>

                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        Comprado
                      </th>

                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        Vendido
                      </th>

                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        Diferencia
                      </th>

                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        Estado
                      </th>
                    </tr>
                  </thead>
                  {/* {reportesDeComprasMemo.map((reporteDeCompra) => (
                    <ListaReporteDeComprasContaduria
                      key={reporteDeCompra._id}
                      reporteDeCompra={reporteDeCompra}
                    />
                  ))} */}
                  {asignarComisionesMemo.map((asignarComision) => (
                    <ListaReporteDeGanancias
                      key={asignarComision._id}
                      asignarComision={asignarComision}
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
}

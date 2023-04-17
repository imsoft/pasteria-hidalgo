import { useContext, useMemo } from "react";

import { SidebarLayoutGerenciaOperativa } from "../../../components/layouts/gerencia-operativa/SidebarLayoutGerenciaOperativa";
import ListaManejosDeAlmacen from "../../../components/ui/gerencia-operativa/ListaManejoDeAlmacen";
import { ManejosDeAlmacenContext } from "../../../context/gerencia-operativa/manejoDeAlmacen";

const VerReportesDeCompras = () => {
  const { manejosDeAlmacen } = useContext(ManejosDeAlmacenContext);
  const manejosDeAlmacenMemo = useMemo(
    () => manejosDeAlmacen,
    [manejosDeAlmacen]
  );

  return (
    <SidebarLayoutGerenciaOperativa>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900">
              Manejo de almacen
            </h1>
            <p className="mt-2 text-sm text-gray-700">
              Aquí podras ver los manejos de almacen para la empresa.
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
                        Materia Prima
                      </th>

                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        Unidades
                      </th>

                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        Temperatura
                      </th>

                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        Cantidad
                      </th>
                    </tr>
                  </thead>
                  {manejosDeAlmacenMemo.map((manejoDeAlmacen) => (
                    <ListaManejosDeAlmacen
                      key={manejoDeAlmacen._id}
                      manejoDeAlmacen={manejoDeAlmacen}
                    />
                  ))}
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SidebarLayoutGerenciaOperativa>
  );
};

export default VerReportesDeCompras;

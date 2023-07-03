import React, { useContext, useEffect, useMemo } from "react";
import ListaAcondicionamientoDeSucursales from "../../../components/ui/contaduria/ListaAcondicionamientoDeSucursales";
import { AcondicionamientoDeSucursalesContext } from "../../../context/gerencia-de-compras/acondicionamientoDeSucursales/AcondicionamientoDeSucursalesContext";
import { SidebarLayoutContaduria } from "../../../components/layouts/contaduria/SidebarLayoutContaduria";

const VerAcondicionamiendoDeSucursales = () => {
  const {
    acondicionamientoDeSucursales,
    refreshAcondicionamientoDeSucursales,
  } = useContext(AcondicionamientoDeSucursalesContext);
  const acondicionamientoDeSucursalesMemo = useMemo(
    () => acondicionamientoDeSucursales,
    [acondicionamientoDeSucursales]
  );

  useEffect(() => {
    refreshAcondicionamientoDeSucursales();
  }, []);

  return (
    <>
      <SidebarLayoutContaduria>
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-xl font-semibold text-gray-900">
                Acondicionamiendo de sucursales
              </h1>
              <p className="mt-2 text-sm text-gray-700">
                Aquí podras ver los acondicionamiento de sucursales para la
                empresa.
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
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Sucursal
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
                          Producto
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Fecha De Compra
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Descripción Del Producto
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Fecha Estimada De Entrega
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Proveedor
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Factura
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Precio De Compra
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Cantidad
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Total Acomulado
                        </th>
                      </tr>
                    </thead>
                    {acondicionamientoDeSucursalesMemo.map(
                      (acondicionamientoDeSucursal) => (
                        <ListaAcondicionamientoDeSucursales
                          key={acondicionamientoDeSucursal._id}
                          acondicionamientoDeSucursal={
                            acondicionamientoDeSucursal
                          }
                        />
                      )
                    )}
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarLayoutContaduria>
    </>
  );
};

export default VerAcondicionamiendoDeSucursales;

import { useContext, useEffect, useMemo } from "react";
import Link from "next/link";

import { ApartadosJuridicosContext } from "../../../context/gerencia-operativa/apartadoJuridico/ApartadosJuridicosContext";
import ListaApartadosJuridicos from "../../../components/ui/gerencia-operativa/ListaApartadoJuridico";

import { SidebarLayoutGerenciaOperativa } from "../../../components/layouts/gerencia-operativa/SidebarLayoutGerenciaOperativa";

const VerApartadosJuridicos = () => {
  const { apartadosJuridicos, refreshApartadosJuridicos } = useContext(ApartadosJuridicosContext);
  const apartadosJuridicosMemo = useMemo(
    () => apartadosJuridicos,
    [apartadosJuridicos]
  );

  useEffect(() => {
    refreshApartadosJuridicos();
  }, []);

  return (
    <SidebarLayoutGerenciaOperativa>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900">
              Apartados Juridicos
            </h1>
            <p className="mt-2 text-sm text-gray-700">
              Aquí podras ver los apartados juridicos para la empresa.
            </p>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-primary-yellow px-4 py-2 text-sm font-medium text-gray-600 shadow-sm hover:bg-primary-blue hover:text-white focus:outline-none focus:ring-2 focus:ring-primary-yellow focus:ring-offset-2 sm:w-auto"
            >
              <Link
                href={
                  "/gerencia-operativa/apartadoJuridico/AgregarApartadoJuridico"
                }
              >
                Agregar Apartado Juridico
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
                        Sucursal O Franquicia
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Nombre sucursal o franquicia
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Nombre del archivo
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Url del archivo
                      </th>
                    </tr>
                  </thead>
                  {apartadosJuridicosMemo.map((apartadoJuridico) => (
                    <ListaApartadosJuridicos
                      key={apartadoJuridico._id}
                      apartadoJuridico={apartadoJuridico}
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

export default VerApartadosJuridicos;

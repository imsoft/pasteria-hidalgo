import { useContext, useMemo } from "react";
import Link from "next/link";

import { SidebarLayoutRecursosHumanos } from "../../../components/layouts/recursos-humanos/SidebarLayoutRecursosHumanos";
import ListaPersonalesActivos from '../../../components/ui/recursos-humanos/ListaPersonalActivo';

import { PersonalActivoContext } from '../../../context/recursos-humanos/personalActivo/PersonalActivoContext';

const VerPersonalesActivos = () => {
  const { personasActivas } = useContext(PersonalActivoContext);
  const personalesActivosMemo = useMemo(() => personasActivas, [personasActivas]);

  return (
    <SidebarLayoutRecursosHumanos>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900">Personal Activo</h1>
            <p className="mt-2 text-sm text-gray-700">
              Aquí podras ver las personas activas para la empresa.
            </p>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-primary-yellow px-4 py-2 text-sm font-medium text-gray-600 shadow-sm hover:bg-primary-blue hover:text-white focus:outline-none focus:ring-2 focus:ring-primary-yellow focus:ring-offset-2 sm:w-auto"
            >
              <Link href={"/recursos-humanos/personalActivo/AgregarPersonalActivo"}>
                <a>Agregar Personal Activo</a>
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
                        Nombre
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Puesto
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Fecha De Contratación
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        No. Contrato
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        No. Expediente
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Baja Temporal
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Comentarios
                      </th>
                    </tr>
                  </thead>
                  {personalesActivosMemo.map((personalActivo) => (
                    <ListaPersonalesActivos
                      key={personalActivo._id}
                      personalActivo={personalActivo}
                    />
                  ))}
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SidebarLayoutRecursosHumanos>
  );
};

export default VerPersonalesActivos;

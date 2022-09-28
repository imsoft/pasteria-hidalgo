import { useContext, useMemo } from "react";
import Link from "next/link";
import { ProveedoresContext } from '../../../context/gerencia-de-compras/manejoDeProveedores/ManejoDeProveedoresContext';
import { SidebarLayoutGerenciaCompras } from '../../../components/layouts/gerencia-de-compras/SidebarLayoutGerenciaCompras';
import ListaProveedores from '../../../components/ui/gerencia-de-compras/ListaManejoDeProveedores';

const VerCandidatos = () => {
  const { proveedores } = useContext(ProveedoresContext);
  const proveedoresMemo = useMemo(() => proveedores, [proveedores]);

  return (
    <SidebarLayoutGerenciaCompras>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900">Proveedores</h1>
            <p className="mt-2 text-sm text-gray-700">
              Aquí podras ver los proveedores para la empresa.
            </p>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-primary-yellow px-4 py-2 text-sm font-medium text-gray-600 shadow-sm hover:bg-primary-blue hover:text-white focus:outline-none focus:ring-2 focus:ring-primary-yellow focus:ring-offset-2 sm:w-auto"
            >
              <Link href={"/gerencia-de-compras/proveedores/AgregarProveedor"}>
                <a>Agregar Candidato</a>
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
                        Dirección
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Teléfono
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Horario Atención
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Productos Que Se Compran
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Entregas A Domicilio
                      </th>
                    </tr>
                  </thead>
                  {proveedoresMemo.map((proveedor) => (
                    <ListaProveedores
                      key={proveedor._id}
                      proveedor={proveedor}
                    />
                  ))}
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SidebarLayoutGerenciaCompras>
  );
};

export default VerCandidatos;

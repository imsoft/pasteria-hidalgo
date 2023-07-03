import Link from "next/link";
import { FC, useContext, useEffect, useMemo } from "react";
import { SidebarLayoutContaduria } from "../../../components/layouts/contaduria/SidebarLayoutContaduria";
import { AsignarPreciosContext } from "../../../context/gerencia-de-compras/asignarPrecios";
import { AsignarPrecio } from "../../../interfaces/asignarPrecio";
import ListaPrecioMaximo from '../../../components/ui/contaduria/ListaPrecioMaximo';

interface Props {
  asignarPrecio: AsignarPrecio;
}

const VerPrecioMaximo: FC<Props> = ({ asignarPrecio }) => {
  const { asignarPrecios, refreshAsignarPrecio } = useContext(AsignarPreciosContext);
  const asignarPreciosMemo = useMemo(() => asignarPrecios, [asignarPrecios]);

  useEffect(() => {
    refreshAsignarPrecio();
  }, []);

  return (
    <>
      <SidebarLayoutContaduria>
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-xl font-semibold text-gray-900">
                Asignar Precios
              </h1>
              <p className="mt-2 text-sm text-gray-700">
                Aquí podras ver los precios asignados para la empresa.
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
                          Nombre
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Precio Máximo
                        </th>
                      </tr>
                    </thead>
                    {asignarPreciosMemo.map((asignarPrecio) => (
                      <ListaPrecioMaximo
                        key={asignarPrecio._id}
                        asignarPrecio={asignarPrecio}
                      />
                    ))}
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

export default VerPrecioMaximo;

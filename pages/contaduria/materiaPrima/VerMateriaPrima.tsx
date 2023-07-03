import { useContext, useEffect, useMemo } from "react";
import { MateriasPrimasContext } from "../../../context/gerencia-operativa/materiaPrima/MateriaPrimaContext";
import { SidebarLayoutContaduria } from "../../../components/layouts/contaduria/SidebarLayoutContaduria";
import ListaMateriaPrima from "../../../components/ui/contaduria/ListaMateriaPrima";

const VerMateriaPrima = () => {
  const { materiasPrimas, refreshMateriasPrimas } = useContext(
    MateriasPrimasContext
  );
  const materiasPrimasMemo = useMemo(() => materiasPrimas, [materiasPrimas]);

  useEffect(() => {
    refreshMateriasPrimas();
  }, []);

  return (
    <SidebarLayoutContaduria>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900">
              Materia prima
            </h1>
            <p className="mt-2 text-sm text-gray-700">
              Aquí podras ver los materias primas para la empresa.
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
                        Temperatura
                      </th>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        Unidades
                      </th>
                    </tr>
                  </thead>
                  {materiasPrimasMemo.map((materiaPrima) => (
                    <ListaMateriaPrima
                      key={materiaPrima._id}
                      materiaPrima={materiaPrima}
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

export default VerMateriaPrima;

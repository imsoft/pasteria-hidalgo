import { ChangeEvent, useContext, useEffect, useMemo, useState } from "react";
import { SidebarLayoutContaduria } from "../../../components/layouts/contaduria/SidebarLayoutContaduria";
import { ReporteDeCompraContext } from "../../../context/gerencia-de-compras/reporteDeCompras";
import ListaReporteDeGanancias from "../../../components/ui/contaduria/ListaReporteDeGanancias";
import { AsignarComisionContext } from "../../../context/contaduria/asignarComision";

const mesesDelAno: string[] = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

const years: string[] = ["2023", "2024", "2025"];

export default function ReporteGanancias() {
  const [inputMes, setInputMes] = useState("");
  const [inputAnio, setInputAnio] = useState("");

  const [change, setChange] = useState(false);

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

  const onTextFieldChangedMes = (event: ChangeEvent<HTMLSelectElement>) => {
    setInputMes(event.target.value);
  };

  const onTextFieldChangedAnio = (event: ChangeEvent<HTMLSelectElement>) => {
    setInputAnio(event.target.value);
  };

  const mostrarTodos = () => {
    setChange(false);
  };

  useEffect(() => {
    setChange(true);
    asignarComisionesMemo
      .filter((asignarComision) => asignarComision.mes === inputMes)
      .filter((asignarComision) => asignarComision.anio === inputAnio)
      .map((asignarComision) => (
        <ListaReporteDeGanancias
          key={asignarComision._id}
          asignarComision={asignarComision}
        />
      ));
  }, [inputMes, inputAnio]);

  useEffect(() => {
    setChange(false);
  }, []);

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
          <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
            <div className="grid grid-cols-3 gap-6">
              <div className="col-span-3 sm:col-span-1">
                <label
                  htmlFor="CmbSucursal"
                  className="block text-sm font-medium text-gray-700"
                >
                  Mes
                </label>
                <select
                  id="CmbSucursal"
                  name="CmbSucursal"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm rounded-md"
                  defaultValue="Selecciona un producto..."
                  onChange={onTextFieldChangedMes}
                  // onBlur={() => setTouched(true)}
                >
                  <option hidden>Seleccione una opción...</option>
                  {mesesDelAno.map((mes) => (
                    <option key={mes}>{mes}</option>
                  ))}
                </select>
              </div>

              <div className="col-span-3 sm:col-span-1">
                <label
                  htmlFor="TxtAnio"
                  className="block text-sm font-medium text-gray-700"
                >
                  Año
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <select
                    id="CmbSucursal"
                    name="CmbSucursal"
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm rounded-md"
                    defaultValue="Selecciona un producto..."
                    onChange={onTextFieldChangedAnio}
                    // onBlur={() => setTouched(true)}
                  >
                    <option hidden>Seleccione una opción...</option>
                    {years.map((year) => (
                      <option key={year}>{year.toString()}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="col-span-3 sm:col-span-1">
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
            </div>
          </div>

          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      {/* <th
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
                      </th> */}

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
                        Sucursal
                      </th>

                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        Total ventas
                      </th>

                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        Total compras
                      </th>

                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        Balance
                      </th>

                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        Estado
                      </th>
                    </tr>
                  </thead>

                  {!change
                    ? asignarComisionesMemo.map((asignarComision) => (
                        <ListaReporteDeGanancias
                          key={asignarComision._id}
                          asignarComision={asignarComision}
                        />
                      ))
                    : asignarComisionesMemo
                        .filter(
                          (asignarComision) => asignarComision.mes === inputMes
                        )
                        .filter(
                          (asignarComision) =>
                            asignarComision.anio === inputAnio
                        )
                        .map((asignarComision) => (
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

import { ChangeEvent, useContext, useMemo, useState } from "react";
import { SidebarLayoutContaduria } from "../../../components/layouts/contaduria/SidebarLayoutContaduria";
import { useRouter } from "next/router";

import { AsignarComisionContext } from "../../../context/contaduria/asignarComision/AsignarComisionContext";
import { SucursalesYFranquiciasContext } from "../../../context/gerencia-operativa/sucursalYFranquicia";

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

const today = new Date();
const currentYear = today.getFullYear();

export default function AgregarAsignarComisiones() {
  const router = useRouter();

  const { agregarNuevoAsignarComision } = useContext(AsignarComisionContext);

  const { sucursalesYFranquicias } = useContext(SucursalesYFranquiciasContext);
  const sucursalesYFranquiciasMemo = useMemo(
    () => sucursalesYFranquicias,
    [sucursalesYFranquicias]
  );

  const [inputSucursalOFranquicia, setInputSucursalOFranquicia] = useState("");
  const [inputNombreSucursalOFranquicia, setInputNombreSucursalOFranquicia] =
    useState("");
  const [inputMes, setInputMes] = useState("");
  const [inputAnio, setInputAnio] = useState(currentYear.toString());
  const [inputMinimoDeLaMeta, setInputMinimoDeLaMeta] = useState(0);

  const [touched, setTouched] = useState(false);

  const onSave = () => {
    if (
      inputSucursalOFranquicia.length === 0 &&
      inputNombreSucursalOFranquicia.length === 0 &&
      inputMinimoDeLaMeta === 0 &&
      inputMes.length === 0 &&
      inputAnio.length === 0
    )
      return;

    agregarNuevoAsignarComision(
      inputSucursalOFranquicia,
      inputNombreSucursalOFranquicia,
      inputMes,
      inputAnio,
      inputMinimoDeLaMeta,
      true
    );

    router.push("/contaduria/asignarComisiones/VerAsignarComisiones");

    setInputSucursalOFranquicia("");
    setInputNombreSucursalOFranquicia("");
    setInputMinimoDeLaMeta(0);
    setInputMes("");
    setInputAnio("");
  };

  const onTextFieldChangedNombreSucursalOFranquicia = (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    setInputNombreSucursalOFranquicia(event.target.value);
  };

  const onTextFieldChangedSucursalOFranquicia = (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    setInputSucursalOFranquicia(event.target.value);
  };

  const onTextFieldChangedMes = (event: ChangeEvent<HTMLSelectElement>) => {
    setInputMes(event.target.value);
  };

  const onTextFieldChangedAnio = (event: ChangeEvent<HTMLInputElement>) => {
    setInputAnio(event.target.value);
  };

  const onTextFieldChangedMinimoDeLaMeta = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputMinimoDeLaMeta(parseInt(event.target.value));
  };

  return (
    <SidebarLayoutContaduria>
      <form>
        <div className="shadow sm:rounded-md sm:overflow-hidden">
          <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Asignar comisiones
              </h3>
              <p className="mt-1 text-sm text-gray-500">¡Hola!</p>
            </div>
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="CmbFranquicia"
                  className="block text-sm font-medium text-gray-700"
                >
                  ¿Sucursal o Franquicia?
                </label>

                <div className="col-span-6 sm:col-span-3">
                  <select
                    id="CmbNombre"
                    name="CmbNombre"
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm rounded-md"
                    defaultValue="Selecciona un producto..."
                    onChange={onTextFieldChangedSucursalOFranquicia}
                    onBlur={() => setTouched(true)}
                  >
                    <option hidden>Seleccione una opción...</option>
                    <option>Sucursal</option>
                    <option>Franquicia</option>
                  </select>
                </div>
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="CmbFranquicia"
                  className="block text-sm font-medium text-gray-700"
                >
                  {inputSucursalOFranquicia === "Sucursal"
                    ? "Sucursal"
                    : inputSucursalOFranquicia === "Franquicia"
                    ? "Franquicia"
                    : "Primero seleccione si es franquicia o sucursal"}
                </label>
                <select
                  id="CmbFranquicia"
                  name="CmbFranquicia"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm rounded-md"
                  defaultValue="Selecciona un producto..."
                  onChange={onTextFieldChangedNombreSucursalOFranquicia}
                  onBlur={() => setTouched(true)}
                >
                  <option hidden>
                    Seleccione la{" "}
                    {inputSucursalOFranquicia === "Sucursal"
                      ? "Sucursal"
                      : inputSucursalOFranquicia === "Franquicia"
                      ? "Franquicia"
                      : "Primero seleccione si es franquicia o sucursal"}
                    ...
                  </option>
                  {sucursalesYFranquiciasMemo
                    .filter(
                      (sucursalesYFranquicias) =>
                        sucursalesYFranquicias.sucursalOFranquicia ===
                        inputSucursalOFranquicia
                    )
                    .map((sucursalesYFranquicias) => (
                      <option
                        key={sucursalesYFranquicias.nombreSucursalOFranquicia}
                      >
                        {sucursalesYFranquicias.nombreSucursalOFranquicia}
                      </option>
                    ))}
                </select>
              </div>

              <div className="col-span-6 sm:col-span-3">
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
                  onBlur={() => setTouched(true)}
                >
                  <option hidden>Seleccione una opción...</option>
                  {mesesDelAno.map((mes) => (
                    <option key={mes}>{mes}</option>
                  ))}
                </select>
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtAnio"
                  className="block text-sm font-medium text-gray-700"
                >
                  Año
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    type="text"
                    name="TxtAnio"
                    id="TxtAnio"
                    onChange={onTextFieldChangedAnio}
                    value={inputAnio}
                    className="focus:ring-primary-yellow focus:border-primary-yellow block w-full sm:text-sm border-gray-300 rounded-md"
                    aria-describedby="price-currency"
                    readOnly
                  />
                </div>
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtMinimoDeLaMeta"
                  className="block text-sm font-medium text-gray-700"
                >
                  Mínimo de la meta
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="text"
                    name="TxtMinimoDeLaMeta"
                    id="TxtMinimoDeLaMeta"
                    onChange={onTextFieldChangedMinimoDeLaMeta}
                    className="focus:ring-primary-yellow focus:border-primary-yellow block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                    aria-describedby="price-currency"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span
                      className="text-gray-500 sm:text-sm"
                      id="price-currency"
                    >
                      MXN
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
            <button
              type="button"
              className="bg-primary-blue border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-primary-yellow hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-yellow"
              onClick={onSave}
            >
              Guardar
            </button>
          </div>
        </div>
      </form>
    </SidebarLayoutContaduria>
  );
}

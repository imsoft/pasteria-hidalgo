import { ChangeEvent, useContext, useMemo, useState } from "react";

import { MantenimientosContext } from "../../../context/gerencia-operativa/mantenimiento/MantenimientoContext";
import { SidebarLayoutGerenciaOperativa } from "../../../components/layouts/gerencia-operativa/SidebarLayoutGerenciaOperativa";

import { useRouter } from "next/router";
import { SucursalesYFranquiciasContext } from "../../../context/gerencia-operativa/sucursalYFranquicia";

export default function AgregarMantenimiento() {
  const router = useRouter();
  const { agregarNuevoMantenimiento } = useContext(MantenimientosContext);
  const { sucursalesYFranquicias } = useContext(SucursalesYFranquiciasContext);
  const sucursalesYFranquiciasMemo = useMemo(
    () => sucursalesYFranquicias,
    [sucursalesYFranquicias]
  );

  const [inputNombreMaquina, setInputNombreMaquina] = useState("");
  const [inputProveedor, setInputProveedor] = useState("");
  const [inputFechaDeGarantia, setInputFechaDeGarantia] = useState("");
  const [inputFechaDeMantenimiento, setInputFechaDeMantenimiento] =
    useState("");
  const [
    inputModificacionDeMantenimiento,
    setInputModificacionDeMantenimiento,
  ] = useState("");
  const [inputSucursalOFranquicia, setInputSucursalOFranquicia] = useState("");
  const [inputNombreSucursalOFranquicia, setInputNombreSucursalOFranquicia] =
    useState("");

  const [touched, setTouched] = useState(false);

  const onTextFieldChangedNombreMaquina = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputNombreMaquina(event.target.value);
  };

  const onTextFieldChangedProveedor = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputProveedor(event.target.value);
  };

  const onTextFieldChangedFechaDeGarantia = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputFechaDeGarantia(event.target.value);
  };

  const onTextFieldChangedFechaDeMantenimiento = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputFechaDeMantenimiento(event.target.value);
  };

  const onTextFieldChangedModificacionDeMantenimiento = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputModificacionDeMantenimiento(event.target.value);
  };

  const onTextFieldChangedSucursalOFranquicia = (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    setInputSucursalOFranquicia(event.target.value);
  };

  const onTextFieldChangedNombreSucursalOFranquicia = (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    setInputNombreSucursalOFranquicia(event.target.value);
  };

  const onSave = () => {
    if (
      inputSucursalOFranquicia.length === 0 &&
      inputNombreSucursalOFranquicia.length === 0 &&
      inputNombreMaquina.length === 0 &&
      inputProveedor.length === 0 &&
      inputFechaDeGarantia.length === 0 &&
      inputFechaDeMantenimiento.length === 0 &&
      inputModificacionDeMantenimiento.length === 0
    )
      return;

    agregarNuevoMantenimiento(
      inputSucursalOFranquicia,
      inputNombreSucursalOFranquicia,
      inputNombreMaquina,
      inputProveedor,
      inputFechaDeGarantia,
      inputFechaDeMantenimiento,
      inputModificacionDeMantenimiento,
      true
    );

    router.push("/gerencia-operativa/mantenimiento/VerMantenimiento");

    setTouched(false);
    setInputSucursalOFranquicia("");
    setInputNombreSucursalOFranquicia("");
    setInputNombreMaquina("");
    setInputProveedor("");
    setInputFechaDeGarantia("");
    setInputFechaDeMantenimiento("");
    setInputModificacionDeMantenimiento("");
  };

  return (
    <SidebarLayoutGerenciaOperativa>
      <form>
        <div className="shadow sm:rounded-md sm:overflow-hidden">
          <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Mantenimiento
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
                  htmlFor="TxtNombreMaquina"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nombre Maquina
                </label>
                <input
                  type="text"
                  name="TxtNombreMaquina"
                  id="TxtNombreMaquina"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  onChange={onTextFieldChangedNombreMaquina}
                  onBlur={() => setTouched(true)}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtProveedor"
                  className="block text-sm font-medium text-gray-700"
                >
                  Proveedor
                </label>
                <input
                  type="text"
                  name="TxtProveedor"
                  id="TxtProveedor"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  onChange={onTextFieldChangedProveedor}
                  onBlur={() => setTouched(true)}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtFechaDeGarantia"
                  className="block text-sm font-medium text-gray-700"
                >
                  Fecha De Garantía
                </label>
                <input
                  type="date"
                  name="TxtFechaDeGarantia"
                  id="TxtFechaDeGarantia"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  onChange={onTextFieldChangedFechaDeGarantia}
                  onBlur={() => setTouched(true)}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtFechaDeMantenimiento"
                  className="block text-sm font-medium text-gray-700"
                >
                  Fecha De Mantenimiento
                </label>
                <input
                  type="date"
                  name="TxtFechaDeMantenimiento"
                  id="TxtFechaDeMantenimiento"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  onChange={onTextFieldChangedFechaDeMantenimiento}
                  onBlur={() => setTouched(true)}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtModificacionDeMantenimiento"
                  className="block text-sm font-medium text-gray-700"
                >
                  Modificación De Mantenimiento
                </label>
                <input
                  type="text"
                  name="TxtModificacionDeMantenimiento"
                  id="TxtModificacionDeMantenimiento"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  onChange={onTextFieldChangedModificacionDeMantenimiento}
                  onBlur={() => setTouched(true)}
                />
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
    </SidebarLayoutGerenciaOperativa>
  );
}

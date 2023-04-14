import React, { ChangeEvent, useContext, useMemo, useState } from "react";
import { useRouter } from "next/router";

import { CheckInPersonalContext } from "../../../context/recursos-humanos/checkInPersonal";
import { PersonalActivoContext } from "../../../context/recursos-humanos/personalActivo/PersonalActivoContext";

import { SidebarLayoutRecursosHumanos } from "../../../components/layouts/recursos-humanos/SidebarLayoutRecursosHumanos";

import { SucursalesYFranquiciasContext } from "../../../context/gerencia-operativa/sucursalYFranquicia";

const tiempoTranscurrido = Date.now();
const hoy = new Date(tiempoTranscurrido);

export default function CheckInDePersonal() {
  const router = useRouter();

  const { agregarCheckInPersonal } = useContext(CheckInPersonalContext);
  const { sucursalesYFranquicias } = useContext(SucursalesYFranquiciasContext);
  const sucursalesYFranquiciasMemo = useMemo(
    () => sucursalesYFranquicias,
    [sucursalesYFranquicias]
  );

  const { personasActivas } = useContext(PersonalActivoContext);
  const personasActivasMemo = useMemo(() => personasActivas, [personasActivas]);

  const [inputSucursalOFranquicia, setInputSucursalOFranquicia] = useState("");
  const [inputNombreSucursalOFranquicia, setInputNombreSucursalOFranquicia] =
    useState("");
  const [inputNombre, setInputNombre] = useState("");
  const [inputFecha, setInputFecha] = useState(hoy.toLocaleDateString());
  const [inputHoraDeIngreso, setInputHoraDeIngreso] = useState(
    hoy.toLocaleTimeString()
  );
  const [inputHoraDeSalida, setInputHoraDeSalida] = useState("");

  const [touched, setTouched] = useState(false);

  const onTextFieldChangedNombreSucursalOFranquicia = (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    setInputNombreSucursalOFranquicia(event.target.value);
  };

  const onTextFieldChangedNombre = (event: ChangeEvent<HTMLSelectElement>) => {
    setInputNombre(event.target.value);
  };

  const onTextFieldChangedFecha = (event: ChangeEvent<HTMLInputElement>) => {
    setInputFecha(event.target.value);
  };

  const onTextFieldChangedHoraDeIngreso = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputHoraDeIngreso(event.target.value);
  };

  const onTextFieldChangedHoraDeSalida = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputHoraDeSalida(event.target.value);
  };

  const onTextFieldChangedSucursalOFranquicia = (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    setInputSucursalOFranquicia(event.target.value);
  };

  const onSave = () => {
    if (
      inputNombreSucursalOFranquicia.length === 0 &&
      inputNombre.length === 0 &&
      inputFecha.length === 0 &&
      inputHoraDeIngreso.length === 0 &&
      inputHoraDeSalida.length === 0 &&
      inputSucursalOFranquicia.length === 0
    )
      return;

    agregarCheckInPersonal(
      inputSucursalOFranquicia,
      inputNombreSucursalOFranquicia,
      inputNombre,
      inputFecha,
      inputHoraDeIngreso,
      inputHoraDeSalida,
      true
    );

    router.push("/recursos-humanos/checkInPersonal/VerCheckInPersonal");

    setInputSucursalOFranquicia("");
    setInputNombreSucursalOFranquicia("");
    setInputNombre("");
    setInputFecha("");
    setInputHoraDeIngreso("");
    setInputHoraDeSalida("");
  };

  return (
    <SidebarLayoutRecursosHumanos>
      <form>
        <div className="shadow sm:rounded-md sm:overflow-hidden">
          <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Check In De Personal
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
                  htmlFor="CmbNombre"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nombre
                </label>
                <select
                  id="CmbNombre"
                  name="CmbNombre"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm rounded-md"
                  defaultValue="Selecciona un producto..."
                  onChange={onTextFieldChangedNombre}
                  onBlur={() => setTouched(true)}
                >
                  <option hidden>Seleccione el nombre...</option>
                  {personasActivasMemo.map((personaActiva) => (
                    <option key={personaActiva._id}>
                      {personaActiva.nombre}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtFecha"
                  className="block text-sm font-medium text-gray-700"
                >
                  Fecha
                </label>
                <input
                  type="text"
                  name="TxtFecha"
                  id="TxtFecha"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  value={inputFecha}
                  onBlur={() => setTouched(true)}
                  readOnly
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtHoraDeIngreso"
                  className="block text-sm font-medium text-gray-700"
                >
                  Hora De Ingreso
                </label>
                <input
                  type="text"
                  name="TxtHoraDeIngreso"
                  id="TxtHoraDeIngreso"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  value={inputHoraDeIngreso}
                  onBlur={() => setTouched(true)}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtHoraDeSalida"
                  className="block text-sm font-medium text-gray-700"
                >
                  Hora De Salida
                </label>
                <input
                  type="time"
                  name="TxtHoraDeSalida"
                  id="TxtHoraDeSalida"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  onChange={onTextFieldChangedHoraDeSalida}
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
    </SidebarLayoutRecursosHumanos>
  );
}

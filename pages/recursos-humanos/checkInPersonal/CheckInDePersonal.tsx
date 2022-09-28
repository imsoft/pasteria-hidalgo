import React, { ChangeEvent, useContext, useState } from "react";
import { SidebarLayoutRecursosHumanos } from "../../../components/layouts/recursos-humanos/SidebarLayoutRecursosHumanos";
import { CheckInPersonalContext } from "../../../context/recursos-humanos/checkInPersonal";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function CheckInDePersonal() {

  const { agregarCheckInPersonal } =
    useContext(CheckInPersonalContext);

  const [inputIdFranquicia, setInputIdFranquicia] = useState('');
  const [inputIdSucursal, setInputIdSucursal] = useState('');
  const [inputNombre, setInputNombre] = useState('');
  const [inputFecha, setInputFecha] = useState('');
  const [inputIdPersonal, setInputIdPersonal] = useState('');
  const [inputHoraDeIngreso, setInputHoraDeIngreso] = useState('');
  const [inputHoraDeSalida, setInputHoraDeSalida] = useState('');

  const [touched, setTouched] = useState(false);

  const MySwal = withReactContent(Swal);

  // const [touched, setTouched] = useState(false);
  // const esIdFranquiciaValido = useMemo( () => inputIdFranquicia.length <= 0 && touched, [inputIdFranquicia, touched] );
  // const esIdSucursalValido = useMemo( () => inputIdSucursal.length <= 0 && touched, [inputIdSucursal, touched] );
  // const esNombreValido = useMemo( () => inputNombre.length <= 0 && touched, [inputNombre, touched] );
  // const esFechaValido = useMemo( () => inputFecha.length <= 0 && touched, [inputFecha, touched] );
  // const esIdPersonalValido = useMemo( () => inputIdPersonal.length <= 0 && touched, [inputIdPersonal, touched] );
  // const esHoraDeIngresoValido = useMemo( () => inputHoraDeIngreso.length <= 0 && touched, [inputHoraDeIngreso, touched] );
  // const esHoraDeSalidaValido = useMemo( () => inputHoraDeSalida.length <= 0 && touched, [inputHoraDeSalida, touched] );

  const onTextFieldChangedIdFranquicia = (event: ChangeEvent<HTMLInputElement>) => {
    setInputNombre(event.target.value);
  };

  const onTextFieldChangedIdSucursal = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputIdFranquicia(event.target.value);
  };

  const onTextFieldChangedNombre = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputIdSucursal(event.target.value);
  };

  const onTextFieldChangedFecha = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputNombre(event.target.value);
  };

  const onTextFieldChangedIdPersonal = (event: ChangeEvent<HTMLInputElement>) => {
    setInputFecha(event.target.value);
  };

  const onTextFieldChangedHoraDeIngreso = (event: ChangeEvent<HTMLInputElement>) => {
    setInputIdPersonal(event.target.value);
  };

  const onTextFieldChangedHoraDeSalida = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputHoraDeIngreso(event.target.value);
  };

  const onSave = () => {
    if (
      inputIdFranquicia.length === 0 &&
      inputIdSucursal.length === 0 &&
      inputNombre.length === 0 &&
      inputFecha.length === 0 &&
      inputIdPersonal.length === 0 &&
      inputHoraDeIngreso.length === 0 &&
      inputHoraDeSalida.length === 0
    )
      return;

      agregarCheckInPersonal(
      inputIdFranquicia,
      inputIdSucursal,
      inputNombre,
      inputFecha,
      inputIdPersonal,
      inputHoraDeIngreso,
      inputHoraDeSalida,
      true
    );

    MySwal.fire({
      position: "top-end",
      icon: "success",
      title: "Check In De Personal Agregado",
      showConfirmButton: false,
      timer: 5000,
    });

    setInputIdFranquicia("");
    setInputIdSucursal("");
    setInputNombre("");
    setInputFecha("");
    setInputIdPersonal("");
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
                Agregar Check In De Personal
              </h3>
              <p className="mt-1 text-sm text-gray-500">¡Hola!</p>
            </div>
            <div className="grid grid-cols-6 gap-6">

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtIdFranquicia"
                  className="block text-sm font-medium text-gray-700"
                >
                  Id Franquicia
                </label>
                <input
                  type="text"
                  name="TxtIdFranquicia"
                  id="TxtIdFranquicia"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  onChange={onTextFieldChangedIdFranquicia}
                  onBlur={() => setTouched(true)}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtIdSucursal"
                  className="block text-sm font-medium text-gray-700"
                >
                  Id Sucursal
                </label>
                <input
                  type="text"
                  name="TxtIdSucursal"
                  id="TxtIdSucursal"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  onChange={onTextFieldChangedIdSucursal}
                  onBlur={() => setTouched(true)}
                />
              </div>
              
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtNombre"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nombre
                </label>
                <input
                  type="text"
                  name="TxtNombre"
                  id="TxtNombre"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  onChange={onTextFieldChangedNombre}
                  onBlur={() => setTouched(true)}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtFecha"
                  className="block text-sm font-medium text-gray-700"
                >
                  Fecha
                </label>
                <input
                  type="date"
                  name="TxtFecha"
                  id="TxtFecha"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  onChange={onTextFieldChangedFecha}
                  onBlur={() => setTouched(true)}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtIdPersonal"
                  className="block text-sm font-medium text-gray-700"
                >
                  Id Personal
                </label>
                <input
                  type="date"
                  name="TxtIdPersonal"
                  id="TxtIdPersonal"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  onChange={onTextFieldChangedIdPersonal}
                  onBlur={() => setTouched(true)}
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
                  type="time"
                  name="TxtHoraDeIngreso"
                  id="TxtHoraDeIngreso"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  onChange={onTextFieldChangedHoraDeIngreso}
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
};

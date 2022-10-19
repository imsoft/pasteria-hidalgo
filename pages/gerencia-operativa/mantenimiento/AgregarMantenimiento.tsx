import { ChangeEvent, useContext, useState } from "react";

import { MantenimientosContext } from "../../../context/gerencia-operativa/mantenimiento/MantenimientoContext";
import { SidebarLayoutGerenciaOperativa } from "../../../components/layouts/gerencia-operativa/SidebarLayoutGerenciaOperativa";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function AgregarMantenimiento() {
  const { agregarNuevoMantenimiento } = useContext(MantenimientosContext);

  const [inputNombreMaquina, setInputNombreMaquina] = useState("");
  const [inputProveedor, setInputProveedor] = useState("");
  const [inputFechaDeGarantia, setInputFechaDeGarantia] = useState("");
  const [inputFechaDeMantenimiento, setInputFechaDeMantenimiento] =
    useState("");
  const [
    inputModificacionDeMantenimiento,
    setInputModificacionDeMantenimiento,
  ] = useState("");

  const [touched, setTouched] = useState(false);

  const MySwal = withReactContent(Swal);

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

  const onSave = () => {
    if (
      inputNombreMaquina.length === 0 &&
      inputProveedor.length === 0 &&
      inputFechaDeGarantia.length === 0 &&
      inputFechaDeMantenimiento.length === 0 &&
      inputModificacionDeMantenimiento.length === 0
    )
      return;

    agregarNuevoMantenimiento(
      inputNombreMaquina,
      inputProveedor,
      inputFechaDeGarantia,
      inputFechaDeMantenimiento,
      inputModificacionDeMantenimiento,
      true
    );

    MySwal.fire({
      position: "top-end",
      icon: "success",
      title: "Mantenimiento Agregado",
      showConfirmButton: false,
      timer: 5000,
    });

    setTouched(false);
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

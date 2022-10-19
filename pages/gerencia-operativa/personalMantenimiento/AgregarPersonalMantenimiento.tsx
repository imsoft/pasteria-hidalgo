import { ChangeEvent, useContext, useState } from "react";

import { PersonalesDeMantenimientoContext } from '../../../context/gerencia-operativa/personalDeMantenimiento/PersonalDeMantenimientoContext';
import { SidebarLayoutGerenciaOperativa } from "../../../components/layouts/gerencia-operativa/SidebarLayoutGerenciaOperativa";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function AgregarPersonalDeMantenimiento() {
  const { agregarNuevoPersonalDeMantenimiento } = useContext(PersonalesDeMantenimientoContext);

  const [inputNombre, setInputNombre] = useState("");
  const [inputOficio, setInputOficio] = useState("");
  const [inputDireccion, setInputDireccion] = useState("");
  

  const [touched, setTouched] = useState(false);

  const MySwal = withReactContent(Swal);

  const onTextFieldChangedNombre = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputNombre(event.target.value);
  };

  const onTextFieldChangedOficio = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputOficio(event.target.value);
  };

  const onTextFieldChangedDireccion = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputDireccion(event.target.value);
  };

  const onSave = () => {
    if (
      inputNombre.length === 0 &&
      inputOficio.length === 0 &&
      inputDireccion.length === 0
    )
      return;

    agregarNuevoPersonalDeMantenimiento(
      inputNombre,
      inputOficio,
      inputDireccion,
      true
    );

    MySwal.fire({
      position: "top-end",
      icon: "success",
      title: "Personal de mantenimiento Agregado",
      showConfirmButton: false,
      timer: 5000,
    });

    setTouched(false);
    setInputNombre("");
    setInputOficio("");
    setInputDireccion("");
  };

  return (
    <SidebarLayoutGerenciaOperativa>
      <form>
        <div className="shadow sm:rounded-md sm:overflow-hidden">
          <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Agregar Personal De Mantenimiento
              </h3>
              <p className="mt-1 text-sm text-gray-500">¡Hola!</p>
            </div>
            <div className="grid grid-cols-6 gap-6">

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
                  htmlFor="TxtOficio"
                  className="block text-sm font-medium text-gray-700"
                >
                  Oficio
                </label>
                <input
                  type="text"
                  name="TxtOficio"
                  id="TxtOficio"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  onChange={onTextFieldChangedOficio}
                  onBlur={() => setTouched(true)}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtDireccion"
                  className="block text-sm font-medium text-gray-700"
                >
                  Dirección
                </label>
                <input
                  type="text"
                  name="TxtDireccion"
                  id="TxtDireccion"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  onChange={onTextFieldChangedDireccion}
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

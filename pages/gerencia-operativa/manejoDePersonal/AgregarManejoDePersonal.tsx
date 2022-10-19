import { ChangeEvent, useContext, useState } from 'react';

import { ManejosDePersonalContext } from '../../../context/gerencia-operativa/manejoDePersonal/ManejoDePersonalContext';

import { SidebarLayoutGerenciaOperativa } from '../../../components/layouts/gerencia-operativa/SidebarLayoutGerenciaOperativa';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

export default function ManejoPersonal() {

  const { agregarNuevoManejoDePersonal } = useContext(ManejosDePersonalContext);

  const [inputNombre, setInputNombre] = useState("");
  const [inputDescripcionDelPuesto, setInputDescripcionDelPuesto] = useState("");

  const [touched, setTouched] = useState(false);

  const MySwal = withReactContent(Swal);

  const onTextFieldChangedNombre = (event: ChangeEvent<HTMLInputElement>) => {
    setInputNombre(event.target.value);
  };

  const onTextFieldChangedDescripcionDelPuesto = (event: ChangeEvent<HTMLInputElement>) => {
    setInputDescripcionDelPuesto(event.target.value);
  };

  const onSave = () => {
    if (
      inputNombre.length === 0 &&
      inputDescripcionDelPuesto.length === 0
    )
      return;

    agregarNuevoManejoDePersonal(
      inputNombre,
      inputDescripcionDelPuesto,
      true
    );

    MySwal.fire({
      position: "top-end",
      icon: "success",
      title: "Candidato Agregado",
      showConfirmButton: false,
      timer: 5000,
    });

    setTouched(false);
    setInputNombre("");
    setInputDescripcionDelPuesto("");
  };

  return (
    <SidebarLayoutGerenciaOperativa>
      <form>
        <div className="shadow sm:rounded-md sm:overflow-hidden">
          <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">
              Manejo Personal
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
                  htmlFor="TxtDescripcionDelPuesto"
                  className="block text-sm font-medium text-gray-700"
                >
                  Descripción del puesto
                </label>
                <input
                  type="text"
                  name="TxtDescripcionDelPuesto"
                  id="TxtDescripcionDelPuesto"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  onChange={onTextFieldChangedDescripcionDelPuesto}
                  onBlur={() => setTouched(true)}
                />
              </div>
            </div>
          </div>
          <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
            <button
              type="submit"
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

import { ChangeEvent, useContext, useState } from "react";

import { SidebarLayoutGerenciaVentas } from "../../../components/layouts/gerencia-de-ventas/SidebarLayoutGerenciaVentas";
import { ClientesFrecuentesContext } from "../../../context/gerencia-de-ventas/clienteFrecuente";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useRouter } from "next/router";

export default function AgregarCandidato() {
  const router = useRouter();
  const { agregarClienteFrecuente } = useContext(ClientesFrecuentesContext);

  const [inputNombre, setInputNombre] = useState('');
  const [inputCorreoElectronico, setInputCorreoElectronico] = useState('');
  const [inputFechaDeNacimiento, setInputFechaDeNacimiento] = useState('');
  const [inputPuntosDeCompra, setInputPuntosDeCompra] = useState(0);
  
  const [touched, setTouched] = useState(false);

  const MySwal = withReactContent(Swal);

  // const onTextFieldChanged = (event: ChangeEvent<HTMLInputElement>) => {
  //   console.log( event.target.value );
  // };

  const onTextFieldChangedNombre = (event: ChangeEvent<HTMLInputElement>) => {
    setInputNombre(event.target.value);
  };

  const onTextFieldChangedCorreoElectronico = (event: ChangeEvent<HTMLInputElement>) => {
    setInputCorreoElectronico(event.target.value);
  };

  const onTextFieldChangedFechaDeNacimiento = (event: ChangeEvent<HTMLInputElement>) => {
    setInputFechaDeNacimiento(event.target.value);
  };

  const onTextFieldChangedPuntosDeCompra = (event: ChangeEvent<HTMLInputElement>) => {
    setInputPuntosDeCompra(parseInt(event.target.value));
  };

  const onSave = () => {
    if (
      inputNombre.length === 0 &&
      inputCorreoElectronico.length === 0 &&
      inputFechaDeNacimiento.length === 0 &&
      inputPuntosDeCompra === 0
    )
      return;

    agregarClienteFrecuente(
      inputNombre,
      inputCorreoElectronico,
      inputFechaDeNacimiento,
      inputPuntosDeCompra,
      true
    );

    MySwal.fire({
      position: "top-end",
      icon: "success",
      title: "Cliente Frecuente Agregado",
      showConfirmButton: false,
      timer: 5000,
    });

    router.push("/gerencia-de-ventas/clienteFrecuente/VerClientesFrecuentes");

    setTouched(false);
    setInputNombre("");
    setInputCorreoElectronico("");
    setInputFechaDeNacimiento("");
    // setInputPuntosDeCompra(0);
  };

  return (
    <SidebarLayoutGerenciaVentas>
      <form>
        <div className="shadow sm:rounded-md sm:overflow-hidden">
          <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Agregar Cliente Frecuente
              </h3>
              <p className="mt-1 text-sm text-gray-500">??Hola!</p>
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
                  htmlFor="TxtCorreoElectronico"
                  className="block text-sm font-medium text-gray-700"
                >
                  Correo Electr??nico
                </label>
                <input
                  type="text"
                  name="TxtCorreoElectronico"
                  id="TxtCorreoElectronico"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  onChange={onTextFieldChangedCorreoElectronico}
                  onBlur={() => setTouched(true)}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtFechaDeNacimiento"
                  className="block text-sm font-medium text-gray-700"
                >
                  Fecha de nacimiento
                </label>
                <input
                  type="date"
                  name="TxtFechaNacimiento"
                  id="TxtFechaNacimiento"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  onChange={onTextFieldChangedFechaDeNacimiento}
                  onBlur={() => setTouched(true)}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtPuntosDeCompra"
                  className="block text-sm font-medium text-gray-700"
                >
                  Puntos De Compra
                </label>
                <input
                  type="number"
                  name="TxtPuntosDeCompra"
                  id="TxtPuntosDeCompra"
                  autoComplete="off"
                  min="0"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  onChange={onTextFieldChangedPuntosDeCompra}
                  value={inputPuntosDeCompra || 0}
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
    </SidebarLayoutGerenciaVentas>
  );
}

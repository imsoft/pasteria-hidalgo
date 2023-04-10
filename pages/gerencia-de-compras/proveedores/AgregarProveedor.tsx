import { ChangeEvent, useContext, useState } from "react";
import { useRouter } from "next/router";

import { SidebarLayoutGerenciaCompras } from "../../../components/layouts/gerencia-de-compras/SidebarLayoutGerenciaCompras";

import { ProveedoresContext } from "../../../context/gerencia-de-compras/manejoDeProveedores/ManejoDeProveedoresContext";

import { YesNo } from "../../../interfaces";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const validYesNoOptions: YesNo[] = ["Si", "No"];

export default function ManejoDeProveedores() {
  const router = useRouter();

  const { agregarNuevoProveedor } = useContext(ProveedoresContext);

  const [inputNombre, setInputNombre] = useState("");
  const [inputDireccion, setInputDireccion] = useState("");
  const [inputTelefono, setInputTelefono] = useState("");
  const [inputHorarioDeApertura, setInputHorarioDeApertura] = useState("");
  const [inputHorarioDeCierre, setInputHorarioDeCierre] = useState("");
  const [inputProductosQueSeCompran, setInputProductosQueSeCompran] =
    useState("");
  const [inputEntregasADomicilio, setInputEntregasADomicilio] = useState("");
  const [inputRfc, setInputRfc] = useState("");

  const [touched, setTouched] = useState(false);

  const MySwal = withReactContent(Swal);

  const onTextFieldChangedNombre = (event: ChangeEvent<HTMLInputElement>) => {
    setInputNombre(event.target.value);
  };

  const onTextFieldChangedDireccion = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputDireccion(event.target.value);
  };

  const onTextFieldChangedTelefono = (event: ChangeEvent<HTMLInputElement>) => {
    setInputTelefono(event.target.value);
  };

  const onTextFieldChangedHorarioDeApertura = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputHorarioDeApertura(event.target.value);
  };

  const onTextFieldChangedHorarioDeCierre = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputHorarioDeCierre(event.target.value);
  };

  const onTextFieldChangedProductosQueSeCompran = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputProductosQueSeCompran(event.target.value);
  };

  const onTextFieldChangedEntregasADomicilio = (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    setInputEntregasADomicilio(event.target.value);
  };

  const onTextFieldChangedRfc = (event: ChangeEvent<HTMLInputElement>) => {
    setInputRfc(event.target.value);
  };

  const onSave = () => {
    if (
      inputNombre.length === 0 &&
      inputDireccion.length === 0 &&
      inputTelefono.length === 0 &&
      inputHorarioDeApertura.length === 0 &&
      inputHorarioDeCierre.length === 0 &&
      inputProductosQueSeCompran.length === 0 &&
      inputEntregasADomicilio.length === 0 &&
      inputRfc.length === 0
    )
      return;

    agregarNuevoProveedor(
      inputNombre,
      inputDireccion,
      inputTelefono,
      inputHorarioDeApertura,
      inputHorarioDeCierre,
      inputProductosQueSeCompran,
      inputEntregasADomicilio,
      inputRfc,
      true
    );

    MySwal.fire({
      position: "top-end",
      icon: "success",
      title: "Proveedor Agregado",
      showConfirmButton: false,
      timer: 2000,
    });

    router.push("/gerencia-de-compras/proveedores/VerProveedores");

    setTouched(false);
    setInputNombre("");
    setInputDireccion("");
    setInputTelefono("");
    setInputHorarioDeApertura("");
    setInputHorarioDeCierre("");
    setInputProductosQueSeCompran("");
    setInputEntregasADomicilio("");
    setInputRfc("");
  };

  return (
    <SidebarLayoutGerenciaCompras>
      <form>
        <div className="shadow sm:rounded-md sm:overflow-hidden">
          <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Proveedores
              </h3>
              {/* <p className="mt-1 text-sm text-gray-500">¡Hola!</p> */}
            </div>

            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtNombre"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nombre&#40;s&#41;
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

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtTelefono"
                  className="block text-sm font-medium text-gray-700"
                >
                  Teléfono
                </label>
                <input
                  type="tel"
                  name="TxtTelefono"
                  id="TxtTelefono"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  onChange={onTextFieldChangedTelefono}
                  onBlur={() => setTouched(true)}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtHorarioDeApertura"
                  className="block text-sm font-medium text-gray-700"
                >
                  Horario de apertura
                </label>
                <input
                  type="time"
                  name="TxtHorarioDeApertura"
                  id="TxtHorarioDeApertura"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  onChange={onTextFieldChangedHorarioDeApertura}
                  onBlur={() => setTouched(true)}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtHorarioDeCierre"
                  className="block text-sm font-medium text-gray-700"
                >
                  Horario de cierre
                </label>
                <input
                  type="time"
                  name="TxtHorarioDeCierre"
                  id="TxtHorarioDeCierre"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  onChange={onTextFieldChangedHorarioDeCierre}
                  onBlur={() => setTouched(true)}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtTiposDeProductosQueSeCompran"
                  className="block text-sm font-medium text-gray-700"
                >
                  Tipos de productos que se compran
                </label>
                <input
                  type="text"
                  name="TxtTiposDeProductosQueSeCompran"
                  id="TxtTiposDeProductosQueSeCompran"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  onChange={onTextFieldChangedProductosQueSeCompran}
                  onBlur={() => setTouched(true)}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtTiposDeProductosQueSeCompran"
                  className="block text-sm font-medium text-gray-700"
                >
                  ¿Entrega a domicilio?
                </label>
                <select
                  id="CmbTiposDeProductosQueSeCompran"
                  name="CmbTiposDeProductosQueSeCompran"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm rounded-md"
                  onChange={onTextFieldChangedEntregasADomicilio}
                  onBlur={() => setTouched(true)}
                  defaultValue="Selecciona un producto..."
                >
                  <option hidden>Selecciona una opción...</option>
                  {validYesNoOptions.map((yesNoOptions) => (
                    <option key={yesNoOptions}>{yesNoOptions}</option>
                  ))}
                </select>
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtRfc"
                  className="block text-sm font-medium text-gray-700"
                >
                  RFC
                </label>
                <input
                  type="text"
                  name="TxtRfc"
                  id="TxtRfc"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  onChange={onTextFieldChangedRfc}
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
    </SidebarLayoutGerenciaCompras>
  );
}

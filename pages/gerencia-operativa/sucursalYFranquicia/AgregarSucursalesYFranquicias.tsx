import { ChangeEvent, useContext, useState } from "react";

import { SucursalesYFranquiciasContext } from "../../../context/gerencia-operativa/sucursalYFranquicia/SucursalYFranquiciaContext";
import { SidebarLayoutGerenciaOperativa } from "../../../components/layouts/gerencia-operativa/SidebarLayoutGerenciaOperativa";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function ManejoSucursalesFranquicias() {
  const { agregarSucursalYFranquicia } = useContext(
    SucursalesYFranquiciasContext
  );

  const [inputSucursalOFranquicia, setInputSucursalOFranquicia] = useState("");
  const [inputFranquicias, setInputFranquicias] = useState("");
  const [inputSucursales, setInputSucursales] = useState("");
  const [inputDireccion, setInputDireccion] = useState("");
  const [inputDistancia, setInputDistancia] = useState("");
  const [inputFechaDePago, setInputFechaDePago] = useState("");
  const [inputMontoDePago, setInputMontoDePago] = useState("");
  const [inputCuentaBancaria, setInputCuentaBancaria] = useState("");
  const [inputBanco, setInputBanco] = useState("");
  const [inputNombreDelBeneficiario, setInputNombreDelBeneficiario] = useState("");
  const [inputRfc, setInputRfc] = useState("");
  
  const [touched, setTouched] = useState(false);

  const MySwal = withReactContent(Swal);

  const onTextFieldChangedSucursalOFranquicia = (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    setInputSucursalOFranquicia(event.target.value);
  };

  const onTextFieldChangedFranquicias = (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    setInputFranquicias(event.target.value);
  };

  const onTextFieldChangedSucursales = (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    setInputSucursales(event.target.value);
  };

  const onTextFieldChangedDireccion = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputDireccion(event.target.value);
  };

  const onTextFieldChangedDistancia = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputDistancia(event.target.value);
  };

  const onTextFieldChangedFechaDePago = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputFechaDePago(event.target.value);
  };

  const onTextFieldChangedMontoDePago = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputMontoDePago(event.target.value);
  };

  const onTextFieldChangedCuentaBancaria = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputCuentaBancaria(event.target.value);
  };

  const onTextFieldChangedBanco = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputBanco(event.target.value);
  };

  const onTextFieldChangedNombreDelBeneficiario = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputNombreDelBeneficiario(event.target.value);
  };

  const onTextFieldChangedRfc = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputRfc(event.target.value);
  };

  const onSave = () => {
    if (
      inputSucursalOFranquicia.length === 0 &&
      inputFranquicias.length === 0 &&
      inputSucursales.length === 0 &&
      inputDireccion.length === 0 &&
      inputDistancia.length === 0 &&
      inputFechaDePago.length === 0 &&
      inputMontoDePago.length === 0 &&
      inputCuentaBancaria.length === 0 &&
      inputBanco.length === 0 &&
      inputNombreDelBeneficiario.length === 0 &&
      inputRfc.length === 0
    ) return;

    agregarSucursalYFranquicia(
      inputSucursalOFranquicia,
      inputDireccion,
      inputDistancia,
      inputFechaDePago,
      inputMontoDePago,
      inputCuentaBancaria,
      inputBanco,
      inputNombreDelBeneficiario,
      inputRfc,
      inputSucursales,
      inputFranquicias,
      true
    );

    MySwal.fire({
      position: "top-end",
      icon: "success",
      title: "Sucursal O Franquicia Agregada Agregado",
      showConfirmButton: false,
      timer: 5000,
    });

    setTouched(false);
    setInputSucursalOFranquicia("");
    setInputFranquicias("");
    setInputSucursales("");
    setInputDireccion("");
    setInputDistancia("");
    setInputFechaDePago("");
    setInputMontoDePago("");
    setInputCuentaBancaria("");
    setInputBanco("");
    setInputNombreDelBeneficiario("");
    setInputRfc("");
  };

  return (
    <SidebarLayoutGerenciaOperativa>
      <form>
        <div className="shadow sm:rounded-md sm:overflow-hidden">
          <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Manejo de Sucursales y Franquicias
              </h3>
              <p className="mt-1 text-sm text-gray-500">¡Hola!</p>
            </div>

            <div>
              <label className="text-base font-medium text-gray-900">
                Seleccione una opción
              </label>
              <p className="text-sm leading-5 text-gray-500">
                ¿Sucursal o Franquicia?
              </p>

              <div className="col-span-6 sm:col-span-3">
                <select
                  id="CmbNombre"
                  name="CmbNombre"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm rounded-md"
                  defaultValue="Selecciona un producto..."
                  onChange={onTextFieldChangedSucursalOFranquicia}
                  onBlur={() => setTouched(true)}
                >
                  <option>Seleccione una opción...</option>
                  <option>Sucursal</option>
                  <option>Franquicia</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-6 gap-6">
              <div
                className={` ${
                  inputSucursalOFranquicia === "Franquicia" || "hidden"
                } col-span-6`}
              >
                <label
                  htmlFor="CmbFranquicia"
                  className="block text-sm font-medium text-gray-700"
                >
                  Franquicia
                </label>
                <select
                  id="CmbFranquicia"
                  name="CmbFranquicia"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm rounded-md"
                  defaultValue="Selecciona un producto..."
                  onChange={onTextFieldChangedFranquicias}
                  onBlur={() => setTouched(true)}
                >
                  <option>Seleccione la franquicia...</option>
                  <option>Chapultepec</option>
                  <option>Chapalita</option>
                  <option>Chiapas</option>
                </select>
              </div>

              <div
                className={` ${
                  inputSucursalOFranquicia === "Sucursal" || "hidden"
                } col-span-6`}
              >
                <label
                  htmlFor="CmbSucursal"
                  className="block text-sm font-medium text-gray-700"
                >
                  Sucursal
                </label>
                <select
                  id="CmbSucursal"
                  name="CmbSucursal"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm rounded-md"
                  defaultValue="Selecciona un producto..."
                  onChange={onTextFieldChangedSucursales}
                  onBlur={() => setTouched(true)}
                >
                  <option>Seleccione la sucursal...</option>
                  <option>Chapultepec</option>
                  <option>Chapalita</option>
                  <option>Chiapas</option>
                </select>
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
                  htmlFor="TxtDistancia"
                  className="block text-sm font-medium text-gray-700"
                >
                  Distancia de la fabrica a la sucursal o franquicia
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    type="text"
                    name="TxtDistancia"
                    id="TxtDistancia"
                    className="focus:ring-primary-yellow focus:border-primary-yellow block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                    onChange={onTextFieldChangedDistancia}
                    onBlur={() => setTouched(true)}
                    placeholder="0"
                    aria-describedby="price-currency"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span
                      className="text-gray-500 sm:text-sm"
                      id="price-currency"
                    >
                      KM
                    </span>
                  </div>
                </div>
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtFechaDePago"
                  className="block text-sm font-medium text-gray-700"
                >
                  Fecha de pago
                </label>
                <input
                  type="date"
                  name="TxtFechaDePago"
                  id="TxtFechaDePago"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  onChange={onTextFieldChangedFechaDePago}
                  onBlur={() => setTouched(true)}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtMontoDePago"
                  className="block text-sm font-medium text-gray-700"
                >
                  Monto de pago
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="text"
                    name="TxtMontoDePago"
                    id="TxtMontoDePago"
                    className="focus:ring-primary-yellow focus:border-primary-yellow block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                    onChange={onTextFieldChangedMontoDePago}
                    onBlur={() => setTouched(true)}
                    placeholder="0"
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

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtCuentaBancaria"
                  className="block text-sm font-medium text-gray-700"
                >
                  Cuenta Bancaria
                </label>
                <input
                  type="text"
                  name="TxtCuentaBancaria"
                  id="TxtCuentaBancaria"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  onChange={onTextFieldChangedCuentaBancaria}
                  onBlur={() => setTouched(true)}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtBanco"
                  className="block text-sm font-medium text-gray-700"
                >
                  Banco
                </label>
                <input
                  type="text"
                  name="TxtBanco"
                  id="TxtBanco"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  onChange={onTextFieldChangedBanco}
                  onBlur={() => setTouched(true)}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtNombreDelNeneficiario"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nombre del beneficiario
                </label>
                <input
                  type="text"
                  name="TxtNombreDelNeneficiario"
                  id="TxtNombreDelNeneficiario"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  onChange={onTextFieldChangedNombreDelBeneficiario}
                  onBlur={() => setTouched(true)}
                />
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
    </SidebarLayoutGerenciaOperativa>
  );
}

import { ChangeEvent, useContext, useState } from "react";
import { SidebarLayoutGerenciaOperativa } from "../../../components/layouts/gerencia-operativa/SidebarLayoutGerenciaOperativa";
import { ReportesDeSalidaContext } from "../../../context/gerencia-operativa/reporteDeSalida/ReportesDeSalidaContext";
import { Unidades } from "../../../interfaces";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const validUnits: Unidades[] = ["Gramos", "Kilogramos", "Mililitros", "Litros"];

export default function ReportesSalida() {
  const { agregarNuevoReporteDeSalida } = useContext(ReportesDeSalidaContext);

  const [inputFecha, setInputFecha] = useState("");
  const [inputProductoExtra, setInputProductoExtra] = useState("");
  const [inputCodigoDeProductoExtra, setInputCodigoDeProductoExtra] =
    useState("");
  const [inputCantidadDeProductoExtra, setInputCantidadDeProductoExtra] =
    useState("");
  const [inputUnidadesDeProductoExtra, setInputUnidadesDeProductoExtra] =
    useState("");
  const [inputCodigoDeMasa, setInputCodigoDeMasa] = useState("");
  const [inputMasa, setInputMasa] = useState("");
  const [inputCantidadDeMasa, setInputCantidadDeMasa] = useState("");
  const [inputUnidadesDeMasa, setInputUnidadesDeMasa] = useState("");
  const [inputRellenos, setInputRellenos] = useState("");
  const [inputCodigosDeRelleno, setInputCodigosDeRelleno] = useState("");
  const [
    inputCantidadDeProductoExtraRelleno,
    setInputCantidadDeProductoExtraRelleno,
  ] = useState("");
  const [inputUnidadesDeRelleno, setInputUnidadesDeRelleno] = useState("");
  const [inputTemperaturaDeRellenos, setInputTemperaturaDeRellenos] =
    useState("");
  const [inputSucursalAEnviar, setInputSucursalAEnviar] = useState("");
  const [inputDatosDeRepartidor, setInputDatosDeRepartidor] = useState("");
  const [inputDatosDeLaRuta, setInputDatosDeLaRuta] = useState("");
  const [
    inputKilometrajeDeEntradaYSalida,
    setInputKilometrajeDeEntradaYSalida,
  ] = useState("");

  const [touched, setTouched] = useState(false);

  const MySwal = withReactContent(Swal);

  const onTextFieldChangedFecha = (event: ChangeEvent<HTMLInputElement>) => {
    setInputFecha(event.target.value);
  };

  const onTextFieldChangedProductoExtra = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputProductoExtra(event.target.value);
  };

  const onTextFieldChangedCodigoDeProductoExtra = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputCodigoDeProductoExtra(event.target.value);
  };

  const onTextFieldChangedCantidadDeProductoExtra = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputCantidadDeProductoExtra(event.target.value);
  };

  const onTextFieldChangedUnidadesDeProductoExtra = (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    setInputUnidadesDeProductoExtra(event.target.value as Unidades);
  };

  const onTextFieldChangedCodigoDeMasa = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputCodigoDeMasa(event.target.value);
  };

  const onTextFieldChangedMasa = (event: ChangeEvent<HTMLInputElement>) => {
    setInputMasa(event.target.value);
  };

  const onTextFieldChangedCantidadDeMasa = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputCantidadDeMasa(event.target.value);
  };

  const onTextFieldChangedUnidadesDeMasa = (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    setInputUnidadesDeMasa(event.target.value as Unidades);
  };

  const onTextFieldChangedRellenos = (event: ChangeEvent<HTMLInputElement>) => {
    setInputRellenos(event.target.value);
  };

  const onTextFieldChangedCodigosDeRelleno = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputCodigosDeRelleno(event.target.value);
  };

  const onTextFieldChangedCantidadDeProductoExtraRelleno = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputCantidadDeProductoExtraRelleno(event.target.value);
  };

  const onTextFieldChangedUnidadesDeRelleno = (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    setInputUnidadesDeRelleno(event.target.value as Unidades);
  };

  const onTextFieldChangedTemperaturaDeRellenos = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputTemperaturaDeRellenos(event.target.value);
  };

  const onTextFieldChangedSucursalAEnviar = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputSucursalAEnviar(event.target.value);
  };

  const onTextFieldChangedDatosDeRepartidor = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputDatosDeRepartidor(event.target.value);
  };

  const onTextFieldChangedDatosDeLaRuta = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputDatosDeLaRuta(event.target.value);
  };

  const onTextFieldChangedKilometrajeDeEntradaYSalida = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputKilometrajeDeEntradaYSalida(event.target.value);
  };

  const onSave = () => {
    if (
      inputFecha.length === 0 &&
      inputProductoExtra.length === 0 &&
      inputCodigoDeProductoExtra.length === 0 &&
      inputCantidadDeProductoExtra.length === 0 &&
      inputUnidadesDeProductoExtra.length === 0 &&
      inputCodigoDeMasa.length === 0 &&
      inputMasa.length === 0 &&
      inputCantidadDeMasa.length === 0 &&
      inputUnidadesDeMasa.length === 0 &&
      inputRellenos.length === 0 &&
      inputCodigosDeRelleno.length === 0 &&
      inputCantidadDeProductoExtraRelleno.length === 0 &&
      inputUnidadesDeRelleno.length === 0 &&
      inputTemperaturaDeRellenos.length === 0 &&
      inputSucursalAEnviar.length === 0 &&
      inputDatosDeRepartidor.length === 0 &&
      inputDatosDeLaRuta.length === 0 &&
      inputKilometrajeDeEntradaYSalida.length === 0
    )
      return;

    agregarNuevoReporteDeSalida(
      inputFecha,
      inputProductoExtra,
      inputCodigoDeProductoExtra,
      inputCantidadDeProductoExtra,
      inputUnidadesDeProductoExtra,
      inputCodigoDeMasa,
      inputMasa,
      inputCantidadDeMasa,
      inputUnidadesDeMasa,
      inputRellenos,
      inputCodigosDeRelleno,
      inputCantidadDeProductoExtraRelleno,
      inputUnidadesDeRelleno,
      inputTemperaturaDeRellenos,
      inputSucursalAEnviar,
      inputDatosDeRepartidor,
      inputDatosDeLaRuta,
      inputKilometrajeDeEntradaYSalida,
      true
    );

    MySwal.fire({
      position: "top-end",
      icon: "success",
      title: "Reporte de salida Agregado",
      showConfirmButton: false,
      timer: 5000,
    });

    setTouched(false);
    setInputFecha("");
    setInputProductoExtra("");
    setInputCodigoDeProductoExtra("");
    setInputCantidadDeProductoExtra("");
    setInputUnidadesDeProductoExtra("");
    setInputCodigoDeMasa("");
    setInputMasa("");
    setInputCantidadDeMasa("");
    setInputUnidadesDeMasa("");
    setInputRellenos("");
    setInputCodigosDeRelleno("");
    setInputCantidadDeProductoExtraRelleno("");
    setInputUnidadesDeRelleno("");
    setInputTemperaturaDeRellenos("");
    setInputSucursalAEnviar("");
    setInputDatosDeRepartidor("");
    setInputDatosDeLaRuta("");
    setInputKilometrajeDeEntradaYSalida("");
  };

  return (
    <SidebarLayoutGerenciaOperativa>
      <form>
        <div className="shadow sm:rounded-md sm:overflow-hidden">
          <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Reportes Salida
              </h3>
              <p className="mt-1 text-sm text-gray-500">¡Hola!</p>
            </div>
            <div className="grid grid-cols-6 gap-6">

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtDescripcionProducto"
                  className="block text-sm font-medium text-gray-700"
                >
                  Fecha
                </label>
                <input
                  type="date"
                  name="TxtDescripcionProducto"
                  id="TxtDescripcionProducto"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  onChange={onTextFieldChangedFecha}
                  onBlur={() => setTouched(true)}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtDescripcionProducto"
                  className="block text-sm font-medium text-gray-700"
                >
                  Producto Extra
                </label>
                <input
                  type="text"
                  name="TxtDescripcionProducto"
                  id="TxtDescripcionProducto"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  onChange={onTextFieldChangedProductoExtra}
                  onBlur={() => setTouched(true)}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtDescripcionProducto"
                  className="block text-sm font-medium text-gray-700"
                >
                  Código de producto extra
                </label>
                <input
                  type="text"
                  name="TxtDescripcionProducto"
                  id="TxtDescripcionProducto"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  onChange={onTextFieldChangedCodigoDeProductoExtra}
                  onBlur={() => setTouched(true)}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtDescripcionProducto"
                  className="block text-sm font-medium text-gray-700"
                >
                  Cantidad de producto extra
                </label>
                <input
                  type="text"
                  name="TxtDescripcionProducto"
                  id="TxtDescripcionProducto"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  onChange={onTextFieldChangedCantidadDeProductoExtra}
                  onBlur={() => setTouched(true)}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtProductos"
                  className="block text-sm font-medium text-gray-700"
                >
                  Unidades de producto extra
                </label>
                <select
                  id="TxtProductos"
                  name="TxtProductos"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm rounded-md"
                  onChange={onTextFieldChangedUnidadesDeProductoExtra}
                  onBlur={() => setTouched(true)}
                  defaultValue="Selecciona un producto..."
                >
                  <option>Selecciona una opción...</option>
                  {validUnits.map((unidades) => (
                    <option key={unidades}>{unidades}</option>
                  ))}
                </select>
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtDescripcionProducto"
                  className="block text-sm font-medium text-gray-700"
                >
                  Código de masa
                </label>
                <input
                  type="text"
                  name="TxtDescripcionProducto"
                  id="TxtDescripcionProducto"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  onChange={onTextFieldChangedCodigoDeMasa}
                  onBlur={() => setTouched(true)}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtDescripcionProducto"
                  className="block text-sm font-medium text-gray-700"
                >
                  Masa
                </label>
                <input
                  type="text"
                  name="TxtDescripcionProducto"
                  id="TxtDescripcionProducto"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  onChange={onTextFieldChangedMasa}
                  onBlur={() => setTouched(true)}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtDescripcionProducto"
                  className="block text-sm font-medium text-gray-700"
                >
                  Cantidad de masa
                </label>
                <input
                  type="text"
                  name="TxtDescripcionProducto"
                  id="TxtDescripcionProducto"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  onChange={onTextFieldChangedCantidadDeMasa}
                  onBlur={() => setTouched(true)}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtProductos"
                  className="block text-sm font-medium text-gray-700"
                >
                  Unidades de masa
                </label>
                <select
                  id="TxtProductos"
                  name="TxtProductos"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm rounded-md"
                  onChange={onTextFieldChangedUnidadesDeMasa}
                  onBlur={() => setTouched(true)}
                  defaultValue="Selecciona un producto..."
                >
                  <option>Selecciona una opción...</option>
                  {validUnits.map((unidades) => (
                    <option key={unidades}>{unidades}</option>
                  ))}
                </select>
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtDescripcionProducto"
                  className="block text-sm font-medium text-gray-700"
                >
                  Rellenos
                </label>
                <input
                  type="text"
                  name="TxtDescripcionProducto"
                  id="TxtDescripcionProducto"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  onChange={onTextFieldChangedRellenos}
                  onBlur={() => setTouched(true)}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtDescripcionProducto"
                  className="block text-sm font-medium text-gray-700"
                >
                  Códigos de relleno
                </label>
                <input
                  type="text"
                  name="TxtDescripcionProducto"
                  id="TxtDescripcionProducto"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  onChange={onTextFieldChangedCodigosDeRelleno}
                  onBlur={() => setTouched(true)}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtDescripcionProducto"
                  className="block text-sm font-medium text-gray-700"
                >
                  Cantidad de producto extra
                </label>
                <input
                  type="text"
                  name="TxtDescripcionProducto"
                  id="TxtDescripcionProducto"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  onChange={onTextFieldChangedCantidadDeProductoExtraRelleno}
                  onBlur={() => setTouched(true)}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtProductos"
                  className="block text-sm font-medium text-gray-700"
                >
                  Unidades de relleno
                </label>
                <select
                  id="TxtProductos"
                  name="TxtProductos"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm rounded-md"
                  onChange={onTextFieldChangedUnidadesDeRelleno}
                  onBlur={() => setTouched(true)}
                  defaultValue="Selecciona un producto..."
                >
                  <option>Selecciona una opción...</option>
                  {validUnits.map((unidades) => (
                    <option key={unidades}>{unidades}</option>
                  ))}
                </select>
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtDescripcionProducto"
                  className="block text-sm font-medium text-gray-700"
                >
                  Temperatura de rellenos
                </label>
                <input
                  type="text"
                  name="TxtDescripcionProducto"
                  id="TxtDescripcionProducto"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  onChange={onTextFieldChangedTemperaturaDeRellenos}
                  onBlur={() => setTouched(true)}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtDescripcionProducto"
                  className="block text-sm font-medium text-gray-700"
                >
                  Sucursal a enviar
                </label>
                <input
                  type="text"
                  name="TxtDescripcionProducto"
                  id="TxtDescripcionProducto"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  onChange={onTextFieldChangedSucursalAEnviar}
                  onBlur={() => setTouched(true)}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtDescripcionProducto"
                  className="block text-sm font-medium text-gray-700"
                >
                  Datos de Repartidor
                </label>
                <input
                  type="text"
                  name="TxtDescripcionProducto"
                  id="TxtDescripcionProducto"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  onChange={onTextFieldChangedDatosDeRepartidor}
                  onBlur={() => setTouched(true)}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtDescripcionProducto"
                  className="block text-sm font-medium text-gray-700"
                >
                  Datos de la ruta
                </label>
                <input
                  type="text"
                  name="TxtDescripcionProducto"
                  id="TxtDescripcionProducto"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  onChange={onTextFieldChangedDatosDeLaRuta}
                  onBlur={() => setTouched(true)}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtDescripcionProducto"
                  className="block text-sm font-medium text-gray-700"
                >
                  Kilometraje de entrada y salida
                </label>
                <input
                  type="text"
                  name="TxtDescripcionProducto"
                  id="TxtDescripcionProducto"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  onChange={onTextFieldChangedKilometrajeDeEntradaYSalida}
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

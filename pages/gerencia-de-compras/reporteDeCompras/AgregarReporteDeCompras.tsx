import { ChangeEvent, useContext, useState } from "react";

import { SidebarLayoutGerenciaCompras } from "../../../components/layouts/gerencia-de-compras/SidebarLayoutGerenciaCompras";
import { ReporteDeCompraContext } from "../../../context/gerencia-de-compras/reporteDeCompras/ReporteDeComprasContext";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function ReporteDeCompras() {
  const { agregarReporteDeCompra } = useContext(ReporteDeCompraContext);

  const [inputIdReporteDeCompra, setInputIdReporteDeCompra] = useState("");
  const [inputCodigoDeReporte, setInputCodigoDeReporte] = useState("");
  const [inputFechaDeCompra, setInputFechaDeCompra] = useState("");
  const [inputCredito, setInputCredito] = useState("");
  const [inputMateriaPrima, setInputMateriaPrima] = useState("");
  const [inputIdMateriaPrima, setInputIdMateriaPrima] = useState("");
  const [inputCantidad, setInputCantidad] = useState("");
  const [inputUnidades, setInputUnidades] = useState("");
  const [inputIdProveedor, setInputIdProveedor] = useState("");
  const [inputNombreProveedor, setInputNombreProveedor] = useState("");
  const [inputPrecioPorUnidad, setInputPrecioPorUnidad] = useState("");
  const [inputPrecioTotalDelProducto, setInputPrecioTotalDelProducto] = useState("");
  const [inputPrecioTotalDelCompra, setInputPrecioTotalDelCompra] = useState("");
  const [inputTempetatura, setInputTempetatura] = useState("");
  const [inputCaducidad, setInputCaducidad] = useState("");
  const [inputFactura, setInputFactura] = useState("");

  const [touched, setTouched] = useState(false);

  const MySwal = withReactContent(Swal);

  const onTextFieldChangedIdReporteDeCompra = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputIdReporteDeCompra(event.target.value);
  };

  const onTextFieldChangedCodigoDeReporte = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputCodigoDeReporte(event.target.value);
  };

  const onTextFieldChangedFechaDeCompra = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputFechaDeCompra(event.target.value);
  };

  const onTextFieldChangedCredito = (event: ChangeEvent<HTMLSelectElement>) => {
    setInputCredito(event.target.value);
  };

  const onTextFieldChangedIdMateriaPrima = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputIdMateriaPrima(event.target.value);
  };

  const onTextFieldChangedMateriaPrima = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputMateriaPrima(event.target.value);
  };

  const onTextFieldChangedCantidad = (event: ChangeEvent<HTMLInputElement>) => {
    setInputCantidad(event.target.value);
  };

  const onTextFieldChangedUnidades = (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    setInputUnidades(event.target.value);
  };

  const onTextFieldChangedIdProveedor = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputIdProveedor(event.target.value);
  };

  const onTextFieldChangedNombreProveedor = (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    setInputNombreProveedor(event.target.value);
  };

  const onTextFieldChangedPrecioPorUnidad = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputPrecioPorUnidad(event.target.value);
  };

  const onTextFieldChangedPrecioTotalDelProducto = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputPrecioTotalDelProducto(event.target.value);
  };

  const onTextFieldChangedPrecioTotalDelCompra = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputPrecioTotalDelCompra(event.target.value);
  };

  const onTextFieldChangedTempetatura = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputTempetatura(event.target.value);
  };

  const onTextFieldChangedCaducidad = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputCaducidad(event.target.value);
  };

  const onTextFieldChangedFactura = (event: ChangeEvent<HTMLSelectElement>) => {
    setInputFactura(event.target.value);
  };

  const onSave = () => {
    if (
      inputIdReporteDeCompra.length === 0 &&
      inputCodigoDeReporte.length === 0 &&
      inputCredito.length === 0 &&
      inputFechaDeCompra.length === 0 &&
      inputIdMateriaPrima.length === 0 &&
      inputMateriaPrima.length === 0 &&
      inputCantidad.length === 0 &&
      inputUnidades.length === 0 &&
      inputIdProveedor.length === 0 &&
      inputNombreProveedor.length === 0 &&
      inputPrecioPorUnidad.length === 0 &&
      inputPrecioTotalDelProducto.length === 0 &&
      inputPrecioTotalDelCompra.length === 0 &&
      inputTempetatura.length === 0 &&
      inputCaducidad.length === 0 &&
      inputFactura.length === 0
    )
      return;

    agregarReporteDeCompra(
      inputIdReporteDeCompra,
      inputCodigoDeReporte,
      inputCredito,
      inputFechaDeCompra,
      inputIdMateriaPrima,
      inputMateriaPrima,
      inputCantidad,
      inputUnidades,
      inputIdProveedor,
      inputNombreProveedor,
      inputPrecioPorUnidad,
      inputPrecioTotalDelProducto,
      inputPrecioTotalDelCompra,
      inputTempetatura,
      inputCaducidad,
      inputFactura,
      true
    );

    MySwal.fire({
      position: "top-end",
      icon: "success",
      title: "Reporte de compra Agregado",
      showConfirmButton: false,
      timer: 5000,
    });

    setTouched(false);
    setInputIdReporteDeCompra("");
    setInputCodigoDeReporte("");
    setInputFechaDeCompra("");
    setInputCredito("");
    setInputIdMateriaPrima("");
    setInputMateriaPrima("");
    setInputCantidad("");
    setInputUnidades("");
    setInputIdProveedor("");
    setInputNombreProveedor("");
    setInputPrecioPorUnidad("");
    setInputPrecioTotalDelProducto("");
    setInputPrecioTotalDelCompra("");
    setInputTempetatura("");
    setInputCaducidad("");
    setInputFactura("");
  };

  return (
    <SidebarLayoutGerenciaCompras>
      <form>
        <div className="shadow sm:rounded-md sm:overflow-hidden">
          <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Reporte de compras
              </h3>
              <p className="mt-1 text-sm text-gray-500">¡Hola!</p>
            </div>

            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtIdReporteDeCompra"
                  className="block text-sm font-medium text-gray-700"
                >
                  Id Reporte De Compra
                </label>
                <input
                  type="text"
                  name="TxtIdReporteDeCompra"
                  id="TxtIdReporteDeCompra"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  onChange={onTextFieldChangedIdReporteDeCompra}
                  onBlur={() => setTouched(true)}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtCodigoDeReporte"
                  className="block text-sm font-medium text-gray-700"
                >
                  Codigo De Reporte
                </label>
                <input
                  type="text"
                  name="TxtCodigoDeReporte"
                  id="TxtCodigoDeReporte"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  onChange={onTextFieldChangedCodigoDeReporte}
                  onBlur={() => setTouched(true)}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtFechaDeCompra"
                  className="block text-sm font-medium text-gray-700"
                >
                  Fecha de Compra
                </label>
                <input
                  type="date"
                  name="TxtFechaDeCompra"
                  id="TxtFechaDeCompra"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  onChange={onTextFieldChangedFechaDeCompra}
                  onBlur={() => setTouched(true)}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtCredito"
                  className="block text-sm font-medium text-gray-700"
                >
                  Crédito
                </label>
                <select
                  id="TxtCredito"
                  name="TxtCredito"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm rounded-md"
                  onChange={onTextFieldChangedCredito}
                  onBlur={() => setTouched(true)}
                  defaultValue="Selecciona un producto..."
                >
                  <option>Selecciona una opción...</option>
                  <option>Si</option>
                  <option>No</option>
                </select>
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtHorarioDeAtencion"
                  className="block text-sm font-medium text-gray-700"
                >
                  Materia Prima (Descripción)
                </label>
                <input
                  type="text"
                  name="TxtHorarioDeAtencion"
                  id="TxtHorarioDeAtencion"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  onChange={onTextFieldChangedMateriaPrima}
                  onBlur={() => setTouched(true)}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtTiposDeProductosQueSeCompran"
                  className="block text-sm font-medium text-gray-700"
                >
                  Código de Materia Prima
                </label>
                <input
                  type="text"
                  name="TxtTiposDeProductosQueSeCompran"
                  id="TxtTiposDeProductosQueSeCompran"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  onChange={onTextFieldChangedIdMateriaPrima}
                  onBlur={() => setTouched(true)}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtTiposDeProductosQueSeCompran"
                  className="block text-sm font-medium text-gray-700"
                >
                  Cantidad
                </label>
                <input
                  type="number"
                  min={1}
                  name="TxtTiposDeProductosQueSeCompran"
                  id="TxtTiposDeProductosQueSeCompran"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  onChange={onTextFieldChangedCantidad}
                  onBlur={() => setTouched(true)}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtTiposDeProductosQueSeCompran"
                  className="block text-sm font-medium text-gray-700"
                >
                  Unidades
                </label>
                <select
                  id="TxtProveedor"
                  name="TxtProveedor"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm rounded-md"
                  defaultValue="Selecciona un producto..."
                  onChange={onTextFieldChangedUnidades}
                  onBlur={() => setTouched(true)}
                >
                  <option>Selecciona las unidades...</option>
                  <option>gramos</option>
                  <option>kilogramos</option>
                  <option>mililitros</option>
                  <option>litros</option>
                  <option>unidad</option>
                </select>
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtIdProveedor"
                  className="block text-sm font-medium text-gray-700"
                >
                  Id Proveedor
                </label>
                <input
                  type="text"
                  name="TxtIdProveedor"
                  id="TxtIdProveedor"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  onChange={onTextFieldChangedIdProveedor}
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
                <select
                  id="TxtProveedor"
                  name="TxtProveedor"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm rounded-md"
                  defaultValue="Selecciona un producto..."
                  onChange={onTextFieldChangedNombreProveedor}
                  onBlur={() => setTouched(true)}
                >
                  <option>Selecciona un proveedor...</option>
                  <option>Juan</option>
                  <option>Pedro</option>
                  <option>Luis</option>
                </select>
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtPrecioCompra"
                  className="block text-sm font-medium text-gray-700"
                >
                  Precio por unidad de producto
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="text"
                    name="price"
                    id="price"
                    className="focus:ring-primary-yellow focus:border-primary-yellow block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                    onChange={onTextFieldChangedPrecioPorUnidad}
                    onBlur={() => setTouched(true)}
                    placeholder="0.00"
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
                  htmlFor="TxtPrecioCompra"
                  className="block text-sm font-medium text-gray-700"
                >
                  Precio total del producto
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="text"
                    name="price"
                    id="price"
                    className="focus:ring-primary-yellow focus:border-primary-yellow block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                    onChange={onTextFieldChangedPrecioTotalDelProducto}
                    onBlur={() => setTouched(true)}
                    placeholder="0.00"
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
                  htmlFor="TxtPrecioCompra"
                  className="block text-sm font-medium text-gray-700"
                >
                  Precio total de la compra
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="text"
                    name="price"
                    id="price"
                    className="focus:ring-primary-yellow focus:border-primary-yellow block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                    onChange={onTextFieldChangedPrecioTotalDelCompra}
                    onBlur={() => setTouched(true)}
                    placeholder="0.00"
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
                  htmlFor="TxtPrecioCompra"
                  className="block text-sm font-medium text-gray-700"
                >
                  Temperatura
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"></div>
                  <input
                    type="text"
                    name="price"
                    id="price"
                    className="focus:ring-primary-yellow focus:border-primary-yellow block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                    onChange={onTextFieldChangedTempetatura}
                    onBlur={() => setTouched(true)}
                    placeholder=""
                    aria-describedby="price-currency"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span
                      className="text-gray-500 sm:text-sm"
                      id="price-currency"
                    >
                      °C
                    </span>
                  </div>
                </div>
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtCaducidad"
                  className="block text-sm font-medium text-gray-700"
                >
                  Caducidad
                </label>
                <input
                  type="date"
                  name="TxtCaducidad"
                  id="TxtCaducidad"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  onChange={onTextFieldChangedCaducidad}
                  onBlur={() => setTouched(true)}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtFactura"
                  className="block text-sm font-medium text-gray-700"
                >
                  Factura
                </label>
                <select
                  id="TxtFactura"
                  name="TxtFactura"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm rounded-md"
                  onChange={onTextFieldChangedFactura}
                  onBlur={() => setTouched(true)}
                  defaultValue="Selecciona un producto..."
                >
                  <option>Selecciona una opción...</option>
                  <option>Si</option>
                  <option>No</option>
                </select>
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

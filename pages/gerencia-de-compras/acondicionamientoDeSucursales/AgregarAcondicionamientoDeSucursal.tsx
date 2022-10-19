import { ChangeEvent, useContext, useEffect, useMemo, useState } from "react";

import { AcondicionamientoDeSucursalesContext } from "../../../context/gerencia-de-compras/acondicionamientoDeSucursales/AcondicionamientoDeSucursalesContext";
import { ProveedoresContext } from "../../../context/gerencia-de-compras/manejoDeProveedores/ManejoDeProveedoresContext";

import { SidebarLayoutGerenciaCompras } from "../../../components/layouts/gerencia-de-compras/SidebarLayoutGerenciaCompras";

import { YesNo } from "../../../interfaces";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const validYesNoOptions: YesNo[] = ["Si", "No"];

export default function AcondicionamientoDeSucursales() {
  const { agregarNuevoAcondicionamientoDeSucursal } = useContext(
    AcondicionamientoDeSucursalesContext
  );

  const { proveedores } = useContext(ProveedoresContext);
  const proveedoresMemo = useMemo(() => proveedores, [proveedores]);

  const [inputProducto, setInputProducto] = useState("");
  const [inputFechaDeCompra, setInputFechaDeCompra] = useState("");
  const [inputDescripcionDelProducto, setInputDescripcionDelProducto] =
    useState("");
  const [inputFechaEstimadaDeEntrega, setInputFechaEstimadaDeEntrega] =
    useState("");
  const [inputProveedor, setInputProveedor] = useState("");
  const [inputFactura, setInputFactura] = useState("");
  const [inputPrecioDeCompra, setInputPrecioDeCompra] = useState(0);
  const [inputCantidad, setInputCantidad] = useState(0);
  const [inputTotalAcomulado, setInputTotalAcomulado] = useState(0);

  const [inputFranquicias, setInputFranquicias] = useState("");
  const [inputSucursales, setInputSucursales] = useState("");
  const [inputSucursalOFranquicia, setInputSucursalOFranquicia] = useState("");

  const [touched, setTouched] = useState(false);

  const MySwal = withReactContent(Swal);

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

  const onTextFieldChangedProducto = (event: ChangeEvent<HTMLInputElement>) => {
    setInputProducto(event.target.value);
  };

  const onTextFieldChangedFechaDeCompra = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputFechaDeCompra(event.target.value);
  };

  const onTextFieldChangedDescripcionDelProducto = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputDescripcionDelProducto(event.target.value);
  };

  const onTextFieldChangedFechaEstimadaDeEntrega = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputFechaEstimadaDeEntrega(event.target.value);
  };

  const onTextFieldChangedProveedor = (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    setInputProveedor(event.target.value);
  };

  const onTextFieldChangedFactura = (event: ChangeEvent<HTMLSelectElement>) => {
    setInputFactura(event.target.value);
  };

  const onTextFieldChangedPrecioDeCompra = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputPrecioDeCompra(parseInt(event.target.value));
  };

  const onTextFieldChangedCantidad = (event: ChangeEvent<HTMLInputElement>) => {
    setInputCantidad(parseInt(event.target.value));
  };

  const onTextFieldChangedTotalAcomulado = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputTotalAcomulado(parseInt(event.target.value));
  };

  const onTextFieldChangedSucursalOFranquicia = (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    setInputSucursalOFranquicia(event.target.value);
  };

  const precioTotalDelProducto = () => {
    setInputTotalAcomulado(inputCantidad * inputPrecioDeCompra);
  };

  useEffect(() => {
    precioTotalDelProducto();
  }, [inputCantidad]);

  useEffect(() => {
    precioTotalDelProducto();
  }, [inputPrecioDeCompra]);

  const onSave = () => {
    if (
      inputProducto.length === 0 &&
      inputFechaDeCompra.length === 0 &&
      inputDescripcionDelProducto.length === 0 &&
      inputFechaEstimadaDeEntrega.length === 0 &&
      inputProveedor.length === 0 &&
      inputFactura.length === 0 &&
      inputPrecioDeCompra === 0 &&
      inputCantidad === 0 &&
      inputTotalAcomulado === 0 &&
      inputFranquicias.length === 0 &&
      inputSucursales.length === 0 &&
      inputSucursalOFranquicia.length === 0
    )
      return;

    agregarNuevoAcondicionamientoDeSucursal(
      inputSucursalOFranquicia,
      inputProducto,
      inputFechaDeCompra,
      inputDescripcionDelProducto,
      inputFechaEstimadaDeEntrega,
      inputProveedor,
      inputFactura,
      inputPrecioDeCompra,
      inputCantidad,
      inputTotalAcomulado,
      inputSucursales,
      inputFranquicias,
      true
    );

    MySwal.fire({
      position: "top-end",
      icon: "success",
      title: "Acondicionamiento de sucursal Agregado",
      showConfirmButton: false,
      timer: 5000,
    });

    setTouched(false);
    setInputProducto("");
    setInputFechaDeCompra("");
    setInputDescripcionDelProducto("");
    setInputFechaEstimadaDeEntrega("");
    setInputProveedor("");
    setInputFactura("");
    setInputPrecioDeCompra(0);
    setInputCantidad(0);
    setInputTotalAcomulado(0);
    setInputFranquicias("");
    setInputSucursales("");
    setInputSucursalOFranquicia("");
  };

  return (
    <SidebarLayoutGerenciaCompras>
      <form>
        <div className="shadow sm:rounded-md sm:overflow-hidden">
          <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Acondicionamiento de sucursales
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
                  htmlFor="TxtProductos"
                  className="block text-sm font-medium text-gray-700"
                >
                  Productos
                </label>
                <input
                  type="text"
                  name="TxtProductos"
                  id="TxtProductos"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  onChange={onTextFieldChangedProducto}
                  onBlur={() => setTouched(true)}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtFechaCompra"
                  className="block text-sm font-medium text-gray-700"
                >
                  Fecha de compra
                </label>
                <input
                  type="Date"
                  name="TxtFechaCompra"
                  id="TxtFechaCompra"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  onChange={onTextFieldChangedFechaDeCompra}
                  onBlur={() => setTouched(true)}
                />
              </div>

              <div className="col-span-6">
                <label
                  htmlFor="TxtDescripcionProducto"
                  className="block text-sm font-medium text-gray-700"
                >
                  Descripción del producto
                </label>
                <input
                  type="text"
                  name="TxtDescripcionProducto"
                  id="TxtDescripcionProducto"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  onChange={onTextFieldChangedDescripcionDelProducto}
                  onBlur={() => setTouched(true)}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtFechaEstimadaDeEntrega"
                  className="block text-sm font-medium text-gray-700"
                >
                  Fecha estimada de entrega
                </label>
                <input
                  type="Date"
                  name="TxtFechaEstimadaDeEntrega"
                  id="TxtFechaEstimadaDeEntrega"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  onChange={onTextFieldChangedFechaEstimadaDeEntrega}
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
                  onChange={onTextFieldChangedProveedor}
                  onBlur={() => setTouched(true)}
                  defaultValue="Selecciona un producto..."
                >
                  <option>Selecciona un proveedor...</option>
                  {proveedoresMemo.map((proveedor) => (
                    <option key={proveedor._id}> {proveedor.nombre} </option>
                  ))}
                </select>
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
                  defaultValue="Selecciona unq opción..."
                >
                  <option>Selecciona una opción...</option>
                  {validYesNoOptions.map((yesNoOptions) => (
                    <option key={yesNoOptions}>{yesNoOptions}</option>
                  ))}
                </select>
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtPrecioCompra"
                  className="block text-sm font-medium text-gray-700"
                >
                  Precio de la compra
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
                    value={isNaN(inputPrecioDeCompra) ? 0 : inputPrecioDeCompra}
                    onChange={onTextFieldChangedPrecioDeCompra}
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
                  htmlFor="TxtCantidad"
                  className="block text-sm font-medium text-gray-700"
                >
                  Cantidad
                </label>
                <input
                  type="text"
                  name="TxtCantidad"
                  id="TxtCantidad"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  value={isNaN(inputCantidad) ? 0 : inputCantidad}
                  onChange={onTextFieldChangedCantidad}
                  onBlur={() => setTouched(true)}
                  placeholder="0"
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtTotalAcumulado"
                  className="block text-sm font-medium text-gray-700"
                >
                  Total acomulado
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
                    value={isNaN(inputTotalAcomulado) ? 0 : inputTotalAcomulado}
                    onChange={onTextFieldChangedTotalAcomulado}
                    onBlur={() => setTouched(true)}
                    placeholder="0"
                    aria-describedby="price-currency"
                    readOnly
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

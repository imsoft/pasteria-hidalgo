import { SidebarLayoutGerenciaCompras } from "../../../components/layouts/gerencia-de-compras/SidebarLayoutGerenciaCompras";

import { AcondicionamientoDeSucursalesContext } from "../../../context/gerencia-de-compras/acondicionamientoDeSucursales/AcondicionamientoDeSucursalesContext";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { ChangeEvent, useContext, useState } from "react";

export default function AcondicionamientoDeSucursales() {
  const { agregarNuevoAcondicionamientoDeSucursal } = useContext(
    AcondicionamientoDeSucursalesContext
  );

  const [inputProducto, setInputProducto] = useState("");
  const [inputFechaDeCompra, setInputFechaDeCompra] = useState("");
  const [inputDescripcionDelProducto, setInputDescripcionDelProducto] = useState("");
  const [inputPrecioDeCompra, setInputPrecioDeCompra] = useState("");
  const [inputFechaEstimadaDeEntrega, setInputFechaEstimadaDeEntrega] = useState("");
  const [inputProveedor, setInputProveedor] = useState("");
  const [inputFactura, setInputFactura] = useState("");
  const [inputTotalAcomulado, setInputTotalAcomulado] = useState("");

  const [touched, setTouched] = useState(false);

  const MySwal = withReactContent(Swal);

  const onTextFieldChangedProducto = (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
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

  const onTextFieldChangedPrecioDeCompra = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputPrecioDeCompra(event.target.value);
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

  const onTextFieldChangedTotalAcomulado = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputTotalAcomulado(event.target.value);
  };

  const onSave = () => {
    if (
      inputProducto.length === 0 &&
      inputFechaDeCompra.length === 0 &&
      inputDescripcionDelProducto.length === 0 &&
      inputPrecioDeCompra.length === 0 &&
      inputFechaEstimadaDeEntrega.length === 0 &&
      inputProveedor.length === 0 &&
      inputFactura.length === 0 &&
      inputTotalAcomulado.length === 0
    )
      return;

    agregarNuevoAcondicionamientoDeSucursal(
      inputProducto,
      inputFechaDeCompra,
      inputDescripcionDelProducto,
      inputPrecioDeCompra,
      inputFechaEstimadaDeEntrega,
      inputProveedor,
      inputFactura,
      inputTotalAcomulado,
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
    setInputPrecioDeCompra("");
    setInputFechaEstimadaDeEntrega("");
    setInputProveedor("");
    setInputFactura("");
    setInputTotalAcomulado("");
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

            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtProductos"
                  className="block text-sm font-medium text-gray-700"
                >
                  Productos
                </label>
                <select
                  id="TxtProductos"
                  name="TxtProductos"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm rounded-md"
                  onChange={onTextFieldChangedProducto}
                  onBlur={() => setTouched(true)}
                  defaultValue="Selecciona un producto..."
                >
                  <option>Selecciona un producto...</option>
                  <option>Masa</option>
                  <option>Fresas</option>
                  <option>Leche</option>
                </select>
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
                    onChange={onTextFieldChangedPrecioDeCompra}
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
                  <option>Juan</option>
                  <option>Pedro</option>
                  <option>Luis</option>
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
                  <option>Si</option>
                  <option>No</option>
                </select>
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtTotalAcumulado"
                  className="block text-sm font-medium text-gray-700"
                >
                  Total acumulado
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
                    onChange={onTextFieldChangedTotalAcomulado}
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

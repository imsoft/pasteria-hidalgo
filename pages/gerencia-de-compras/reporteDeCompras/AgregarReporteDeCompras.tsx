import { ChangeEvent, useContext, useMemo, useState, useEffect } from "react";

import { SidebarLayoutGerenciaCompras } from "../../../components/layouts/gerencia-de-compras/SidebarLayoutGerenciaCompras";

import { ReporteDeCompraContext } from "../../../context/gerencia-de-compras/reporteDeCompras/ReporteDeComprasContext";
import { ProveedoresContext } from "../../../context/gerencia-de-compras/manejoDeProveedores";

import {
  IListadoDeReporteDeCompra,
  Temperatura,
  Unidades,
  YesNo,
} from "../../../interfaces";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useRouter } from "next/router";
import { MateriasPrimasContext } from "../../../context/gerencia-operativa/materiaPrima/MateriaPrimaContext";

const validYesNoOptions: YesNo[] = ["Si", "No"];

export default function ReporteDeCompras() {
  const router = useRouter();
  const { agregarReporteDeCompra } = useContext(ReporteDeCompraContext);

  const { proveedores } = useContext(ProveedoresContext);
  const proveedoresMemo = useMemo(() => proveedores, [proveedores]);

  const { materiasPrimas } = useContext(MateriasPrimasContext);
  const materiasPrimasMemo = useMemo(() => materiasPrimas, [materiasPrimas]);

  const [inputUuid, setInputUuid] = useState(1);
  const [inputFechaDeCompra, setInputFechaDeCompra] = useState("");
  const [inputCredito, setInputCredito] = useState("");
  const [inputMateriaPrima, setInputMateriaPrima] = useState("");
  const [inputUnidades, setInputUnidades] = useState("");
  const [inputNombreProveedor, setInputNombreProveedor] = useState("");
  const [inputTempetatura, setInputTempetatura] = useState("");
  const [inputCaducidad, setInputCaducidad] = useState("");
  const [inputFactura, setInputFactura] = useState("");
  const [inputCantidad, setInputCantidad] = useState(0);
  const [inputPrecioPorUnidad, setInputPrecioPorUnidad] = useState(0);
  const [inputPrecioTotalDelProducto, setInputPrecioTotalDelProducto] =
    useState(0);
  const [inputPrecioTotalDelCompra, setInputPrecioTotalDelCompra] = useState(0);

  const [inputListaReporteDeCompras, setInputListaReporteDeCompras] = useState<
    IListadoDeReporteDeCompra[]
  >([]);

  const [touched, setTouched] = useState(false);

  const MySwal = withReactContent(Swal);

  const onTextFieldChangedFechaDeCompra = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputFechaDeCompra(event.target.value);
  };

  const onTextFieldChangedCredito = (event: ChangeEvent<HTMLSelectElement>) => {
    setInputCredito(event.target.value);
  };

  const onTextFieldChangedMateriaPrima = (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    setInputMateriaPrima(event.target.value);
  };

  const onTextFieldChangedUnidades = (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    setInputUnidades(event.target.value as Unidades);
  };

  const onTextFieldChangedNombreProveedor = (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    setInputNombreProveedor(event.target.value);
  };

  const onTextFieldChangedTemperatura = (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    setInputTempetatura(event.target.value as Temperatura);
  };

  const onTextFieldChangedCaducidad = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputCaducidad(event.target.value);
  };

  const onTextFieldChangedFactura = (event: ChangeEvent<HTMLSelectElement>) => {
    setInputFactura(event.target.value);
  };

  const onTextFieldChangedCantidad = (event: ChangeEvent<HTMLInputElement>) => {
    setInputCantidad(parseInt(event.target.value));
  };

  const onTextFieldChangedPrecioPorUnidad = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputPrecioPorUnidad(parseInt(event.target.value));
  };

  const onTextFieldChangedPrecioTotalDelProducto = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputPrecioTotalDelProducto(parseInt(event.target.value));
  };

  const onTextFieldChangedPrecioTotalDelCompra = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputPrecioTotalDelCompra(parseInt(event.target.value));
  };

  const precioTotalDelProducto = () => {
    setInputPrecioTotalDelProducto(inputCantidad * inputPrecioPorUnidad);
  };

  useEffect(() => {
    precioTotalDelProducto();
  }, [inputCantidad]);

  useEffect(() => {
    precioTotalDelProducto();
  }, [inputPrecioPorUnidad]);

  const agregarALaLista = () => {
    setInputUuid(inputUuid + 1);

    const nuevaListaReporteDeCompras: IListadoDeReporteDeCompra = {
      uuid: inputUuid,
      materiaPrima: inputMateriaPrima,
      unidades: inputUnidades as Unidades,
      tempetatura: inputTempetatura as Temperatura,
      caducidad: inputCaducidad,
      cantidad: inputCantidad,
      precioPorUnidad: inputPrecioPorUnidad,
      precioTotalDelProducto: inputPrecioTotalDelProducto,
    };

    setInputListaReporteDeCompras([
      ...inputListaReporteDeCompras,
      nuevaListaReporteDeCompras,
    ]);

    setInputPrecioTotalDelCompra(
      inputPrecioTotalDelCompra + inputPrecioTotalDelProducto
    );

    // resetForm();
  };

  const eliminarDeLaLista = (idProducto: number) => {
    setInputListaReporteDeCompras(
      inputListaReporteDeCompras.filter((producto) => {
        setInputPrecioTotalDelCompra(
          inputPrecioTotalDelCompra - producto.precioTotalDelProducto
        );
        return producto.uuid !== idProducto;
      })
    );
  };

  const updateProduct = (idProducto: number) => {
    const productoAEditar = inputListaReporteDeCompras.find(
      (producto) => producto.uuid === idProducto
    );

    setInputUuid(productoAEditar?.uuid!);
    setInputMateriaPrima(productoAEditar?.materiaPrima!);
    setInputUnidades(productoAEditar?.unidades!);
    setInputTempetatura(productoAEditar?.tempetatura!);
    setInputCaducidad(productoAEditar?.caducidad!);
    setInputCantidad(productoAEditar?.cantidad!);
    setInputPrecioPorUnidad(productoAEditar?.precioPorUnidad!);
    setInputPrecioTotalDelProducto(productoAEditar?.precioTotalDelProducto!);

    eliminarDeLaLista(idProducto);
  };

  const resetForm = () => {
    setTouched(false);
    setInputMateriaPrima("");
    setInputUnidades("");
    setInputTempetatura("");
    setInputCaducidad("");
    setInputCantidad(0);
    setInputPrecioPorUnidad(0);
    setInputPrecioTotalDelProducto(0);
  };

  const onSave = () => {

    console.log(inputFechaDeCompra);
    console.log(inputNombreProveedor);
    console.log(inputFactura);
    console.log(inputCredito);

    if (
      inputFechaDeCompra.length === 0 &&
      inputCredito.length === 0 &&
      inputNombreProveedor.length === 0 &&
      inputFactura.length === 0 &&
      inputListaReporteDeCompras.length === 0 &&
      inputPrecioTotalDelCompra === 0
    )
      return;

    agregarReporteDeCompra(
      inputFechaDeCompra,
      inputNombreProveedor,
      inputCredito,
      inputFactura,
      inputListaReporteDeCompras,
      inputPrecioTotalDelCompra,
      true
    );

    MySwal.fire({
      position: "top-end",
      icon: "success",
      title: "Reporte de compra Agregado",
      showConfirmButton: false,
      timer: 5000,
    });

    router.push("/gerencia-de-compras/reporteDeCompras/VerReporteDeCompras");

    resetForm();
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
                  htmlFor="TxtFechaDeCompra"
                  className="block text-sm font-medium text-gray-700"
                >
                  Fecha de Compra
                </label>
                <input
                  type="date"
                  name="TxtFechaDeCompra"
                  id="TxtFechaDeCompra"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  value={inputFechaDeCompra || ""}
                  onChange={onTextFieldChangedFechaDeCompra}
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
                  value={inputNombreProveedor || ""}
                  onChange={onTextFieldChangedNombreProveedor}
                  onBlur={() => setTouched(true)}
                >
                  <option hidden>Selecciona un proveedor...</option>
                  {proveedoresMemo.map((proveedor) => (
                    <option key={proveedor._id}> {proveedor.nombre} </option>
                  ))}
                </select>
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
                  value={inputCredito || ""}
                  onChange={onTextFieldChangedCredito}
                  onBlur={() => setTouched(true)}
                >
                  <option>Selecciona una opción...</option>
                  {validYesNoOptions.map((yesNoOptions) => (
                    <option key={yesNoOptions}>{yesNoOptions}</option>
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
                  value={inputFactura || ""}
                  onChange={onTextFieldChangedFactura}
                  onBlur={() => setTouched(true)}
                >
                  <option>Selecciona una opción...</option>
                  {validYesNoOptions.map((yesNoOptions) => (
                    <option key={yesNoOptions}>{yesNoOptions}</option>
                  ))}
                </select>
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="CmbMateriaPrima"
                  className="block text-sm font-medium text-gray-700"
                >
                  Materia Prima
                </label>
                <select
                  id="CmbMateriaPrima"
                  name="CmbMateriaPrima"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm rounded-md"
                  value={inputMateriaPrima || ""}
                  onChange={onTextFieldChangedMateriaPrima}
                  onBlur={() => setTouched(true)}
                >
                  <option hidden>Selecciona un producto...</option>
                  {materiasPrimasMemo.map((materiaPrima) => (
                    <option key={materiaPrima._id}>
                      {" "}
                      {materiaPrima.materiaPrima}{" "}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="CmbUnidades"
                  className="block text-sm font-medium text-gray-700"
                >
                  Unidades
                </label>
                <select
                  id="CmbUnidades"
                  name="CmbUnidades"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm rounded-md"
                  onChange={onTextFieldChangedUnidades}
                  onBlur={() => setTouched(true)}
                >
                  <option hidden>Selecciona una opción...</option>
                  {materiasPrimasMemo
                    .filter((units) => units.materiaPrima === inputMateriaPrima)
                    .map((units) => (
                      <option key={units.unidades}>{units.unidades}</option>
                    ))}
                </select>
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtTemperatura"
                  className="block text-sm font-medium text-gray-700"
                >
                  Temperatura
                </label>
                <select
                  id="TxtTemperatura"
                  name="TxtTemperatura"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm rounded-md"
                  onChange={onTextFieldChangedTemperatura}
                  onBlur={() => setTouched(true)}
                >
                  <option hidden>Selecciona una opción...</option>
                  {materiasPrimasMemo
                    .filter(
                      (temperature) =>
                        temperature.materiaPrima === inputMateriaPrima
                    )
                    .map((temperature) => (
                      <option key={temperature.temperatura}>
                        {temperature.temperatura}
                      </option>
                    ))}
                </select>
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
                  htmlFor="TxtTiposDeProductosQueSeCompran"
                  className="block text-sm font-medium text-gray-700"
                >
                  Cantidad
                </label>
                <input
                  type="text"
                  name="TxtTiposDeProductosQueSeCompran"
                  id="TxtTiposDeProductosQueSeCompran"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  value={isNaN(inputCantidad) ? 0 : inputCantidad}
                  onChange={onTextFieldChangedCantidad}
                  onBlur={() => setTouched(true)}
                />
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
                    value={
                      isNaN(inputPrecioPorUnidad) ? 0 : inputPrecioPorUnidad
                    }
                    onChange={onTextFieldChangedPrecioPorUnidad}
                    onBlur={() => setTouched(true)}
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
                    name="TxtPrecioTotalDelProducto"
                    id="TxtPrecioTotalDelProducto"
                    className="focus:ring-primary-yellow focus:border-primary-yellow block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                    value={
                      isNaN(inputPrecioTotalDelProducto)
                        ? 0
                        : inputPrecioTotalDelProducto
                    }
                    onChange={onTextFieldChangedPrecioTotalDelProducto}
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
                    name="TxtPrecioTotalDeLaCompra"
                    id="TxtPrecioTotalDeLaCompra"
                    className="focus:ring-primary-yellow focus:border-primary-yellow block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                    value={inputPrecioTotalDelCompra}
                    onChange={onTextFieldChangedPrecioTotalDelCompra}
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

            <div className="px-4 py-3 mt-4 text-right sm:px-6">
              <button
                type="button"
                className="bg-primary-yellow border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-primary-yellow hover:text-primary-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-yellow"
                onClick={agregarALaLista}
              >
                Añadir a la lista
              </button>
            </div>
          </div>

          <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
              <div className="sm:flex-auto">
                <h1 className="text-xl font-semibold text-gray-900">
                  Reporte de compra
                </h1>
                <p className="mt-2 text-sm text-gray-700">
                  Aquí podras ver los productos que vayas agregando a tu reporte
                  de venta.
                </p>
              </div>
              <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none"></div>
            </div>
            <div className="mt-8 flex flex-col">
              <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                  <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-300">
                      <thead className="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                          >
                            No. De Producto
                          </th>
                          <th
                            scope="col"
                            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                          >
                            Materia Prima
                          </th>

                          <th
                            scope="col"
                            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                          >
                            Unidades
                          </th>

                          <th
                            scope="col"
                            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                          >
                            Temperatura
                          </th>

                          <th
                            scope="col"
                            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                          >
                            Caducidad
                          </th>

                          <th
                            scope="col"
                            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                          >
                            Cantidad
                          </th>

                          <th
                            scope="col"
                            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                          >
                            Precio Por Unidad
                          </th>

                          <th
                            scope="col"
                            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                          >
                            Precio Total Del Producto
                          </th>
                          <th
                            scope="col"
                            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                          ></th>
                          <th
                            scope="col"
                            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                          ></th>
                        </tr>
                      </thead>
                      {inputListaReporteDeCompras.map((listadoReporte) => (
                        <tbody
                          key={listadoReporte.uuid}
                          className="divide-y divide-gray-200 bg-white"
                        >
                          <tr className="cursor-pointer hover:bg-yellow-100">
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              <div className="font-medium text-gray-900">
                                {listadoReporte.uuid}
                              </div>
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              <div className="font-medium text-gray-900">
                                {listadoReporte.materiaPrima}
                              </div>
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              <div className="font-medium text-gray-900">
                                {listadoReporte.unidades}
                              </div>
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              <div className="font-medium text-gray-900">
                                {listadoReporte.tempetatura}
                              </div>
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              <div className="font-medium text-gray-900">
                                {listadoReporte.caducidad}
                              </div>
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              <div className="font-medium text-gray-900">
                                {listadoReporte.cantidad}
                              </div>
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              <div className="font-medium text-gray-900">
                                $ {listadoReporte.precioPorUnidad}
                              </div>
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              <div className="font-medium text-gray-900">
                                $ {listadoReporte.precioTotalDelProducto}
                              </div>
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              <button
                                type="button"
                                className="bg-primary-yellow border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-primary-blue hover:text-primary-yellow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-yellow"
                                onClick={() =>
                                  updateProduct(listadoReporte.uuid)
                                }
                              >
                                Editar
                              </button>
                            </td>

                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              <button
                                type="button"
                                className="bg-primary-yellow border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-primary-blue hover:text-primary-yellow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-yellow"
                                onClick={() =>
                                  eliminarDeLaLista(listadoReporte.uuid)
                                }
                              >
                                Eliminar
                              </button>
                            </td>
                          </tr>
                        </tbody>
                      ))}
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="px-4 py-3 mt-4 bg-gray-50 text-right sm:px-6">
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

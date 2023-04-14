import { ChangeEvent, useContext, useEffect, useMemo, useState } from "react";

import { ReportesDeSalidaContext } from "../../../context/gerencia-operativa/reporteDeSalida/ReportesDeSalidaContext";

import { SidebarLayoutGerenciaOperativa } from "../../../components/layouts/gerencia-operativa/SidebarLayoutGerenciaOperativa";

import {
  IListadoReporteDeSalida,
  Paste,
  TipoDeProducto,
} from "../../../interfaces";

import { useRouter } from "next/router";
import { SucursalesYFranquiciasContext } from "../../../context/gerencia-operativa/sucursalYFranquicia";

const validProductType: TipoDeProducto[] = [
  "Paste Dulce",
  "Paste Salado",
  "Otros",
  "Extra",
];

const validCakeFlavors: Paste[] = [
  {
    _id: "PD_ACL",
    saborDelPaste: "Arroz con leche",
    precio: 30,
    tipoDeProducto: "Paste Dulce",
  },
  {
    _id: "PD_CP",
    saborDelPaste: "Crema pastelera",
    precio: 30,
    tipoDeProducto: "Paste Dulce",
  },
  {
    _id: "PD_FCP",
    saborDelPaste: "Frambuesa con philadelphia",
    precio: 30,
    tipoDeProducto: "Paste Dulce",
  },
  {
    _id: "PD_FRCP",
    saborDelPaste: "Frutos rojos con philadelphia",
    precio: 30,
    tipoDeProducto: "Paste Dulce",
  },
  {
    _id: "PD_GCP",
    saborDelPaste: "Guayaba con philadelphia",
    precio: 30,
    tipoDeProducto: "Paste Dulce",
  },
  {
    _id: "PD_H",
    saborDelPaste: "Hawaiano",
    precio: 30,
    tipoDeProducto: "Paste Dulce",
  },
  {
    _id: "PD_MCP",
    saborDelPaste: "Manzana con philadelphia",
    precio: 30,
    tipoDeProducto: "Paste Dulce",
  },
  {
    _id: "PD_NCP",
    saborDelPaste: "Nutella con philadelphia",
    precio: 30,
    tipoDeProducto: "Paste Dulce",
  },
  {
    _id: "PD_PCP",
    saborDelPaste: "Piña con philadelphia",
    precio: 30,
    tipoDeProducto: "Paste Dulce",
  },
  {
    _id: "PS_A",
    saborDelPaste: "Atun",
    precio: 30,
    tipoDeProducto: "Paste Salado",
  },
  {
    _id: "PS_FCC",
    saborDelPaste: "Frijol con chorizo",
    precio: 30,
    tipoDeProducto: "Paste Salado",
  },
  {
    _id: "PS_H",
    saborDelPaste: "Hidalguense",
    precio: 30,
    tipoDeProducto: "Paste Salado",
  },
  {
    _id: "PS_M",
    saborDelPaste: "Marlin",
    precio: 30,
    tipoDeProducto: "Paste Salado",
  },
  {
    _id: "PS_MR",
    saborDelPaste: "Mole rojo",
    precio: 30,
    tipoDeProducto: "Paste Salado",
  },
  {
    _id: "PS_MV",
    saborDelPaste: "Mole Verde",
    precio: 30,
    tipoDeProducto: "Paste Salado",
  },
  {
    _id: "PS_PCC",
    saborDelPaste: "Papa con carne",
    precio: 30,
    tipoDeProducto: "Paste Salado",
  },
  {
    _id: "PS_P",
    saborDelPaste: "Pepperoni",
    precio: 30,
    tipoDeProducto: "Paste Salado",
  },
  {
    _id: "PS_RCC",
    saborDelPaste: "Rajas con champiñon",
    precio: 30,
    tipoDeProducto: "Paste Salado",
  },
  {
    _id: "PS_RCE",
    saborDelPaste: "Requeson con espinacas",
    precio: 30,
    tipoDeProducto: "Paste Salado",
  },
  {
    _id: "PS_S",
    saborDelPaste: "Salchicha",
    precio: 30,
    tipoDeProducto: "Paste Salado",
  },
  {
    _id: "PS_TCP",
    saborDelPaste: "Tocino con papas",
    precio: 30,
    tipoDeProducto: "Paste Salado",
  },
  {
    _id: "O_A",
    saborDelPaste: "Agua",
    precio: 10,
    tipoDeProducto: "Otros",
  },
  {
    _id: "O_CC",
    saborDelPaste: "Café chico",
    precio: 25,
    tipoDeProducto: "Otros",
  },
  {
    _id: "O_C12O",
    saborDelPaste: "Café 12 Onz",
    precio: 30,
    tipoDeProducto: "Otros",
  },
  {
    _id: "O_C16O",
    saborDelPaste: "Café 16 Onz",
    precio: 35,
    tipoDeProducto: "Otros",
  },
  {
    _id: "O_G",
    saborDelPaste: "Galletas",
    precio: 20,
    tipoDeProducto: "Otros",
  },
  {
    _id: "O_R",
    saborDelPaste: "Refresco",
    precio: 20,
    tipoDeProducto: "Otros",
  },
  {
    _id: "O_SR",
    saborDelPaste: "Salsa roja",
    precio: 4,
    tipoDeProducto: "Otros",
  },
  {
    _id: "O_SV",
    saborDelPaste: "Salsa verde",
    precio: 4,
    tipoDeProducto: "Otros",
  },
];

export default function ReportesSalida() {
  const router = useRouter();
  const { agregarNuevoReporteDeSalida } = useContext(ReportesDeSalidaContext);

  const { sucursalesYFranquicias } = useContext(SucursalesYFranquiciasContext);
  const sucursalesYFranquiciasMemo = useMemo(
    () => sucursalesYFranquicias,
    [sucursalesYFranquicias]
  );

  const [inputFecha, setInputFecha] = useState("");
  const [inputCodigoProducto, setInputCodigoProducto] = useState("");
  const [inputListaDeProductos, setInputListaDeProductos] = useState<
    IListadoReporteDeSalida[]
  >([]);
  const [inputTipoDeProducto, setInputTipoDeProducto] = useState("");
  const [inputSaborProducto, setInputSaborProducto] = useState("");
  const [inputCantidad, setInputCantidad] = useState(0);
  const [inputUuid, setInputUuid] = useState(0);
  const [inputSucursalAEnviar, setInputSucursalAEnviar] = useState("");
  const [inputDatosDeRepartidor, setInputDatosDeRepartidor] = useState("");
  const [inputDatosDeLaRuta, setInputDatosDeLaRuta] = useState("");
  const [inputKilometrajeDeEntrada, setInputKilometrajeDeEntrada] =
    useState("");
  const [inputKilometrajeDeSalida, setInputKilometrajeDeSalida] = useState("");

  const [touched, setTouched] = useState(false);

  const onTextFieldChangedFecha = (event: ChangeEvent<HTMLInputElement>) => {
    setInputFecha(event.target.value);
  };

  const onTextFieldChangedTipoDeProducto = (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    setInputTipoDeProducto(event.target.value as TipoDeProducto);
  };

  const onTextFieldChangedCodigoProducto = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputCodigoProducto(event.target.value);
  };

  const onTextFieldChangedSaborProducto = (
    event: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>
  ) => {
    setInputSaborProducto(event.target.value);
  };

  const onTextFieldChangedCantidad = (event: ChangeEvent<HTMLInputElement>) => {
    setInputCantidad(parseInt(event.target.value));
  };

  const onTextFieldChangedSucursalAEnviar = (
    event: ChangeEvent<HTMLSelectElement>
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

  const onTextFieldChangedKilometrajeDeEntrada = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputKilometrajeDeEntrada(event.target.value);
  };

  const onTextFieldChangedKilometrajeDeSalida = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputKilometrajeDeSalida(event.target.value);
  };

  const lookUpProductId = () => {
    const result = validCakeFlavors.find(
      (cakeFlavors) => cakeFlavors.saborDelPaste === inputSaborProducto
    );
    setInputCodigoProducto(result?._id!);
  };

  useEffect(() => {
    lookUpProductId();
  }, [inputSaborProducto]);

  const agregarALaLista = () => {
    setInputUuid(inputUuid + 1);

    const nuevaListaProductos = {
      uuid: inputUuid,
      fecha: inputFecha,
      tipoDeProducto: inputTipoDeProducto as TipoDeProducto,
      producto: inputSaborProducto,
      codigoDelProducto: inputCodigoProducto,
      cantidadDeProducto: inputCantidad,
    };

    setInputListaDeProductos([...inputListaDeProductos, nuevaListaProductos]);

    resetForm();
  };

  const resetForm = () => {
    setInputFecha("");
    setInputTipoDeProducto("");
    setInputSaborProducto("");
    setInputCodigoProducto("");
    setInputCantidad(0);
  };

  const eliminarDeLaLista = (idProducto: number) => {
    setInputListaDeProductos(
      inputListaDeProductos.filter((producto) => {
        return producto.uuid !== idProducto;
      })
    );
  };

  const updateProduct = (idProducto: number) => {
    const productoAEditar = inputListaDeProductos.find(
      (producto) => producto.uuid === idProducto
    );
    setInputUuid(productoAEditar?.uuid!);
    setInputFecha(productoAEditar?.fecha!);
    setInputTipoDeProducto(productoAEditar?.tipoDeProducto!);
    setInputSaborProducto(productoAEditar?.producto!);
    setInputCodigoProducto(productoAEditar?.codigoDelProducto!);
    setInputCantidad(productoAEditar?.cantidadDeProducto!);
  };

  const onSave = () => {
    if (
      inputFecha.length === 0 &&
      inputListaDeProductos.length === 0 &&
      inputSucursalAEnviar.length === 0 &&
      inputDatosDeRepartidor.length === 0 &&
      inputDatosDeLaRuta.length === 0 &&
      inputKilometrajeDeEntrada.length === 0 &&
      inputKilometrajeDeSalida.length === 0
    )
      return;

    agregarNuevoReporteDeSalida(
      inputSucursalAEnviar,
      inputDatosDeRepartidor,
      inputDatosDeLaRuta,
      inputKilometrajeDeEntrada,
      inputKilometrajeDeSalida,
      inputListaDeProductos,
      true
    );

    router.push("/gerencia-operativa/reporteDeSalida/VerReportesDeSalida");

    setTouched(false);
    setInputFecha("");
    setInputSucursalAEnviar("");
    setInputDatosDeRepartidor("");
    setInputDatosDeLaRuta("");
    setInputKilometrajeDeEntrada("");
    setInputKilometrajeDeSalida("");
  };

  return (
    <SidebarLayoutGerenciaOperativa>
      <form>
        <div className="shadow sm:rounded-md sm:overflow-hidden">
          <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Reporte Salida
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
                  value={inputFecha || ""}
                  onChange={onTextFieldChangedFecha}
                  onBlur={() => setTouched(true)}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtTipoDeProducto"
                  className="block text-sm font-medium text-gray-700"
                >
                  Tipo de producto
                </label>
                <select
                  id="TxtTipoDeProducto"
                  name="TxtTipoDeProducto"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm rounded-md"
                  value={inputTipoDeProducto || ""}
                  onChange={onTextFieldChangedTipoDeProducto}
                  onBlur={() => setTouched(true)}
                >
                  {/* <option disabled selected>Selecciona una opción</option>
                  <option value="">Selecciona una opción</option> */}
                  <option hidden>Selecciona un producto...</option>
                  {validProductType.map((productType) => (
                    <option key={productType}>{productType}</option>
                  ))}
                </select>
              </div>

              <div className={"col-span-6 sm:col-span-3"}>
                <label
                  htmlFor="CmbSaboresDulces"
                  className="block text-sm font-medium text-gray-700"
                >
                  Producto
                </label>
                {inputTipoDeProducto !== "Extra" ? (
                  <select
                    id="CmbSaboresDulces"
                    name="CmbSaboresDulces"
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm rounded-md"
                    value={inputSaborProducto || ""}
                    onChange={onTextFieldChangedSaborProducto}
                    onBlur={() => setTouched(true)}
                  >
                    <option hidden>Selecciona un producto...</option>
                    {validCakeFlavors
                      .filter(
                        (cakeFlavors) =>
                          cakeFlavors.tipoDeProducto === inputTipoDeProducto
                      )
                      .map((cakeFlavors) => (
                        <option key={cakeFlavors.saborDelPaste}>
                          {cakeFlavors.saborDelPaste}
                        </option>
                      ))}
                  </select>
                ) : (
                  <input
                    type="text"
                    name="TxtSaboresDulces"
                    id="TxtSaboresDulces"
                    autoComplete="off"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                    value={inputSaborProducto || ""}
                    onChange={onTextFieldChangedSaborProducto}
                    onBlur={() => setTouched(true)}
                  />
                )}
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtCodigoProducto"
                  className="block text-sm font-medium text-gray-700"
                >
                  Código de producto
                </label>
                <input
                  type="text"
                  name="TxtCodigoProducto"
                  id="TxtCodigoProducto"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  value={inputCodigoProducto || ""}
                  onChange={onTextFieldChangedCodigoProducto}
                  onBlur={() => setTouched(true)}
                  readOnly
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtDescripcionProducto"
                  className="block text-sm font-medium text-gray-700"
                >
                  Cantidad de producto
                </label>
                <input
                  type="number"
                  min={1}
                  name="TxtDescripcionProducto"
                  id="TxtDescripcionProducto"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  value={inputCantidad || ""}
                  onChange={onTextFieldChangedCantidad}
                  onBlur={() => setTouched(true)}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="CmbFranquicia"
                  className="block text-sm font-medium text-gray-700"
                >
                  Sucursal a enviar
                </label>
                <select
                  id="CmbFranquicia"
                  name="CmbFranquicia"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm rounded-md"
                  defaultValue="Selecciona un producto..."
                  onChange={onTextFieldChangedSucursalAEnviar}
                  onBlur={() => setTouched(true)}
                >
                  <option hidden>Seleccione la sucursal...</option>
                  {sucursalesYFranquiciasMemo
                    .filter(
                      (sucursalesYFranquicias) =>
                        sucursalesYFranquicias.sucursalOFranquicia ===
                        "Sucursal"
                    )
                    .map((sucursalesYFranquicias) => (
                      <option
                        key={sucursalesYFranquicias.nombreSucursalOFranquicia}
                      >
                        {sucursalesYFranquicias.nombreSucursalOFranquicia}
                      </option>
                    ))}
                </select>
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtDescripcionProducto"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nombre del Repartidor
                </label>
                <input
                  type="text"
                  name="TxtDescripcionProducto"
                  id="TxtDescripcionProducto"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  value={inputDatosDeRepartidor || ""}
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
                  value={inputDatosDeLaRuta || ""}
                  onChange={onTextFieldChangedDatosDeLaRuta}
                  onBlur={() => setTouched(true)}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtKilometrajeDeEntrada"
                  className="block text-sm font-medium text-gray-700"
                >
                  Kilometraje de entrada
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    type="text"
                    name="TxtKilometrajeDeEntrada"
                    id="TxtKilometrajeDeEntrada"
                    className="focus:ring-primary-yellow focus:border-primary-yellow block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                    value={inputKilometrajeDeEntrada || ""}
                    onChange={onTextFieldChangedKilometrajeDeEntrada}
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
                  htmlFor="TxtKilometrajeDeSalida"
                  className="block text-sm font-medium text-gray-700"
                >
                  Kilometraje de salida
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    type="text"
                    name="TxtKilometrajeDeSalida"
                    id="TxtKilometrajeDeSalida"
                    className="focus:ring-primary-yellow focus:border-primary-yellow block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                    value={inputKilometrajeDeSalida || ""}
                    onChange={onTextFieldChangedKilometrajeDeSalida}
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

          <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
              <div className="sm:flex-auto">
                <h1 className="text-xl font-semibold text-gray-900">
                  Reporte de salida
                </h1>
                <p className="mt-2 text-sm text-gray-700">
                  Aquí podras ver los productos que vayas agregando a tu reporte
                  de salida.
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
                            Fecha
                          </th>

                          <th
                            scope="col"
                            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                          >
                            Tipo de producto
                          </th>

                          <th
                            scope="col"
                            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                          >
                            Producto
                          </th>

                          <th
                            scope="col"
                            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                          >
                            Código de producto
                          </th>

                          <th
                            scope="col"
                            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                          >
                            Cantidad del producto
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
                      {inputListaDeProductos.map((listadoProductos) => (
                        <tbody
                          key={listadoProductos.uuid}
                          className="divide-y divide-gray-200 bg-white"
                        >
                          <tr className="cursor-pointer hover:bg-yellow-100">
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              <div className="font-medium text-gray-900">
                                {listadoProductos.fecha || ""}
                              </div>
                            </td>

                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              <div className="font-medium text-gray-900">
                                {listadoProductos.tipoDeProducto || ""}
                              </div>
                            </td>

                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              <div className="font-medium text-gray-900">
                                {listadoProductos.producto || ""}
                              </div>
                            </td>

                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              <div className="font-medium text-gray-900">
                                {listadoProductos.codigoDelProducto || ""}
                              </div>
                            </td>

                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              <div className="font-medium text-gray-900">
                                {listadoProductos.cantidadDeProducto || ""}
                              </div>
                            </td>

                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              <button
                                type="button"
                                className="bg-primary-yellow border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-primary-blue hover:text-primary-yellow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-yellow"
                                onClick={() =>
                                  updateProduct(listadoProductos.uuid)
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
                                  eliminarDeLaLista(listadoProductos.uuid)
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

          <div className="px-4 py-3 mt-6 bg-gray-50 text-right sm:px-6">
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

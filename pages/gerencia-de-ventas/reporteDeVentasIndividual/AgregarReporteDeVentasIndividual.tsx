import { ChangeEvent, useState, useEffect, useContext, useMemo } from "react";

import { SidebarLayoutGerenciaVentas } from "../../../components/layouts/gerencia-de-ventas/SidebarLayoutGerenciaVentas";

import {
  ClienteFrecuente,
  ListadoDeProductos,
  LugarDeVenta,
  TipoDeProducto,
  VentasSucursalIndividual,
} from "../../../interfaces";

import { ReportesVentasIndividualContext } from "../../../context/gerencia-de-ventas/reporteVentasIndividual/ReportesVentasIndividualContext";
import { ClientesFrecuentesContext } from "../../../context/gerencia-de-ventas/clienteFrecuente/ClientesFrecuentesContext";
import { useRouter } from "next/router";
import { SucursalesYFranquiciasContext } from "../../../context/gerencia-operativa/sucursalYFranquicia";
import { ReporteDeGananciaContext } from "../../../context/contaduria/reporteDeGanancia";
import {
  dividirFecha,
  generateTicket,
  validMenuProducts,
  validProductType,
} from "../../../utils";
import { MinusIcon, PlusIcon } from "@heroicons/react/outline";
import { AuthContext } from "../../../context/auth";

const validSalesPlace: LugarDeVenta[] = ["Evento", "Franquicia", "Sucursal"];

const tiempoTranscurrido = Date.now();
const hoy = new Date(tiempoTranscurrido);

const anio = hoy.getFullYear();
const mes = hoy.getMonth() + 1;
const dia = hoy.getDate();

const useClientPoints = [
  { id: "si", title: "Si" },
  { id: "no", title: "No" },
];

const AgregarReporteDeVentasIndividual = () => {
  const router = useRouter();

  const { user } = useContext(AuthContext);

  const { agregarNuevoReporteVentasIndividual } = useContext(
    ReportesVentasIndividualContext
  );

  const { agregarNuevoReporteDeGanancia } = useContext(
    ReporteDeGananciaContext
  );

  const {
    clientesFrecuentes,
    actualizarClienteFrecuente,
    refreshClientesFrecuentes,
  } = useContext(ClientesFrecuentesContext);
  const clientesFrecuentesMemo = useMemo(
    () => clientesFrecuentes,
    [clientesFrecuentes]
  );

  const { sucursalesYFranquicias, refreshSucursalesYFranquicias } = useContext(
    SucursalesYFranquiciasContext
  );
  const sucursalesYFranquiciasMemo = useMemo(
    () => sucursalesYFranquicias,
    [sucursalesYFranquicias]
  );

  const [inputCodigoProducto, setInputCodigoProducto] = useState("");
  const [inputFecha, setInputFecha] = useState(
    `${dia < 10 ? "0" + dia : dia}/${mes < 10 ? "0" + mes : mes}/${anio}`
  );
  const [inputNombreVendedor, setInputNombreVendedor] = useState(user?.nombre);
  const [inputLugarDeLaVenta, setInputLugarDeLaVenta] = useState(
    user?.sucursalOFranquicia
  );
  const [inputTipoDeProducto, setInputTipoDeProducto] = useState("");
  const [inputSaborProducto, setInputSaborProducto] = useState("");
  const [inputCantidad, setInputCantidad] = useState(0);
  const [inputPrecioProducto, setInputPrecioProducto] = useState(0);
  const [inputMonto, setInputMonto] = useState(0);
  let [inputSumaTotal, setInputSumaTotal] = useState(0);
  const [inputCorreoClienteFrecuente, setInputCorreoClienteFrecuente] =
    useState("");
  const [inputPuntosClienteFrecuente, setInputPuntosClienteFrecuente] =
    useState(0);
  const [inputNombreSucursalOFranquicia, setInputNombreSucursalOFranquicia] =
    useState(user?.nombreSucursalOFranquicia);

  const [inputListaDeProductos, setInputListaDeProductos] = useState<
    ListadoDeProductos[]
  >([]);

  const [inputUsarPuntos, setInputUsarPuntos] = useState("");
  const [inputPromocion, setInputPromocion] = useState("No");

  const [touched, setTouched] = useState(false);

  const onTextFieldChangedNombreVendedor = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputNombreVendedor(event.target.value);
  };

  const onTextFieldChangedLugarDeLaVenta = (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    setInputLugarDeLaVenta(event.target.value);
  };

  const onTextFieldChangedNombreSucursalOFranquicia = (
    event: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>
  ) => {
    setInputNombreSucursalOFranquicia(event.target.value);
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
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    setInputSaborProducto(event.target.value);
  };

  const onTextFieldChangedCantidad = (event: ChangeEvent<HTMLInputElement>) => {
    setInputCantidad(parseInt(event.target.value));
  };

  const onTextFieldChangedPrecioProducto = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputPrecioProducto(parseInt(event.target.value));
  };

  const onTextFieldChangedMonto = (event: ChangeEvent<HTMLInputElement>) => {
    setInputMonto(parseInt(event.target.value));
  };

  const onTextFieldChangedSumaTotal = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputSumaTotal(parseInt(event.target.value));
  };

  const onTextFieldChangedCorreoClienteFrecuente = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputCorreoClienteFrecuente(event.target.value);
  };

  const onTextFieldChangedPuntosClienteFrecuente = (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    setInputPuntosClienteFrecuente(parseInt(event.target.value));
  };

  const onTextFieldChangedUsarPuntos = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputUsarPuntos(event.target.value);
  };

  const onTextFieldChangedPromocion = (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    setInputPromocion(event.target.value);
  };

  const lookUpProductPrice = () => {
    try {
      const result = validMenuProducts.find(
        (menuProducts) =>
          menuProducts.tipoDeProducto === inputTipoDeProducto &&
          menuProducts.saborDelPaste === inputSaborProducto
      );
      setInputPrecioProducto(result?.precio!);
    } catch (error) {
      console.log(error);
    }
  };

  const lookUpProductId = () => {
    try {
      const result = validMenuProducts.find(
        (menuProducts) =>
          menuProducts.tipoDeProducto === inputTipoDeProducto &&
          menuProducts.saborDelPaste === inputSaborProducto
      );
      setInputCodigoProducto(result?._id!);
    } catch (error) {
      console.log(error);
    }
  };

  const calculateAmount = () => {
    setInputMonto(inputPrecioProducto * inputCantidad);
  };

  const usoDePuntosClienteFrecuente = () => {
    setInputSumaTotal(inputSumaTotal - inputPuntosClienteFrecuente);
  };

  useEffect(() => {
    refreshSucursalesYFranquicias();
    refreshClientesFrecuentes();
  }, []);

  useEffect(() => {
    setInputCodigoProducto("");
    setInputPrecioProducto(0);
    setInputCantidad(0);
  }, [inputTipoDeProducto]);

  useEffect(() => {
    lookUpProductPrice();
    lookUpProductId();
  }, [inputSaborProducto]);

  useEffect(() => {
    calculateAmount();
  }, [inputPrecioProducto, inputCantidad]);

  useEffect(() => {
    usoDePuntosClienteFrecuente();
  }, [inputPuntosClienteFrecuente, inputCorreoClienteFrecuente]);

  useEffect(() => {
    switch (inputPromocion) {
      case "No":
        setInputSumaTotal((inputSumaTotal = -0));
        break;
      case "Compra 6 pastes y llevate 1":
        setInputSumaTotal((inputSumaTotal = -30));
        break;
      case "Compra 10 pastes y llevate 2":
        setInputSumaTotal((inputSumaTotal = -60));
        break;
      case "Paste gratis":
        setInputSumaTotal((inputSumaTotal = -30));
        break;

      default:
        return;
    }
  }, [inputPromocion]);

  const addProductQuantity = () => setInputCantidad(inputCantidad + 1);

  const removeProductQuantity = () => {
    if (inputCantidad <= 1) return;
    setInputCantidad(inputCantidad - 1);
  };

  const agregarALaLista = () => {
    const nuevaListaProductos = {
      idProducto: inputCodigoProducto,
      tipoDeProducto: inputTipoDeProducto as TipoDeProducto,
      saborProducto: inputSaborProducto,
      cantidad: inputCantidad,
      precioProducto: inputPrecioProducto,
      monto: inputMonto,
    };

    setInputListaDeProductos([...inputListaDeProductos, nuevaListaProductos]);
    setInputSumaTotal(inputMonto + inputSumaTotal);
    resetForm();
  };

  const eliminarDeLaLista = (idProducto: String) => {
    setInputListaDeProductos(
      inputListaDeProductos.filter((producto) => {
        setInputSumaTotal(inputSumaTotal - producto.monto);
        return producto.idProducto !== idProducto;
      })
    );
  };

  const updateProduct = (idProducto: string) => {
    const productoAEditar = inputListaDeProductos.find(
      (producto) => producto.idProducto === idProducto
    );
    setInputTipoDeProducto(productoAEditar?.tipoDeProducto!);
    setInputSaborProducto(productoAEditar?.saborProducto!);
    setInputCodigoProducto(productoAEditar?.idProducto!);
    setInputCantidad(productoAEditar?.cantidad!);
    setInputPrecioProducto(productoAEditar?.precioProducto!);
    setInputMonto(productoAEditar?.monto!);
    eliminarDeLaLista(idProducto);
  };

  const resetForm = () => {
    setInputCodigoProducto("");
    setInputTipoDeProducto("");
    setInputSaborProducto("");
    setInputCantidad(0);
    setInputPrecioProducto(0);
    setInputMonto(0);
  };

  const actualizarPuntosClienteFrecuente = () => {
    if (inputUsarPuntos === "Si") {
      clientesFrecuentes
        .filter((cf) => cf.correoElectronico === inputCorreoClienteFrecuente)
        .map((ccff) => {
          const actualizadoClienteFrecuente: ClienteFrecuente = {
            ...clientesFrecuentes,
            _id: ccff._id,
            nombre: ccff.nombre,
            fechaDeNacimiento: ccff.fechaDeNacimiento,
            correoElectronico: ccff.correoElectronico,
            puntosDeCompra: ccff.puntosDeCompra - inputPuntosClienteFrecuente,
            sucursalOFranquicia: ccff.sucursalOFranquicia,
            nombreSucursalOFranquicia: ccff.sucursalOFranquicia,
          };

          actualizarClienteFrecuente(actualizadoClienteFrecuente, false);
        });
    } else {
      clientesFrecuentes
        .filter((cf) => cf.correoElectronico === inputCorreoClienteFrecuente)
        .map((ccff) => {
          const actualizadoClienteFrecuente: ClienteFrecuente = {
            ...clientesFrecuentes,
            _id: ccff._id,
            nombre: ccff.nombre,
            fechaDeNacimiento: ccff.fechaDeNacimiento,
            correoElectronico: ccff.correoElectronico,
            puntosDeCompra: ccff.puntosDeCompra + 2.5,
            sucursalOFranquicia: ccff.sucursalOFranquicia,
            nombreSucursalOFranquicia: ccff.sucursalOFranquicia,
          };

          actualizarClienteFrecuente(actualizadoClienteFrecuente, false);
        });
    }
  };

  const onSave = () => {
    if (
      inputFecha.length === 0 &&
      inputNombreVendedor!.length === 0 &&
      inputLugarDeLaVenta!.length === 0 &&
      inputNombreSucursalOFranquicia!.length === 0 &&
      inputSumaTotal === 0 &&
      inputListaDeProductos.length === 0 &&
      inputCorreoClienteFrecuente.length === 0 &&
      inputPuntosClienteFrecuente === 0
    )
      return;

    const [, mes, anio] = dividirFecha(hoy.toLocaleDateString());

    const datosSucursal: VentasSucursalIndividual = {
      nombreSucursal: inputNombreSucursalOFranquicia!,
      ventasSucursal: inputSumaTotal,
    };

    agregarNuevoReporteDeGanancia(
      mes,
      anio,
      datosSucursal!,
      inputSumaTotal,
      0,
      0
    );

    agregarNuevoReporteVentasIndividual(
      inputFecha,
      inputNombreVendedor!,
      inputLugarDeLaVenta!,
      inputNombreSucursalOFranquicia!,
      inputSumaTotal,
      inputListaDeProductos,
      inputCorreoClienteFrecuente,
      inputPuntosClienteFrecuente,
      true
    );

    actualizarPuntosClienteFrecuente();

    generateTicket(
      inputListaDeProductos,
      inputListaDeProductos.length,
      inputSumaTotal
    );

    router.push(
      "/gerencia-de-ventas/reporteDeVentasIndividual/VerReporteDeVentasIndividual"
    );

    setTouched(false);
    setInputCodigoProducto("");
    setInputFecha("");
    setInputNombreVendedor("");
    setInputLugarDeLaVenta("");
    setInputTipoDeProducto("");
    setInputSaborProducto("");
    setInputCantidad(0);
    setInputPrecioProducto(0);
    setInputMonto(0);
    setInputSumaTotal(0);
    setInputCorreoClienteFrecuente("");
    setInputPuntosClienteFrecuente(0);
  };

  return (
    <SidebarLayoutGerenciaVentas>
      <form>
        <div className="shadow sm:rounded-md sm:overflow-hidden">
          <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Reporte Ventas Individual
              </h3>
              <p className="mt-1 text-sm text-gray-500">¡Hola!</p>
            </div>
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtFecha"
                  className="block text-sm font-medium text-gray-700"
                >
                  Fecha
                </label>
                <input
                  type="text"
                  name="TxtFecha"
                  id="TxtFecha"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  value={inputFecha}
                  onBlur={() => setTouched(true)}
                  readOnly
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtNombreDelVendedor"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nombre del vendedor
                </label>
                <input
                  type="text"
                  name="TxtNombreDelVendedor"
                  id="TxtNombreDelVendedor"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  value={inputNombreVendedor || ""}
                  onChange={onTextFieldChangedNombreVendedor}
                  onBlur={() => setTouched(true)}
                  readOnly
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtEspecificacionDeLugarDeVenta"
                  className="block text-sm font-medium text-gray-700"
                >
                  Especificación de lugar de venta
                </label>

                <select
                  id="TxtEspecificacionDeLugarDeVenta"
                  name="TxtEspecificacionDeLugarDeVenta"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm rounded-md"
                  onChange={onTextFieldChangedLugarDeLaVenta}
                  onBlur={() => setTouched(true)}
                >
                  {user?.role.includes("admin") ? (
                    <>
                      <option hidden>Selecciona un lugar de venta...</option>
                      {validSalesPlace.map((salesPlace) => (
                        <option key={salesPlace}>{salesPlace}</option>
                      ))}
                    </>
                  ) : (
                    <>
                      <option>{inputLugarDeLaVenta}</option>
                    </>
                  )}
                </select>
              </div>

              {inputLugarDeLaVenta === "Sucursal" ||
              inputLugarDeLaVenta === "Franquicia" ? (
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="CmbFranquicia"
                    className="block text-sm font-medium text-gray-700"
                  >
                    {inputLugarDeLaVenta === "Sucursal"
                      ? "Sucursal"
                      : inputLugarDeLaVenta === "Franquicia"
                      ? "Franquicia"
                      : "Primero seleccione si es franquicia, sucursal o evento"}
                  </label>
                  <select
                    id="CmbFranquicia"
                    name="CmbFranquicia"
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm rounded-md"
                    defaultValue="Selecciona un producto..."
                    onChange={onTextFieldChangedNombreSucursalOFranquicia}
                    onBlur={() => setTouched(true)}
                  >
                    {user?.role.includes("admin") ? (
                      <>
                        <option hidden>
                          Seleccione la{" "}
                          {inputLugarDeLaVenta === "Sucursal"
                            ? "Sucursal"
                            : inputLugarDeLaVenta === "Franquicia"
                            ? "Franquicia"
                            : inputLugarDeLaVenta === "Evento"
                            ? ""
                            : "Primero seleccione si es franquicia, sucursal o evento"}
                          ...
                        </option>
                        {sucursalesYFranquiciasMemo
                          .filter(
                            (sucursalesYFranquicias) =>
                              sucursalesYFranquicias.sucursalOFranquicia ===
                              inputLugarDeLaVenta
                          )
                          .map((sucursalesYFranquicias) => (
                            <option
                              key={
                                sucursalesYFranquicias.nombreSucursalOFranquicia
                              }
                            >
                              {sucursalesYFranquicias.nombreSucursalOFranquicia}
                            </option>
                          ))}
                      </>
                    ) : (
                      <>
                        <option>{inputNombreSucursalOFranquicia}</option>
                      </>
                    )}
                  </select>
                </div>
              ) : inputLugarDeLaVenta === "Evento" ? (
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="TxtLugarDelEvento"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Lugar del evento
                  </label>
                  <input
                    type="text"
                    name="TxtLugarDelEvento"
                    id="TxtLugarDelEvento"
                    autoComplete="off"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                    onChange={onTextFieldChangedNombreSucursalOFranquicia}
                    onBlur={() => setTouched(true)}
                  />
                </div>
              ) : (
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="TxtPrimeroSeleccioneSiEsFranquiciaSucursalOEvento"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Primero seleccione si es franquicia, sucursal o evento
                  </label>
                  <input
                    type="text"
                    name="TxtPrimeroSeleccioneSiEsFranquiciaSucursalOEvento"
                    id="TxtPrimeroSeleccioneSiEsFranquiciaSucursalOEvento"
                    autoComplete="off"
                    defaultValue={
                      "Primero seleccione si es franquicia, sucursal o evento"
                    }
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                    onChange={onTextFieldChangedNombreSucursalOFranquicia}
                    onBlur={() => setTouched(true)}
                    readOnly
                  />
                </div>
              )}

              <div className={"col-span-6 sm:col-span-3"}>
                <label
                  htmlFor="CmbPromocion"
                  className="block text-sm font-medium text-gray-700"
                >
                  Promoción
                </label>
                <select
                  id="CmbPromocion"
                  name="CmbPromocion"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm rounded-md"
                  value={inputPromocion || ""}
                  onChange={onTextFieldChangedPromocion}
                  onBlur={() => setTouched(true)}
                >
                  <option>No</option>
                  <option>Compra 6 pastes y llevate 1</option>
                  <option>Compra 10 pastes y llevate 2</option>
                  <option>Paste gratis</option>
                </select>
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
                  <option hidden>Selecciona un producto...</option>
                  {validProductType.map((productType) => (
                    <option key={productType}>{productType}</option>
                  ))}
                </select>
              </div>

              <div className={"col-span-6 sm:col-span-3"}>
                <label
                  htmlFor="CmbProducto"
                  className="block text-sm font-medium text-gray-700"
                >
                  Producto
                </label>
                <select
                  id="CmbProducto"
                  name="CmbProducto"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm rounded-md"
                  value={inputSaborProducto || ""}
                  onChange={onTextFieldChangedSaborProducto}
                  onBlur={() => setTouched(true)}
                >
                  <option hidden>Selecciona un producto...</option>
                  {validMenuProducts
                    .filter(
                      (menuProducts) =>
                        menuProducts.tipoDeProducto === inputTipoDeProducto
                    )
                    .map((menuProducts) => (
                      <option key={menuProducts.saborDelPaste}>
                        {menuProducts.saborDelPaste}
                      </option>
                    ))}
                </select>
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
                  htmlFor="TxtCantidadDeProducto"
                  className="block text-sm font-medium text-gray-700"
                >
                  Cantidad de producto
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    min={1}
                    name="TxtCantidadDeProducto"
                    id="TxtCantidadDeProducto"
                    autoComplete="off"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                    value={inputCantidad || ""}
                    onChange={onTextFieldChangedCantidad}
                    onBlur={() => setTouched(true)}
                  />

                  <button
                    type="button"
                    className="bg-primary-blue border border-transparent rounded-md shadow-sm py-2 px-10 inline-flex justify-center text-sm font-medium text-white hover:bg-primary-yellow hover:text-primary-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-yellow"
                    onClick={addProductQuantity}
                  >
                    <PlusIcon className="h-6 w-6" aria-hidden="true" />
                  </button>

                  <button
                    type="button"
                    className="bg-primary-blue border border-transparent rounded-md shadow-sm py-2 px-10 inline-flex justify-center text-sm font-medium text-white hover:bg-primary-yellow hover:text-primary-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-yellow"
                    onClick={removeProductQuantity}
                  >
                    <MinusIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtPrecioPorProductoIndividual"
                  className="block text-sm font-medium text-gray-700"
                >
                  Precio por producto individual
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="text"
                    name="TxtPrecioPorProductoIndividual"
                    id="TxtPrecioPorProductoIndividual"
                    className="focus:ring-primary-yellow focus:border-primary-yellow block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                    placeholder="0"
                    aria-describedby="price-currency"
                    value={inputPrecioProducto || 0}
                    onChange={onTextFieldChangedPrecioProducto}
                    onBlur={() => setTouched(true)}
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
                  htmlFor="TxtMonto"
                  className="block text-sm font-medium text-gray-700"
                >
                  Monto
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="text"
                    name="TxtMonto"
                    id="TxtMonto"
                    className="focus:ring-primary-yellow focus:border-primary-yellow block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                    placeholder="0"
                    aria-describedby="price-currency"
                    value={inputMonto || 0}
                    onChange={onTextFieldChangedMonto}
                    onBlur={() => setTouched(true)}
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
                  htmlFor="TxtSumaTotalDeProductos"
                  className="block text-sm font-medium text-gray-700"
                >
                  Suma total de productos
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="text"
                    name="TxtSumaTotalDeProductos"
                    id="TxtSumaTotalDeProductos"
                    className="focus:ring-primary-yellow focus:border-primary-yellow block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                    placeholder="0"
                    aria-describedby="price-currency"
                    value={inputSumaTotal || 0}
                    onChange={onTextFieldChangedSumaTotal}
                    onBlur={() => setTouched(true)}
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
                <div className="flex items-center">
                  <label
                    htmlFor="TxtCorreoElectronicoClienteFrecuente"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Correo electrónico
                  </label>
                  <div className="text-xs text-gray-500">
                    &nbsp;&#40;Opcional&#41;
                  </div>
                </div>
                <input
                  type="text"
                  name="TxtCorreoElectronicoClienteFrecuente"
                  id="TxtCorreoElectronicoClienteFrecuente"
                  list="correosElectronicos_ClientesFrecuentes"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  onChange={onTextFieldChangedCorreoClienteFrecuente}
                  onBlur={() => setTouched(true)}
                />
                <datalist id="correosElectronicos_ClientesFrecuentes">
                  {clientesFrecuentesMemo.map((clienteFrecuente) => (
                    <option
                      key={clienteFrecuente._id}
                      value={clienteFrecuente.correoElectronico}
                    >
                      {clienteFrecuente.puntosDeCompra}{" "}
                      {clienteFrecuente.puntosDeCompra === 1
                        ? "punto"
                        : "puntos"}
                    </option>
                  ))}
                </datalist>
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label className="text-base font-medium text-gray-900">
                  ¿Quieres usar tus puntos?
                </label>
                <p className="text-sm leading-5 text-gray-500">
                  Recuerda preguntarle al cliente si quiere usar sus puntos
                </p>
                <fieldset className="mt-4">
                  <legend className="sr-only">
                    Usar puntos de cliente frecuente
                  </legend>
                  <div className="space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-10">
                    {useClientPoints.map((useClientPoint) => (
                      <div
                        key={useClientPoint.id}
                        className="flex items-center"
                      >
                        <input
                          id={useClientPoint.id}
                          name="notification-method"
                          type="radio"
                          defaultChecked={useClientPoint.id === "no"}
                          onChange={onTextFieldChangedUsarPuntos}
                          value={useClientPoint.title}
                          className="h-4 w-4 border-gray-300 text-primary-yellow focus:ring-primary-yellow"
                        />
                        <label
                          htmlFor={useClientPoint.id}
                          className="ml-3 block text-sm font-medium text-gray-700"
                        >
                          {useClientPoint.title}
                        </label>
                      </div>
                    ))}
                  </div>
                </fieldset>
              </div>

              <div className="col-span-6 sm:col-span-3">
                <h3 className="text-base leading-6 font-medium text-gray-900">
                  Puntos del cliente
                </h3>
                <div className="flex items-center">
                  <label
                    htmlFor="TxtPuntosDeCompraActualesClienteFrecuente"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Puntos de compra actuales
                  </label>
                  <div className="text-xs text-gray-500">
                    &nbsp;&#40;Opcional&#41;
                  </div>
                </div>

                <select
                  id="TxtPuntosDeCompraActualesClienteFrecuente"
                  name="TxtPuntosDeCompraActualesClienteFrecuente"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm rounded-md"
                  onChange={onTextFieldChangedPuntosClienteFrecuente}
                  onBlur={() => setTouched(true)}
                  disabled={
                    inputUsarPuntos === "Si" &&
                    inputCorreoClienteFrecuente !== ""
                      ? false
                      : true
                  }
                >
                  <option hidden>Selecciona los puntos...</option>
                  {clientesFrecuentesMemo
                    .filter(
                      (clientesFrecuentes) =>
                        clientesFrecuentes.correoElectronico ===
                        inputCorreoClienteFrecuente
                    )
                    .map((clientesFrecuentes) => (
                      <option key={clientesFrecuentes.correoElectronico}>
                        {clientesFrecuentes.puntosDeCompra}
                      </option>
                    ))}
                </select>
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
                  Reporte de ventas individual
                </h1>
                <p className="mt-2 text-sm text-gray-700">
                  Aquí podras ver los productos que vayas agregando a tu reporte
                  de venta individual.
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
                            ID
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
                            Cantidad de producto
                          </th>

                          <th
                            scope="col"
                            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                          >
                            Precio por producto individual
                          </th>

                          <th
                            scope="col"
                            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                          >
                            Monto
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
                          key={listadoProductos.saborProducto}
                          className="divide-y divide-gray-200 bg-white"
                        >
                          <tr className="cursor-pointer hover:bg-yellow-100">
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              <div className="font-medium text-gray-900">
                                {listadoProductos.idProducto || ""}
                              </div>
                            </td>

                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              <div className="font-medium text-gray-900">
                                {listadoProductos.tipoDeProducto || ""}
                              </div>
                            </td>

                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              <div className="font-medium text-gray-900">
                                {listadoProductos.saborProducto || ""}
                              </div>
                            </td>

                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              <div className="font-medium text-gray-900">
                                {listadoProductos.cantidad || ""}
                              </div>
                            </td>

                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              <div className="font-medium text-gray-900">
                                $ {listadoProductos.precioProducto || ""}
                              </div>
                            </td>

                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              <div className="font-medium text-gray-900">
                                $ {listadoProductos.monto || ""}
                              </div>
                            </td>

                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              <button
                                type="button"
                                className="bg-primary-yellow border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-primary-blue hover:text-primary-yellow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-yellow"
                                onClick={() =>
                                  updateProduct(listadoProductos.idProducto)
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
                                  eliminarDeLaLista(listadoProductos.idProducto)
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

          <div className="mt-5 px-4 py-3 bg-gray-50 text-right sm:px-6">
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
};

export default AgregarReporteDeVentasIndividual;

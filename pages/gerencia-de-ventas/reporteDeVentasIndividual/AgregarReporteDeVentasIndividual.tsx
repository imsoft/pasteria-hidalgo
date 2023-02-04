import { ChangeEvent, useState, useEffect, useContext, useMemo } from "react";

import { SidebarLayoutGerenciaVentas } from "../../../components/layouts/gerencia-de-ventas/SidebarLayoutGerenciaVentas";

import {
  ListadoDeProductos,
  LugarDeVenta,
  Paste,
  TipoDeProducto,
} from "../../../interfaces";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { ReportesVentasIndividualContext } from "../../../context/gerencia-de-ventas/reporteVentasIndividual/ReportesVentasIndividualContext";
import { ClientesFrecuentesContext } from "../../../context/gerencia-de-ventas/clienteFrecuente/ClientesFrecuentesContext";
import { useRouter } from "next/router";

const validSalesPlace: LugarDeVenta[] = ["Evento", "Franquicia", "Sucursal"];

const validProductType: TipoDeProducto[] = [
  "Paste Dulce",
  "Paste Salado",
  "Otros",
];

const tiempoTranscurrido = Date.now();
const hoy = new Date(tiempoTranscurrido);

const useClientPoints = [
  { id: "si", title: "Si" },
  { id: "no", title: "No" },
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

const AgregarReporteDeVentasIndividual = () => {
  const router = useRouter();
  const { agregarNuevoReporteVentasIndividual } = useContext(
    ReportesVentasIndividualContext
  );

  const { clientesFrecuentes } = useContext(ClientesFrecuentesContext);
  const clientesFrecuentesMemo = useMemo(
    () => clientesFrecuentes,
    [clientesFrecuentes]
  );

  const [inputCodigoProducto, setInputCodigoProducto] = useState("");
  const [inputFecha, setInputFecha] = useState(hoy.toLocaleDateString());
  const [inputNombreVendedor, setInputNombreVendedor] = useState("");
  const [inputLugarDeLaVenta, setInputLugarDeLaVenta] = useState("");
  const [inputNombreLugarDeLaVenta, setInputNombreLugarDeLaVenta] =
    useState("");
  const [inputTipoDeProducto, setInputTipoDeProducto] = useState("");
  const [inputSaborProducto, setInputSaborProducto] = useState("");
  const [inputCantidad, setInputCantidad] = useState(0);
  const [inputPrecioProducto, setInputPrecioProducto] = useState(0);
  const [inputMonto, setInputMonto] = useState(0);
  const [inputSumaTotal, setInputSumaTotal] = useState(0);
  const [inputCorreoClienteFrecuente, setInputCorreoClienteFrecuente] =
    useState("");
  const [inputPuntosClienteFrecuente, setInputPuntosClienteFrecuente] =
    useState(0);

  const [inputListaDeProductos, setInputListaDeProductos] = useState<
    ListadoDeProductos[]
  >([]);

  const [inputUsarPuntos, setInputUsarPuntos] = useState("");

  const [touched, setTouched] = useState(false);

  const MySwal = withReactContent(Swal);

  const onTextFieldChangedNombreVendedor = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputNombreVendedor(event.target.value);
  };

  const onTextFieldChangedLugarDeLaVenta = (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    setInputLugarDeLaVenta(event.target.value as LugarDeVenta);
  };

  const onTextFieldChangedNombreLugarDeLaVenta = (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    setInputNombreLugarDeLaVenta(event.target.value);
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

  const lookUpProductPrice = () => {
    const result = validCakeFlavors.find(
      (cakeFlavors) => cakeFlavors.saborDelPaste === inputSaborProducto
    );
    setInputPrecioProducto(result?.precio!);
  };

  const lookUpProductId = () => {
    const result = validCakeFlavors.find(
      (cakeFlavors) => cakeFlavors.saborDelPaste === inputSaborProducto
    );
    setInputCodigoProducto(result?._id!);
  };

  const calculateAmount = () => {
    setInputMonto(inputPrecioProducto * inputCantidad);
  };

  const usoDePuntosClienteFrecuente = () => {
    setInputSumaTotal(inputSumaTotal - inputPuntosClienteFrecuente);
  };

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

  const onSave = () => {
    if (
      inputFecha.length === 0 &&
      inputNombreVendedor.length === 0 &&
      inputLugarDeLaVenta.length === 0 &&
      inputNombreLugarDeLaVenta.length === 0 &&
      inputSumaTotal === 0 &&
      inputListaDeProductos.length === 0 &&
      inputCorreoClienteFrecuente.length === 0 &&
      inputPuntosClienteFrecuente === 0
    )
      return;

    agregarNuevoReporteVentasIndividual(
      inputFecha,
      inputNombreVendedor,
      inputLugarDeLaVenta,
      inputNombreLugarDeLaVenta,
      inputSumaTotal,
      inputListaDeProductos,
      inputCorreoClienteFrecuente,
      inputPuntosClienteFrecuente,
      true
    );

    MySwal.fire({
      position: "top-end",
      icon: "success",
      title: "Candidato Agregado",
      showConfirmButton: false,
      timer: 5000,
    });

    router.push(
      "/gerencia-de-ventas/reporteDeVentasIndividual/VerReporteDeVentasIndividual"
    );

    setTouched(false);
    setInputCodigoProducto("");
    setInputFecha("");
    setInputNombreVendedor("");
    setInputLugarDeLaVenta("");
    setInputNombreLugarDeLaVenta("");
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
                  htmlFor="TxtDescripcionProducto"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nombre del vendedor
                </label>
                <input
                  type="text"
                  name="TxtDescripcionProducto"
                  id="TxtDescripcionProducto"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  onChange={onTextFieldChangedNombreVendedor}
                  onBlur={() => setTouched(true)}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtProductos"
                  className="block text-sm font-medium text-gray-700"
                >
                  Especificación de lugar de venta
                </label>
                <select
                  id="TxtProductos"
                  name="TxtProductos"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm rounded-md"
                  value={inputLugarDeLaVenta || ""}
                  onChange={onTextFieldChangedLugarDeLaVenta}
                  onBlur={() => setTouched(true)}
                >
                  <option hidden>Selecciona un lugar de venta...</option>
                  {validSalesPlace.map((salesPlace) => (
                    <option key={salesPlace}>{salesPlace}</option>
                  ))}
                </select>
              </div>

              <div
                className={` ${
                  inputLugarDeLaVenta === "Franquicia" || "hidden"
                } col-span-6 sm:col-span-3`}
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
                  onChange={onTextFieldChangedNombreLugarDeLaVenta}
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
                  inputLugarDeLaVenta === "Sucursal" || "hidden"
                } col-span-6 sm:col-span-3`}
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
                  onChange={onTextFieldChangedNombreLugarDeLaVenta}
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
                  htmlFor="TxtPrecioCompra"
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
                    name="price"
                    id="price"
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
                  htmlFor="TxtPrecioCompra"
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
                    name="price"
                    id="price"
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

              <div className="col-span-6 sm:col-span-6">
                <label className="text-base font-medium text-gray-900">
                  ¿Quieres usar tus puntos?
                </label>
                <p className="text-sm leading-5 text-gray-500">
                  Recuera preguntarle al cliente si quiere usar sus puntos
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

              <div
                className={` ${
                  inputUsarPuntos === "Si" || "hidden"
                } col-span-6 sm:col-span-6`}
              >
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Clientes frecuentes
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Recuerda preguntar si ya esta registrado con nosotros.
                    </p>
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
                          {clienteFrecuente.nombre}
                        </option>
                      ))}
                    </datalist>
                  </div>

                  <div className="col-span-6 sm:col-span-3">
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
              type="submit"
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

import { ChangeEvent, useContext, useState } from "react";

import { ReportesDeSalidaContext } from "../../../context/gerencia-operativa/reporteDeSalida/ReportesDeSalidaContext";

import { SidebarLayoutGerenciaOperativa } from "../../../components/layouts/gerencia-operativa/SidebarLayoutGerenciaOperativa";

import { ListadoDeProductos, Paste, TipoDeProducto, Unidades } from "../../../interfaces";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useRouter } from "next/router";

const validUnits: Unidades[] = ["Gramos", "Kilogramos", "Mililitros", "Litros"];

const validProductType: TipoDeProducto[] = [
  "Paste Dulce",
  "Paste Salado",
  "Otros",
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

  const [inputFecha, setInputFecha] = useState("");
  const [inputProductoExtra, setInputProductoExtra] = useState("");
  const [inputCodigoDeProductoExtra, setInputCodigoDeProductoExtra] =
    useState("");
  const [inputCantidadDeProductoExtra, setInputCantidadDeProductoExtra] =
    useState("");
  const [inputUnidadesDeProductoExtra, setInputUnidadesDeProductoExtra] =
    useState("");
    const [inputCodigoProducto, setInputCodigoProducto] = useState("");
    const [inputListaDeProductos, setInputListaDeProductos] = useState<
    ListadoDeProductos[]
  >([]);
  const [inputTipoDeProducto, setInputTipoDeProducto] = useState("");
  const [inputSaborProducto, setInputSaborProducto] = useState("");
  const [inputCantidad, setInputCantidad] = useState(0);
  const [inputPrecioProducto, setInputPrecioProducto] = useState(0);
  const [inputSucursalAEnviar, setInputSucursalAEnviar] = useState("");
  const [inputDatosDeRepartidor, setInputDatosDeRepartidor] = useState("");
  const [inputDatosDeLaRuta, setInputDatosDeLaRuta] = useState("");
  const [inputKilometrajeDeEntrada, setInputKilometrajeDeEntrada] =
    useState("");
  const [inputKilometrajeDeSalida, setInputKilometrajeDeSalida] = useState("");

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

  const onSave = () => {
    if (
      inputFecha.length === 0 &&
      inputProductoExtra.length === 0 &&
      inputCodigoDeProductoExtra.length === 0 &&
      inputCantidadDeProductoExtra.length === 0 &&
      inputUnidadesDeProductoExtra.length === 0 &&
      inputListaDeProductos.length === 0 &&
      inputSucursalAEnviar.length === 0 &&
      inputDatosDeRepartidor.length === 0 &&
      inputDatosDeLaRuta.length === 0 &&
      inputKilometrajeDeEntrada.length === 0 &&
      inputKilometrajeDeSalida.length === 0
    )
      return;

    agregarNuevoReporteDeSalida(
      inputFecha,
      inputProductoExtra,
      inputCodigoDeProductoExtra,
      inputCantidadDeProductoExtra,
      inputUnidadesDeProductoExtra,
      inputListaDeProductos,
      inputSucursalAEnviar,
      inputDatosDeRepartidor,
      inputDatosDeLaRuta,
      inputKilometrajeDeEntrada,
      inputKilometrajeDeSalida,
      true
    );

    MySwal.fire({
      position: "top-end",
      icon: "success",
      title: "Reporte de salida Agregado",
      showConfirmButton: false,
      timer: 5000,
    });

    router.push("/gerencia-operativa/reporteDeSalida/VerReportesDeSalida");

    setTouched(false);
    setInputFecha("");
    setInputProductoExtra("");
    setInputCodigoDeProductoExtra("");
    setInputCantidadDeProductoExtra("");
    setInputUnidadesDeProductoExtra("");

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

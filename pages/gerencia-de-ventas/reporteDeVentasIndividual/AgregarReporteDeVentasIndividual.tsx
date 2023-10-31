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
import {
  ExclamationCircleIcon,
  MinusIcon,
  PlusIcon,
} from "@heroicons/react/outline";
import { AuthContext } from "../../../context/auth";
import Swal from "sweetalert2";

const validSalesPlace: LugarDeVenta[] = ["Evento", "Franquicia", "Sucursal"];
const paymentMethods: string[] = ["Efectivo", "Tarjeta bancaria"];

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
  const [inputCantidad, setInputCantidad] = useState(1);
  const [inputPrecioProducto, setInputPrecioProducto] = useState(0);
  const [inputMonto, setInputMonto] = useState(0);
  let [inputSumaTotal, setInputSumaTotal] = useState(0);
  let [inputPromocionTotal, setInputPromocionTotal] = useState(0);
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
  const [inputPromocion, setInputPromocion] = useState("");
  const [inputMetodoDePago, setInputMetodoDePago] = useState("");
  const [cantidadDePastes, setCantidadDePastes] = useState(0);

  const [errorPromocion, setErrorPromocion] = useState("");
  const [errorTipoDeProducto, setErrorTipoDeProducto] = useState("");
  const [errorSaborProducto, setErrorSaborProducto] = useState("");
  const [errorMetodoDePago, setErrorMetodoDePago] = useState("");
  const [errorLugarDeVenta, setErrorLugarDeVenta] = useState("");
  const [errorNombreSucursalOFranquicia, setErrorNombreSucursalOFranquicia] =
    useState("");

  const onTextFieldChangedLugarDeLaVenta = (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    setInputLugarDeLaVenta(event.target.value);
    setErrorLugarDeVenta("");
  };

  const onTextFieldChangedNombreSucursalOFranquicia = (
    event: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>
  ) => {
    setInputNombreSucursalOFranquicia(event.target.value);
    setErrorNombreSucursalOFranquicia("");
  };

  const onTextFieldChangedTipoDeProducto = (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    setInputTipoDeProducto(event.target.value as TipoDeProducto);
    setErrorTipoDeProducto("");
  };

  const onTextFieldChangedSaborProducto = (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    setInputSaborProducto(event.target.value);
    setErrorSaborProducto("");
  };

  const onTextFieldChangedCantidad = (event: ChangeEvent<HTMLInputElement>) => {
    setInputCantidad(parseInt(event.target.value));
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
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    setInputUsarPuntos(event.target.value);
  };

  const onTextFieldChangedPromocion = (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    setInputPromocion(event.target.value);
    setErrorPromocion("");
  };

  const onTextFieldChangedMetodoDePago = (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    setInputMetodoDePago(event.target.value);
    setErrorMetodoDePago("");
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
    setInputCantidad(1);
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
    setInputSumaTotal(inputSumaTotal - inputPromocionTotal);
  }, [inputPromocion, inputPromocionTotal]);

  useEffect(() => {
    switch (inputPromocion) {
      case "No":
        setInputPromocionTotal(inputSumaTotal);
        setInputPromocionTotal(0);
        break;
      case "Compra 6 pastes y llevate 1":
        if (cantidadDePastes === 7) {
          setInputPromocionTotal(inputSumaTotal);
          setInputPromocionTotal(30);
        } else {
          setInputPromocionTotal(inputSumaTotal);
          setInputPromocionTotal(0);
          setInputPromocion("No");
          Swal.fire({
            position: "top-end",
            icon: "warning",
            title: "No se puede usar esta promoción",
            showConfirmButton: false,
            timer: 1000,
          });
        }
        break;
      case "Compra 10 pastes y llevate 2":
        if (cantidadDePastes === 12) {
          setInputPromocionTotal(inputSumaTotal);
          setInputPromocionTotal(60);
        } else {
          setInputPromocionTotal(inputSumaTotal);
          setInputPromocionTotal(0);
          setInputPromocion("No");
          Swal.fire({
            position: "top-end",
            icon: "warning",
            title: "No se puede usar esta promoción",
            showConfirmButton: false,
            timer: 1000,
          });
        }
        break;
      case "Paste gratis":
        if (cantidadDePastes >= 1) {
          setInputPromocionTotal(inputSumaTotal);
          setInputPromocionTotal(30);
        } else {
          setInputPromocionTotal(inputSumaTotal);
          setInputPromocionTotal(0);
          setInputPromocion("No");
          Swal.fire({
            position: "top-end",
            icon: "warning",
            title: "No se puede usar esta promoción",
            showConfirmButton: false,
            timer: 1000,
          });
        }
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
    if (inputTipoDeProducto === "") {
      setErrorTipoDeProducto("El campo de tipo de producto en necesario.");
    } else if (inputSaborProducto === "") {
      setErrorSaborProducto("El campo de sabor del producto en necesario.");
    } else {
      setErrorPromocion("");
      setErrorTipoDeProducto("");
      setErrorSaborProducto("");

      // Verificar si el producto ya existe en la lista
      const productoExistente = inputListaDeProductos.find(
        (producto) => producto.idProducto === inputCodigoProducto
      );

      if (productoExistente) {
        // El producto ya existe, actualiza la cantidad
        const nuevaCantidad = productoExistente.cantidad + inputCantidad;
        const nuevaMonto = productoExistente.precioProducto * nuevaCantidad;

        const listaActualizada = inputListaDeProductos.map((producto) =>
          producto.idProducto === inputCodigoProducto
            ? { ...producto, cantidad: nuevaCantidad, monto: nuevaMonto }
            : producto
        );

        setInputListaDeProductos(listaActualizada);
        setCantidadDePastes(inputCantidad + cantidadDePastes);
        setInputSumaTotal(inputMonto + inputSumaTotal);
        resetForm();
      } else {
        const nuevaListaProductos = {
          idProducto: inputCodigoProducto,
          tipoDeProducto: inputTipoDeProducto as TipoDeProducto,
          saborProducto: inputSaborProducto,
          cantidad: inputCantidad,
          precioProducto: inputPrecioProducto,
          monto: inputMonto,
        };

        setInputListaDeProductos([
          ...inputListaDeProductos,
          nuevaListaProductos,
        ]);
        setInputSumaTotal(inputMonto + inputSumaTotal);

        if (
          nuevaListaProductos.tipoDeProducto === "Paste Dulce" ||
          nuevaListaProductos.tipoDeProducto === "Paste Salado" ||
          nuevaListaProductos.tipoDeProducto === "Paste Empleado Dulce" ||
          nuevaListaProductos.tipoDeProducto === "Paste Empleado Salado" ||
          nuevaListaProductos.tipoDeProducto === "Paste Mini Dulce" ||
          nuevaListaProductos.tipoDeProducto === "Paste Mini Salado"
        ) {
          setCantidadDePastes(nuevaListaProductos.cantidad + cantidadDePastes);
        }

        resetForm();
      }
    }
  };

  // const eliminarDeLaLista = (idProducto: String) => {
  //   setInputListaDeProductos(
  //     inputListaDeProductos.filter((producto) => {
  //       setInputSumaTotal(inputSumaTotal - producto.monto);
  //       return producto.idProducto !== idProducto;
  //     })
  //   );

  //   const productoAEliminar = inputListaDeProductos.find(
  //     (producto) => producto.idProducto === idProducto
  //   );

  //     if (inputPromocion === "Compra 6 pastes y llevate 1") {
  //       setInputSumaTotal(inputSumaTotal - productoAEliminar!.monto + 30);
  //     } else if (inputPromocion === "Compra 10 pastes y llevate 2") {
  //       setInputSumaTotal(inputSumaTotal - productoAEliminar!.monto + 60);
  //     } else if (inputPromocion === "Paste gratis") {
  //       setInputSumaTotal(inputSumaTotal - productoAEliminar!.monto + 30);
  //     } else {
  //       return;
  //     }

  //     setCantidadDePastes(cantidadDePastes - productoAEliminar!.cantidad);

  //   setInputPromocionTotal(inputSumaTotal);
  //   setInputPromocionTotal(0);
  //   setInputPromocion("No");
  // };

  const eliminarDeLaLista = (idProducto: string) => {
    const productoAEliminar = inputListaDeProductos.find(
      (producto) => producto.idProducto === idProducto
    );

    if (productoAEliminar) {
      // Actualiza la cantidad de pastes
      setCantidadDePastes(cantidadDePastes - productoAEliminar.cantidad);

      // Actualiza el precio total
      let nuevoSumaTotal = inputSumaTotal - productoAEliminar.monto;

      // Aplica las promociones si es necesario
      if (inputPromocion === "Compra 6 pastes y llevate 1") {
        nuevoSumaTotal += 30;
      } else if (inputPromocion === "Compra 10 pastes y llevate 2") {
        nuevoSumaTotal += 60;
      } else if (inputPromocion === "Paste gratis") {
        nuevoSumaTotal += 30;
      }

      setInputSumaTotal(nuevoSumaTotal);
    }

    // Elimina el producto de la lista
    setInputListaDeProductos(
      inputListaDeProductos.filter(
        (producto) => producto.idProducto !== idProducto
      )
    );

    setInputPromocionTotal(0); // ¿Por qué se actualiza a 0 inmediatamente?
    setInputPromocion("No");
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
    if (inputListaDeProductos.length === 0) {
      Swal.fire({
        position: "top-end",
        icon: "warning",
        title: "Lista de productos vacia",
        showConfirmButton: false,
        timer: 1000,
      });
    } else if (inputPromocion === "") {
      setErrorPromocion("El campo de promoción en necesario.");
    } else if (
      inputLugarDeLaVenta === "SucursalYFranquicia" ||
      inputLugarDeLaVenta === ""
    ) {
      setErrorLugarDeVenta("El lugar de la venta en necesario.");
    } else if (
      inputNombreSucursalOFranquicia === "General" ||
      inputNombreSucursalOFranquicia === ""
    ) {
      setErrorNombreSucursalOFranquicia(
        "La especificación del lugar es necesaria."
      );
    } else if (inputMetodoDePago === "") {
      setErrorMetodoDePago("El método de pago en necesario.");
    } else {
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
        inputPromocion,
        inputMetodoDePago,
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

      setInputCodigoProducto("");
      setInputFecha("");
      setInputNombreVendedor("");
      setInputLugarDeLaVenta("");
      setInputTipoDeProducto("");
      setInputSaborProducto("");
      setInputPromocion("");
      setInputMetodoDePago("");
      setInputCantidad(1);
      setInputPrecioProducto(0);
      setInputMonto(0);
      setInputSumaTotal(0);
      setInputCorreoClienteFrecuente("");
      setInputPuntosClienteFrecuente(0);
      setErrorMetodoDePago("");
      setErrorPromocion("");
      setErrorTipoDeProducto("");
      setErrorSaborProducto("");
    }
  };

  return (
    <SidebarLayoutGerenciaVentas>
      <div className="shadow sm:rounded-md sm:overflow-hidden">
        <form>
          <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Reporte Ventas Individual
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Aqui podrás hacer el registro de nuevas ventas
              </p>
            </div>
            <div className="grid grid-cols-8 gap-6">
              <div
                className={`col-span-6 ${
                  user?.role.includes("admin")
                    ? "sm:col-span-3"
                    : "sm:col-span-2"
                }`}
              >
                <span className="block text-sm font-medium text-gray-700">
                  Fecha
                </span>
                <p className="block text-lg font-medium text-gray-700">
                  {inputFecha}
                </p>
              </div>

              <div
                className={`col-span-6 ${
                  user?.role.includes("admin")
                    ? "sm:col-span-3"
                    : "sm:col-span-2"
                }`}
              >
                <span className="block text-sm font-medium text-gray-700">
                  Nombre del vendedor
                </span>
                <p className="block text-lg font-medium text-gray-700">
                  {inputNombreVendedor}
                </p>
              </div>

              <div
                className={`col-span-6 ${
                  user?.role.includes("admin")
                    ? "sm:col-span-3"
                    : "sm:col-span-2"
                }`}
              >
                <label
                  htmlFor="TxtEspecificacionDeLugarDeVenta"
                  className="block text-sm font-medium text-gray-700"
                >
                  Especificación de lugar de venta
                </label>

                {user?.role.includes("admin") ? (
                  <>
                    <div className="relative rounded-md shadow-sm">
                      <select
                        id="TxtEspecificacionDeLugarDeVenta"
                        name="TxtEspecificacionDeLugarDeVenta"
                        className={
                          errorLugarDeVenta
                            ? "mt-1 block w-full pl-3 pr-10 py-2 text-base border-red-300 focus:outline-none focus:ring-red-400 focus:border-red-400 sm:text-sm rounded-md"
                            : "mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm rounded-md"
                        }
                        onChange={onTextFieldChangedLugarDeLaVenta}
                      >
                        {user?.role.includes("admin") ? (
                          <>
                            <option hidden>
                              Selecciona un lugar de venta...
                            </option>
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
                      {errorLugarDeVenta && (
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-9">
                          <ExclamationCircleIcon
                            className="h-5 w-5 text-red-500"
                            aria-hidden="true"
                          />
                        </div>
                      )}
                    </div>
                    {errorLugarDeVenta && (
                      <p
                        className="mt-2 text-sm text-red-600"
                        id="nombreSucursalOFranquicia-error"
                      >
                        {errorLugarDeVenta}
                      </p>
                    )}
                  </>
                ) : (
                  <p className="block text-lg font-medium text-gray-700">
                    {inputLugarDeLaVenta}
                  </p>
                )}
              </div>

              {inputLugarDeLaVenta === "Sucursal" ||
              inputLugarDeLaVenta === "Franquicia" ? (
                <div
                  className={`col-span-6 ${
                    user?.role.includes("admin")
                      ? "sm:col-span-3"
                      : "sm:col-span-2"
                  }`}
                >
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

                  {user?.role.includes("admin") ? (
                    <div className="relative rounded-md shadow-sm">
                      <select
                        id="CmbFranquicia"
                        name="CmbFranquicia"
                        className={
                          errorNombreSucursalOFranquicia
                            ? "mt-1 block w-full pl-3 pr-10 py-2 text-base border-red-300 focus:outline-none focus:ring-red-400 focus:border-red-400 sm:text-sm rounded-md"
                            : "mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm rounded-md"
                        }
                        defaultValue="Selecciona un producto..."
                        onChange={onTextFieldChangedNombreSucursalOFranquicia}
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
                                  {
                                    sucursalesYFranquicias.nombreSucursalOFranquicia
                                  }
                                </option>
                              ))}
                          </>
                        ) : (
                          <>
                            <option>{inputNombreSucursalOFranquicia}</option>
                          </>
                        )}
                        {errorNombreSucursalOFranquicia && (
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-9">
                            <ExclamationCircleIcon
                              className="h-5 w-5 text-red-500"
                              aria-hidden="true"
                            />
                          </div>
                        )}
                      </select>
                      {errorNombreSucursalOFranquicia && (
                        <p
                          className="mt-2 text-sm text-red-600"
                          id="lugarDeVenta-error"
                        >
                          {errorNombreSucursalOFranquicia}
                        </p>
                      )}
                    </div>
                  ) : (
                    <label
                      htmlFor="TxtEspecificacionDeLugarDeVenta"
                      className="block text-lg font-medium text-gray-700"
                    >
                      {inputNombreSucursalOFranquicia}
                    </label>
                  )}
                </div>
              ) : inputLugarDeLaVenta === "Evento" ? (
                <div className="relative rounded-md shadow-sm">
                  <div
                    className={`col-span-6 ${
                      user?.role.includes("admin")
                        ? "sm:col-span-3"
                        : "sm:col-span-2"
                    }`}
                  >
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
                      className={
                        errorNombreSucursalOFranquicia
                          ? "mt-1 block w-full border border-red-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-400 focus:border-red-400 sm:text-sm"
                          : "mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                      }
                      onChange={onTextFieldChangedNombreSucursalOFranquicia}
                    />
                    {errorNombreSucursalOFranquicia && (
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-9">
                        <ExclamationCircleIcon
                          className="h-5 w-5 text-red-500"
                          aria-hidden="true"
                        />
                      </div>
                    )}
                  </div>
                  {errorNombreSucursalOFranquicia && (
                    <p
                      className="mt-2 text-sm text-red-600"
                      id="lugarDeVenta-error"
                    >
                      {errorNombreSucursalOFranquicia}
                    </p>
                  )}
                </div>
              ) : (
                <div
                  className={`col-span-6 ${
                    user?.role.includes("admin")
                      ? "sm:col-span-3"
                      : "sm:col-span-2"
                  }`}
                >
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
                    readOnly
                  />
                </div>
              )}

              <div className="my-3 col-span-6 sm:col-span-8 border-t border-gray-200" />

              <div className="col-span-6 sm:col-span-2">
                <label
                  htmlFor="TxtTipoDeProducto"
                  className="block text-sm font-medium text-gray-700"
                >
                  Tipo de producto
                </label>
                <div className="relative rounded-md shadow-sm">
                  <select
                    id="TxtTipoDeProducto"
                    name="TxtTipoDeProducto"
                    className={
                      errorTipoDeProducto
                        ? "mt-1 block w-full pl-3 pr-10 py-2 text-base border-red-300 focus:outline-none focus:ring-red-400 focus:border-red-400 sm:text-sm rounded-md"
                        : "mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm rounded-md"
                    }
                    value={inputTipoDeProducto || ""}
                    onChange={onTextFieldChangedTipoDeProducto}
                  >
                    <option hidden>Selecciona un producto...</option>
                    {validProductType.map((productType) => (
                      <option key={productType}>{productType}</option>
                    ))}
                  </select>
                  {errorTipoDeProducto && (
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-9">
                      <ExclamationCircleIcon
                        className="h-5 w-5 text-red-500"
                        aria-hidden="true"
                      />
                    </div>
                  )}
                </div>
                {errorTipoDeProducto && (
                  <p
                    className="mt-2 text-sm text-red-600"
                    id="tipoDeProducto-error"
                  >
                    {errorTipoDeProducto}
                  </p>
                )}
              </div>

              <div className={"col-span-6 sm:col-span-2"}>
                <label
                  htmlFor="CmbProducto"
                  className="block text-sm font-medium text-gray-700"
                >
                  Producto
                </label>
                <div className="relative rounded-md shadow-sm">
                  <select
                    id="CmbProducto"
                    name="CmbProducto"
                    className={
                      errorSaborProducto
                        ? "mt-1 block w-full pl-3 pr-10 py-2 text-base border-red-300 focus:outline-none focus:ring-red-400 focus:border-red-400 sm:text-sm rounded-md"
                        : "mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm rounded-md"
                    }
                    value={inputSaborProducto || ""}
                    onChange={onTextFieldChangedSaborProducto}
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
                  {errorSaborProducto && (
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-9">
                      <ExclamationCircleIcon
                        className="h-5 w-5 text-red-500"
                        aria-hidden="true"
                      />
                    </div>
                  )}
                </div>
                {errorSaborProducto && (
                  <p
                    className="mt-2 text-sm text-red-600"
                    id="saborProducto-error"
                  >
                    {errorSaborProducto}
                  </p>
                )}
              </div>

              <div className="col-span-6 sm:col-span-2">
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
                    value={inputCantidad}
                    onChange={onTextFieldChangedCantidad}
                    readOnly
                  />

                  <button
                    type="button"
                    className="bg-primary-blue border border-transparent rounded-md shadow-sm py-2 px-5 inline-flex justify-center text-sm font-medium text-white hover:bg-primary-yellow hover:text-primary-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-yellow"
                    onClick={addProductQuantity}
                  >
                    <PlusIcon className="h-6 w-6" aria-hidden="true" />
                  </button>

                  <button
                    type="button"
                    className="bg-primary-blue border border-transparent rounded-md shadow-sm py-2 px-5 inline-flex justify-center text-sm font-medium text-white hover:bg-primary-yellow hover:text-primary-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-yellow"
                    onClick={removeProductQuantity}
                  >
                    <MinusIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
              </div>

              <div className="col-span-6 sm:col-span-2" />

              <div className="col-span-6 sm:col-span-2">
                <span className="block text-sm font-medium text-gray-700">
                  Código de producto
                </span>
                <p className="block text-lg font-medium text-gray-700">
                  {inputCodigoProducto || "-"}
                </p>
              </div>

              <div className="col-span-6 sm:col-span-2">
                <label
                  htmlFor="TxtPrecioPorProductoIndividual"
                  className="block text-sm font-medium text-gray-700"
                >
                  Precio por unidad
                </label>
                <div className="mt-1 relative rounded-md">
                  <label
                    htmlFor="TxtPrecioPorProductoIndividual"
                    className="block text-lg font-medium text-gray-700"
                  >
                    $ {inputPrecioProducto || 0}
                  </label>
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span
                      className="text-gray-500 s∏m:text-sm"
                      id="price-currency"
                    >
                      MXN
                    </span>
                  </div>
                </div>
              </div>

              <div className="col-span-6 sm:col-span-2">
                <span className="block text-sm font-medium text-gray-700">
                  Monto
                </span>
                <div className="mt-1 relative rounded-md">
                  <p className="block text-lg font-medium text-gray-700">
                    $ {inputMonto || 0}
                  </p>
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

              <div className="my-3 col-span-6 sm:col-span-8 border-t border-gray-200" />

              <div className="col-span-6 sm:col-span-2">
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

              <div className="col-span-6 sm:col-span-2">
                <div className="flex items-center">
                  <label
                    htmlFor="TxtQuieresUsarPuntos"
                    className="block text-sm font-medium text-gray-700"
                  >
                    ¿Quieres usar tus puntos?
                  </label>
                  <div className="text-xs text-gray-500">
                    &nbsp;&#40;Opcional&#41;
                  </div>
                </div>

                <select
                  id="TxtQuieresUsarPuntos"
                  name="TxtQuieresUsarPuntos"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm rounded-md"
                  onChange={onTextFieldChangedUsarPuntos}
                >
                  <>
                    <option hidden>Selecciona una opción...</option>
                    {useClientPoints.map((useClientPoint) => (
                      <option key={useClientPoint.id} hidden>
                        {useClientPoint.title}
                      </option>
                    ))}
                  </>
                </select>
              </div>

              <div className="col-span-6 sm:col-span-2">
                <div className="flex items-center">
                  <label
                    htmlFor="TxtQuieresUsarPuntos"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Puntos del cliente
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

              <div className="col-span-6 sm:col-span-2">
                <div className="">
                  <button
                    type="button"
                    className="bg-primary-yellow border border-transparent rounded-md shadow-sm py-5 px-[4.5rem] inline-flex justify-center text-sm font-medium text-white hover:bg-primary-yellow hover:text-primary-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-yellow"
                    onClick={agregarALaLista}
                  >
                    Añadir a la lista
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>

        <form>
          <div className="px-4 sm:px-6 lg:px-8">
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
                            Precio por unidad
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
                        </tr>
                      </thead>
                      {inputListaDeProductos.map((listadoProductos) => (
                        <tbody
                          key={listadoProductos.saborProducto}
                          className="divide-y divide-gray-200 bg-white"
                        >
                          <tr className="cursor-pointer hover:bg-yellow-100">
                            <td className="whitespace-nowrap pl-6 py-4 text-sm text-gray-500">
                              <div className="font-medium text-gray-900">
                                {listadoProductos.idProducto || ""}
                              </div>
                            </td>

                            <td className="whitespace-nowrap pl-6 py-4 text-sm text-gray-500">
                              <div className="font-medium text-gray-900">
                                {listadoProductos.tipoDeProducto || ""}
                              </div>
                            </td>

                            <td className="whitespace-nowrap pl-6 py-4 text-sm text-gray-500">
                              <div className="font-medium text-gray-900">
                                {listadoProductos.saborProducto || ""}
                              </div>
                            </td>

                            <td className="whitespace-nowrap pl-6 py-4 text-sm text-gray-500">
                              <div className="font-medium text-gray-900">
                                {listadoProductos.cantidad || ""}
                              </div>
                            </td>

                            <td className="whitespace-nowrap pl-6 py-4 text-sm text-gray-500">
                              <div className="font-medium text-gray-900">
                                $ {listadoProductos.precioProducto || ""}
                              </div>
                            </td>

                            <td className="whitespace-nowrap pl-6 py-4 text-sm text-gray-500">
                              <div className="font-medium text-gray-900">
                                $ {listadoProductos.monto || ""}
                              </div>
                            </td>

                            <td className="whitespace-nowrap pl-6 py-4 text-sm text-gray-500">
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

          <div className="">
            <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
              <div className="grid grid-cols-8 gap-6">
                <div className="col-span-6 sm:col-span-2" />

                <div className={"col-span-6 sm:col-span-2"}>
                  <label
                    htmlFor="CmbPromocion"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Promoción
                  </label>
                  <div className="relative rounded-md shadow-sm">
                    <select
                      id="CmbPromocion"
                      name="CmbPromocion"
                      className={
                        errorPromocion
                          ? "mt-1 block w-full pl-3 pr-10 py-2 text-base border-red-300 focus:outline-none focus:ring-red-400 focus:border-red-400 sm:text-sm rounded-md"
                          : "mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm rounded-md"
                      }
                      value={inputPromocion}
                      onChange={onTextFieldChangedPromocion}
                    >
                      <option hidden>Selecciona una opción...</option>
                      <option>No</option>
                      <option>Compra 6 pastes y llevate 1</option>
                      <option>Compra 10 pastes y llevate 2</option>
                      <option>Paste gratis</option>
                    </select>
                    {errorPromocion && (
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-9">
                        <ExclamationCircleIcon
                          className="h-5 w-5 text-red-500"
                          aria-hidden="true"
                        />
                      </div>
                    )}
                  </div>
                  {errorPromocion && (
                    <p
                      className="mt-2 text-sm text-red-600"
                      id="promocion-error"
                    >
                      {errorPromocion}
                    </p>
                  )}
                </div>

                <div className="col-span-6 sm:col-span-2">
                  <label
                    htmlFor="TxtMetodoDePago"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Método de pago
                  </label>

                  <div className="relative rounded-md shadow-sm">
                    <select
                      id="TxtMetodoDePago"
                      name="TxtMetodoDePago"
                      className={
                        errorMetodoDePago
                          ? "mt-1 block w-full pl-3 pr-10 py-2 text-base border-red-300 focus:outline-none focus:ring-red-400 focus:border-red-400 sm:text-sm rounded-md"
                          : "mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm rounded-md"
                      }
                      onChange={onTextFieldChangedMetodoDePago}
                    >
                      <>
                        <option hidden>Selecciona método de pago...</option>
                        {paymentMethods.map((paymentMethod) => (
                          <option key={paymentMethod}>{paymentMethod}</option>
                        ))}
                      </>
                    </select>
                    {errorMetodoDePago && (
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-6">
                        <ExclamationCircleIcon
                          className="h-5 w-5 text-red-500"
                          aria-hidden="true"
                        />
                      </div>
                    )}
                  </div>
                  {errorMetodoDePago && (
                    <p
                      className="mt-2 text-sm text-red-600"
                      id="metodoDePago-error"
                    >
                      {errorMetodoDePago}
                    </p>
                  )}
                </div>

                <div className="col-span-6 col-end-2 sm:col-span-2">
                  <label
                    htmlFor="TxtSumaTotalDeProductos"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Suma total de productos
                  </label>
                  <div className="mt-1 relative rounded-md">
                    <label
                      htmlFor="TxtSumaTotalDeProductos"
                      className="block text-lg font-medium text-gray-700"
                    >
                      $ {inputSumaTotal}
                    </label>
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
        </form>
      </div>
    </SidebarLayoutGerenciaVentas>
  );
};

export default AgregarReporteDeVentasIndividual;

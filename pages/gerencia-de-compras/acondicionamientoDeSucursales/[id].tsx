import {
  ChangeEvent,
  FC,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

import { AcondicionamientoDeSucursalesContext } from "../../../context/gerencia-de-compras/acondicionamientoDeSucursales/AcondicionamientoDeSucursalesContext";
import { ProveedoresContext } from "../../../context/gerencia-de-compras/manejoDeProveedores";

import { SidebarLayoutGerenciaCompras } from "../../../components/layouts/gerencia-de-compras/SidebarLayoutGerenciaCompras";

import { dbAcondicionamientoDeSucursal } from "../../../database";

import { AcondicionamientoDeSucursal, YesNo } from "../../../interfaces";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const validYesNoOptions: YesNo[] = ["Si", "No"];

interface Props {
  acondicionamientoDeSucursal: AcondicionamientoDeSucursal;
}

export const AcondicionamientoDeSucursalPage: FC<Props> = ({
  acondicionamientoDeSucursal,
}) => {
  const router = useRouter();

  const {
    actualizarAcondicionamientoDeSucursal,
    eliminarAcondicionamientoDeSucursal,
  } = useContext(AcondicionamientoDeSucursalesContext);

  const { proveedores } = useContext(ProveedoresContext);
  const proveedoresMemo = useMemo(() => proveedores, [proveedores]);

  const [inputProducto, setInputProducto] = useState(
    acondicionamientoDeSucursal.producto
  );
  const [inputFechaDeCompra, setInputFechaDeCompra] = useState(
    acondicionamientoDeSucursal.fechaDeCompra
  );
  const [inputDescripcionDelProducto, setInputDescripcionDelProducto] =
    useState(acondicionamientoDeSucursal.descripcionDelProducto);
  const [inputFechaEstimadaDeEntrega, setInputFechaEstimadaDeEntrega] =
    useState(acondicionamientoDeSucursal.fechaEstimadaDeEntrega);
  const [inputProveedor, setInputProveedor] = useState(
    acondicionamientoDeSucursal.proveedor
  );
  const [inputFactura, setInputFactura] = useState<YesNo>(
    acondicionamientoDeSucursal.factura
  );
  const [inputPrecioDeCompra, setInputPrecioDeCompra] = useState(
    acondicionamientoDeSucursal.precioDeCompra
  );
  const [inputCantidad, setInputCantidad] = useState(
    acondicionamientoDeSucursal.cantidad
  );
  const [inputTotalAcomulado, setInputTotalAcomulado] = useState(
    acondicionamientoDeSucursal.totalAcomulado
  );

  const [inputFranquicias, setInputFranquicias] = useState(
    acondicionamientoDeSucursal.franquicias
  );
  const [inputSucursales, setInputSucursales] = useState(
    acondicionamientoDeSucursal.sucursales
  );
  const [inputSucursalOFranquicia, setInputSucursalOFranquicia] = useState(
    acondicionamientoDeSucursal.sucursalOFranquicia
  );

  const MySwal = withReactContent(Swal);

  const onInputValueChangedFranquicias = (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    setInputFranquicias(event.target.value);
  };

  const onInputValueChangedSucursales = (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    setInputSucursales(event.target.value);
  };

  const onInputValueChangedProducto = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputProducto(event.target.value);
  };

  const onInputValueChangedFechaDeCompra = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputFechaDeCompra(event.target.value);
  };

  const onInputValueChangedDescripcionDelProducto = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputDescripcionDelProducto(event.target.value);
  };

  const onInputValueChangedFechaEstimadaDeEntrega = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputFechaEstimadaDeEntrega(event.target.value);
  };

  const onInputValueChangedProveedor = (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    setInputProveedor(event.target.value);
  };

  const onInputValueChangedFactura = (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    setInputFactura(event.target.value as YesNo);
  };

  const onInputValueChangedPrecioDeCompra = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputPrecioDeCompra(parseInt(event.target.value));
  };

  const onInputValueChangedCantidad = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputCantidad(parseInt(event.target.value));
  };

  const onInputValueChangedTotalAcomulado = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputTotalAcomulado(parseInt(event.target.value));
  };

  const onInputValueChangedsInputSucursalOFranquicia = (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    setInputSucursalOFranquicia(event.target.value);
  };

  const precioTotalDelProducto = () => {
    console.log(inputCantidad * inputPrecioDeCompra);
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
      inputSucursalOFranquicia.trim().length === 0 &&
      inputFranquicias?.trim().length === 0 &&
      inputSucursales?.trim().length === 0 &&
      inputProducto.trim().length === 0 &&
      inputFechaDeCompra.trim().length === 0 &&
      inputDescripcionDelProducto.trim().length === 0 &&
      inputFechaEstimadaDeEntrega.trim().length === 0 &&
      inputProveedor.trim().length === 0 &&
      inputFactura.trim().length === 0 &&
      inputPrecioDeCompra === 0 &&
      inputCantidad === 0 &&
      inputTotalAcomulado === 0
    )
      return;

    MySwal.fire({
      title:
        "¿Quieres actualizar la información a este acondicionamiento de sucursal?",
      text: "Verifica los datos antes de la operación",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#FFCC33",
      cancelButtonColor: "#d33",
      confirmButtonText: "Actualizar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        const actualizadoAcondicionamientoDeSucursal: AcondicionamientoDeSucursal =
          {
            ...acondicionamientoDeSucursal,
            sucursalOFranquicia: inputSucursalOFranquicia,
            sucursales: inputSucursales,
            franquicias: inputFranquicias,
            producto: inputProducto,
            fechaDeCompra: inputFechaDeCompra,
            descripcionDelProducto: inputDescripcionDelProducto,
            fechaEstimadaDeEntrega: inputFechaEstimadaDeEntrega,
            proveedor: inputProveedor,
            factura: inputFactura,
            precioDeCompra: inputPrecioDeCompra,
            cantidad: inputCantidad,
            totalAcomulado: inputTotalAcomulado,
          };

        actualizarAcondicionamientoDeSucursal(
          actualizadoAcondicionamientoDeSucursal,
          true
        );
        router.push(
          "/gerencia-de-compras/acondicionamientoDeSucursales/VerAcondicinamientoDeSucursal"
        );
      }
    });
  };

  const onDelete = () => {
    MySwal.fire({
      title: "¿Quieres eliminar a este acondicionamiento de sucursal?",
      text: "Verifica los datos antes de la operación",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#002D46",
      cancelButtonColor: "#d33",
      confirmButtonText: "Borrar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        eliminarAcondicionamientoDeSucursal(acondicionamientoDeSucursal, true);
        router.push(
          "/gerencia-de-compras/acondicionamientoDeSucursales/VerAcondicinamientoDeSucursal"
        );
      }
    });
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
                  value={inputSucursalOFranquicia}
                  onChange={onInputValueChangedsInputSucursalOFranquicia}
                  // onBlur={() => setTouched(true)}
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
                  defaultValue="Seleccione la franquicia..."
                  value={inputFranquicias}
                  onChange={onInputValueChangedFranquicias}
                  // onBlur={() => setTouched(true)}
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
                  defaultValue="Seleccione la sucursal..."
                  value={inputSucursales}
                  onChange={onInputValueChangedSucursales}
                  // onBlur={() => setTouched(true)}
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
                  onChange={onInputValueChangedProducto}
                  value={inputDescripcionDelProducto}
                  //   onBlur={() => setTouched(true)}
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
                  onChange={onInputValueChangedFechaDeCompra}
                  value={inputFechaDeCompra}
                  //   onBlur={() => setTouched(true)}
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
                  onChange={onInputValueChangedDescripcionDelProducto}
                  value={inputDescripcionDelProducto}
                  //   onBlur={() => setTouched(true)}
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
                  onChange={onInputValueChangedFechaEstimadaDeEntrega}
                  value={inputFechaEstimadaDeEntrega}
                  //   onBlur={() => setTouched(true)}
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
                  onChange={onInputValueChangedProveedor}
                  value={inputProveedor}
                  //   onBlur={() => setTouched(true)}
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
                  onChange={onInputValueChangedFactura}
                  value={inputFactura}
                  //   onBlur={() => setTouched(true)}
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
                    onChange={onInputValueChangedPrecioDeCompra}
                    // onBlur={() => setTouched(true)}
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
                  onChange={onInputValueChangedCantidad}
                  //   onBlur={() => setTouched(true)}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtTotalAcomulado"
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
                    name="TxtTotalAcomulado"
                    id="TxtTotalAcomulado"
                    className="focus:ring-primary-yellow focus:border-primary-yellow block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                    value={isNaN(inputTotalAcomulado) ? 0 : inputTotalAcomulado}
                    onChange={onInputValueChangedTotalAcomulado}
                    // onBlur={() => setTouched(true)}
                    placeholder="0.00"
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
              type="button"
              className="mx-4 bg-primary-blue border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-primary-yellow hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-yellow"
              onClick={onSave}
            >
              Actualizar
            </button>
            <button
              type="button"
              className="bg-red-500 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-red-600 hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-800"
              onClick={onDelete}
            >
              Eliminar
            </button>
          </div>
        </div>
      </form>
    </SidebarLayoutGerenciaCompras>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params as { id: string };

  const acondicionamientoDeSucursal =
    await dbAcondicionamientoDeSucursal.getAcondicionamientoDeSucursalById(id);

  if (!acondicionamientoDeSucursal) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      acondicionamientoDeSucursal,
    },
  };
};

export default AcondicionamientoDeSucursalPage;

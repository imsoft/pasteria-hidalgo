import { ChangeEvent, FC, useContext, useEffect, useMemo, useState } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { ReporteDeCompra, Temperatura } from '../../../interfaces/reporteDeCompra';
import { ReporteDeCompraContext } from '../../../context/gerencia-de-compras/reporteDeCompras/ReporteDeComprasContext';
import { SidebarLayoutGerenciaCompras } from '../../../components/layouts/gerencia-de-compras/SidebarLayoutGerenciaCompras';
import { dbReporteDeCompra } from "../../../database";
import { ProveedoresContext } from "../../../context/gerencia-de-compras/manejoDeProveedores";
import { Unidades } from "../../../interfaces";

const validTemperature: Temperatura[] = ["Ambiente", "Refrigerado", "Congelado"];
const validUnits: Unidades[] = ["Gramos", "Kilogramos", "Mililitros", "Litros"];

interface Props {
  reporteDeCompra: ReporteDeCompra;
}

export const ReporteDeCompraPage: FC<Props> = ({ reporteDeCompra }) => {
  const router = useRouter();

  const { actualizarReporteDeCompra, eliminarReporteDeCompra } =
    useContext(ReporteDeCompraContext);

  const { proveedores } = useContext(ProveedoresContext);
  const proveedoresMemo = useMemo(() => proveedores, [proveedores]);

    const [inputFechaDeCompra, setInputFechaDeCompra] = useState(reporteDeCompra.fechaDeCompra);
    const [inputCredito, setInputCredito] = useState(reporteDeCompra.credito);
    const [inputMateriaPrima, setInputMateriaPrima] = useState(reporteDeCompra.materiaPrima);
    const [inputUnidades, setInputUnidades] = useState<Unidades>(reporteDeCompra.unidades);
    const [inputNombreProveedor, setInputNombreProveedor] = useState(reporteDeCompra.nombreProveedor);
    const [inputTempetatura, setInputTempetatura] = useState<Temperatura>(reporteDeCompra.tempetatura);
    const [inputCaducidad, setInputCaducidad] = useState(reporteDeCompra.caducidad);
    const [inputFactura, setInputFactura] = useState(reporteDeCompra.factura);
    const [inputCantidad, setInputCantidad] = useState(reporteDeCompra.cantidad);
    const [inputPrecioPorUnidad, setInputPrecioPorUnidad] = useState(reporteDeCompra.precioPorUnidad);
    const [inputPrecioTotalDelProducto, setInputPrecioTotalDelProducto] = useState(reporteDeCompra.precioTotalDelProducto);
    const [inputPrecioTotalDelCompra, setInputPrecioTotalDelCompra] = useState(reporteDeCompra.precioTotalDelCompra);
    
    const MySwal = withReactContent(Swal);

  const onInputValueChangedFechaDeCompra = (event: ChangeEvent<HTMLInputElement>) => {
    setInputFechaDeCompra(event.target.value);
  };

  const onInputValueChangedCredito = (event: ChangeEvent<HTMLSelectElement>) => {
    setInputCredito(event.target.value);
  };
  
  const onInputValueChangedMateriaPrima = (event: ChangeEvent<HTMLInputElement>) => {
    setInputMateriaPrima(event.target.value);
  };

  const onInputValueChangedUnidades = (event: ChangeEvent<HTMLSelectElement>) => {
    setInputUnidades(event.target.value as Unidades);
  };

  const onInputValueChangedNombreProveedor = (event: ChangeEvent<HTMLSelectElement>) => {
    setInputNombreProveedor(event.target.value);
  };
  
  const onInputValueChangedTemperatura = (event: ChangeEvent<HTMLSelectElement>) => {
    setInputTempetatura(event.target.value as Temperatura);
  };

  const onInputValueChangedCaducidad = (event: ChangeEvent<HTMLInputElement>) => {
    setInputCaducidad(event.target.value);
  };

  const onInputValueChangedFactura = (event: ChangeEvent<HTMLSelectElement>) => {
    setInputFactura(event.target.value);
  };

  const onInputValueChangedCantidad = (event: ChangeEvent<HTMLInputElement>) => {
    isNaN(inputCantidad)
    ? setInputCantidad(parseInt(event.target.value))
    : setInputCantidad(parseInt(event.target.value))
  };
  
  const onInputValueChangedPrecioPorUnidad = (event: ChangeEvent<HTMLInputElement>) => {
    isNaN(inputPrecioPorUnidad)
    ? setInputPrecioPorUnidad(parseInt(event.target.value))
    : setInputPrecioPorUnidad(parseInt(event.target.value))
  };
  
  const onInputValueChangedPrecioTotalDelProducto = (event: ChangeEvent<HTMLInputElement>) => {
    setInputPrecioTotalDelProducto(parseInt(event.target.value));
  };
  
  const onInputValueChangedPrecioTotalDelCompra = (event: ChangeEvent<HTMLInputElement>) => {
    setInputPrecioTotalDelCompra(parseInt(event.target.value));
  };

  const PrecioTotalDelProducto = () => setInputPrecioTotalDelProducto(inputCantidad * inputPrecioPorUnidad);

  useEffect(() => {
    PrecioTotalDelProducto();
  }, [inputCantidad]);

  useEffect(() => {
    PrecioTotalDelProducto();
  }, [inputPrecioPorUnidad]);
  
  const onSave = () => {
    if (
        inputFechaDeCompra.trim().length === 0 &&
        inputCredito.trim().length === 0 &&
        inputMateriaPrima.trim().length === 0 &&
        inputUnidades.trim().length === 0 &&
        inputNombreProveedor.trim().length === 0 &&
        inputTempetatura.trim().length === 0 &&
        inputCaducidad.trim().length === 0 &&
        inputFactura.trim().length === 0 &&
        inputCantidad === 0 &&
        inputPrecioPorUnidad === 0 &&
        inputPrecioTotalDelProducto === 0 &&
        inputPrecioTotalDelCompra === 0
    )
      return;

    MySwal.fire({
      title: "¿Quieres actualizar la información a este reporte de compra?",
      text: "Verifica los datos antes de la operación",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#FFCC33",
      cancelButtonColor: "#d33",
      confirmButtonText: "Actualizar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        const actualizadoReporteDeCompra: ReporteDeCompra = {
          ...reporteDeCompra,
          fechaDeCompra: inputFechaDeCompra,
          credito: inputCredito,
          materiaPrima: inputMateriaPrima,
          unidades: inputUnidades,
          nombreProveedor: inputNombreProveedor,
          tempetatura: inputTempetatura,
          caducidad: inputCaducidad,
          factura: inputFactura,
          cantidad: inputCantidad,
          precioPorUnidad: inputPrecioPorUnidad,
          precioTotalDelProducto: inputPrecioTotalDelProducto,
          precioTotalDelCompra: inputPrecioTotalDelCompra,
        };

        actualizarReporteDeCompra(actualizadoReporteDeCompra, true);
        router.push("/gerencia-de-compras/reporteDeCompras/VerReporteDeCompras");
      }
    });
  };

  const onDelete = () => {
    MySwal.fire({
      title: "¿Quieres eliminar a este reporte de compra?",
      text: "Verifica los datos antes de la operación",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#002D46",
      cancelButtonColor: "#d33",
      confirmButtonText: "Borrar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        eliminarReporteDeCompra(reporteDeCompra, true);
        router.push("/gerencia-de-compras/reporteDeCompras/VerReporteDeCompras");
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
                Actualizar / Eliminar Reporte de compra
              </h3>
              <p className="mt-1 text-sm text-gray-500">¡Hola!</p>
            </div>
            <div className="grid grid-cols-6 gap-6">

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtFechaDeCompra"
                  className="block text-sm font-medium text-gray-700"
                >
                  Fecha De Compra
                </label>
                <input
                  type="date"
                  name="TxtFechaDeCompra"
                  id="TxtFechaDeCompra"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  value={inputFechaDeCompra}
                  onChange={onInputValueChangedFechaDeCompra}
                  // onBlur={() => setTouched(true)}
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
                  value={inputCredito}
                  onChange={onInputValueChangedCredito}
                  // onBlur={() => setTouched(true)}
                  defaultValue="Selecciona un producto..."
                >
                  <option>Selecciona una opción...</option>
                  <option>Si</option>
                  <option>No</option>
                </select>
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtMateriaPrima"
                  className="block text-sm font-medium text-gray-700"
                >
                  Materia Prima
                </label>
                <input
                  type="text"
                  name="TxtMateriaPrima"
                  id="TxtMateriaPrima"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  value={inputMateriaPrima}
                  onChange={onInputValueChangedMateriaPrima}
                  // onBlur={() => setTouched(true)}
                />
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
                  value={inputCantidad}
                  onChange={onInputValueChangedCantidad}
                  // onBlur={() => setTouched(true)}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtUnidades"
                  className="block text-sm font-medium text-gray-700"
                >
                  Unidades
                </label>
                <select
                  id="TxtUnidades"
                  name="TxtUnidades"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm rounded-md"
                  onChange={onInputValueChangedUnidades}
                  // onBlur={() => setTouched(true)}
                  defaultValue="Selecciona un producto..."
                >
                  <option>Selecciona una opción...</option>
                  {
                    validUnits.map( (unidades) => (
                      <option key={unidades} >{unidades}</option>
                    ) )
                  }
                </select>
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtNombreProveedor"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nombre Proveedor
                </label>
                <select
                  id="TxtNombreProveedor"
                  name="TxtNombreProveedor"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm rounded-md"
                  defaultValue="Selecciona un producto..."
                  value={inputNombreProveedor}
                  onChange={onInputValueChangedNombreProveedor}
                  // onBlur={() => setTouched(true)}
                >
                  <option>Selecciona un proveedor...</option>
                  {proveedoresMemo.map((proveedor) => (
                    <option key={proveedor._id}> {proveedor.nombre} </option>
                  ))}
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
                    value={inputPrecioPorUnidad}
                    onChange={onInputValueChangedPrecioPorUnidad}
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
                    value={inputPrecioTotalDelProducto}
                    onChange={onInputValueChangedPrecioTotalDelProducto}
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
                    value={inputPrecioTotalDelCompra}
                    onChange={onInputValueChangedPrecioTotalDelCompra}
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
                  onChange={onInputValueChangedTemperatura}
                  // onBlur={() => setTouched(true)}
                  defaultValue="Selecciona un producto..."
                >
                  <option>Selecciona una opción...</option>
                  {
                    validTemperature.map( (temperatura) => (
                      <option key={temperatura} >{temperatura}</option>
                    ) )
                  }
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
                  value={inputCaducidad}
                  onChange={onInputValueChangedCaducidad}
                  // onBlur={() => setTouched(true)}
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
                  value={inputFactura}
                  onChange={onInputValueChangedFactura}
                  // onBlur={() => setTouched(true)}
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

  const reporteDeCompra = await dbReporteDeCompra.getReporteDeCompraById(id);

  if (!reporteDeCompra) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      reporteDeCompra,
    },
  };
};

export default ReporteDeCompraPage;

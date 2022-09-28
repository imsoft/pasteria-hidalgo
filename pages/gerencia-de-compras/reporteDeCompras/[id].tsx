import { ChangeEvent, FC, useContext, useState } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { ReporteDeCompra } from '../../../interfaces/reporteDeCompra';
import { ReporteDeCompraContext } from '../../../context/gerencia-de-compras/reporteDeCompras/ReporteDeComprasContext';
import { SidebarLayoutGerenciaCompras } from '../../../components/layouts/gerencia-de-compras/SidebarLayoutGerenciaCompras';
import { dbReporteDeCompra } from "../../../database";

interface Props {
  reporteDeCompra: ReporteDeCompra;
}

export const ReporteDeCompraPage: FC<Props> = ({ reporteDeCompra }) => {
  const router = useRouter();

  const { actualizarReporteDeCompra, eliminarReporteDeCompra } =
    useContext(ReporteDeCompraContext);

    const [inputIdReporteDeCompra, setInputIdReporteDeCompra] = useState(reporteDeCompra.idReporteDeCompra);
    const [inputCodigoDeReporte, setInputCodigoDeReporte] = useState(reporteDeCompra.codigoDeReporte);
    const [inputFechaDeCompra, setInputFechaDeCompra] = useState(reporteDeCompra.fechaDeCompra);
    const [inputCredito, setInputCredito] = useState(reporteDeCompra.credito);
    const [inputFechaDePago, setInputFechaDePago] = useState(reporteDeCompra.fechaDePago);
    const [inputIdMateriaPrima, setInputIdMateriaPrima] = useState(reporteDeCompra.idMateriaPrima);
    const [inputMateriaPrima, setInputMateriaPrima] = useState(reporteDeCompra.materiaPrima);
    const [inputCantidad, setInputCantidad] = useState(reporteDeCompra.cantidad);
    const [inputUnidades, setInputUnidades] = useState(reporteDeCompra.unidades);
    const [inputIdProveedor, setInputIdProveedor] = useState(reporteDeCompra.idProveedor);
    const [inputNombreProveedor, setInputNombreProveedor] = useState(reporteDeCompra.nombreProveedor);
    const [inputPrecioPorUnidad, setInputPrecioPorUnidad] = useState(reporteDeCompra.precioPorUnidad);
    const [inputPrecioTotalDelProducto, setInputPrecioTotalDelProducto] = useState(reporteDeCompra.precioTotalDelProducto);
    const [inputPrecioTotalDelCompra, setInputPrecioTotalDelCompra] = useState(reporteDeCompra.precioTotalDelCompra);
    const [inputTempetatura, setInputTempetatura] = useState(reporteDeCompra.tempetatura);
    const [inputCaducidad, setInputCaducidad] = useState(reporteDeCompra.caducidad);
    const [inputFactura, setInputFactura] = useState(reporteDeCompra.factura);
    
    const MySwal = withReactContent(Swal);

  const onInputValueChangedIdReporteDeCompra = (event: ChangeEvent<HTMLInputElement>) => {
    setInputIdReporteDeCompra(event.target.value);
  };

  const onInputValueChangedCodigoDeReporte = (event: ChangeEvent<HTMLInputElement>) => {
    setInputCodigoDeReporte(event.target.value);
  };

  const onInputValueChangedFechaDeCompra = (event: ChangeEvent<HTMLInputElement>) => {
    setInputFechaDeCompra(event.target.value);
  };

//   const onInputValueChangedCredito = (event: ChangeEvent<HTMLInputElement>) => {
//     setInputCredito(event.target.value);
//   };
  
  const onInputValueChangedFechaDePago = (event: ChangeEvent<HTMLInputElement>) => {
    setInputFechaDePago(event.target.value);
  };
  
  const onInputValueChangedIdMateriaPrima = (event: ChangeEvent<HTMLInputElement>) => {
    setInputIdMateriaPrima(event.target.value);
  };
  
  const onInputValueChangedMateriaPrima = (event: ChangeEvent<HTMLInputElement>) => {
    setInputMateriaPrima(event.target.value);
  };
  
//   const onInputValueChangedCantidad = (event: ChangeEvent<HTMLInputElement>) => {
//     setInputCantidad(event.target.value);
//   };
  
  const onInputValueChangedUnidades = (event: ChangeEvent<HTMLInputElement>) => {
    setInputUnidades(event.target.value);
  };
  
  const onInputValueChangedIdProveedor = (event: ChangeEvent<HTMLInputElement>) => {
    setInputIdProveedor(event.target.value);
  };
  
  const onInputValueChangedNombreProveedor = (event: ChangeEvent<HTMLInputElement>) => {
    setInputNombreProveedor(event.target.value);
  };
  
//   const onInputValueChangedPrecioPorUnidad = (event: ChangeEvent<HTMLInputElement>) => {
//     setInputPrecioPorUnidad(event.target.value);
//   };
  
//   const onInputValueChangedPrecioTotalDelProducto = (event: ChangeEvent<HTMLInputElement>) => {
//     setInputPrecioTotalDelProducto(event.target.value);
//   };
  
//   const onInputValueChangedPrecioTotalDelCompra = (event: ChangeEvent<HTMLInputElement>) => {
//     setInputPrecioTotalDelCompra(event.target.value);
//   };
  
//   const onInputValueChangedTempetatura = (event: ChangeEvent<HTMLInputElement>) => {
//     setInputTempetatura(event.target.value);
//   };
  
  const onInputValueChangedCaducidad = (event: ChangeEvent<HTMLInputElement>) => {
    setInputCaducidad(event.target.value);
  };
  
//   const onInputValueChangedFactura = (event: ChangeEvent<HTMLInputElement>) => {
//     setInputFactura(event.target.value);
//   };

  const onSave = () => {
    if (
        inputIdReporteDeCompra.trim().length === 0 &&
        inputCodigoDeReporte.trim().length === 0 &&
        inputFechaDeCompra.trim().length === 0 &&
        inputFechaDePago.trim().length === 0 &&
        inputIdMateriaPrima.trim().length === 0 &&
        inputMateriaPrima.trim().length === 0 &&
        inputUnidades.trim().length === 0 &&
        inputIdProveedor.trim().length === 0 &&
        inputNombreProveedor.trim().length === 0
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
          idReporteDeCompra: inputIdReporteDeCompra,
          codigoDeReporte: inputCodigoDeReporte,
          fechaDeCompra: inputFechaDeCompra,
          credito: inputCredito,
          fechaDePago: inputFechaDePago,
          idMateriaPrima: inputIdMateriaPrima,
          materiaPrima: inputMateriaPrima,
          cantidad: inputCantidad,
          unidades: inputUnidades,
          idProveedor: inputIdProveedor,
          nombreProveedor: inputNombreProveedor,
          precioPorUnidad: inputPrecioPorUnidad,
          precioTotalDelProducto: inputPrecioTotalDelProducto,
          precioTotalDelCompra: inputPrecioTotalDelCompra,
          tempetatura: inputTempetatura,
          caducidad: inputCaducidad,
          factura: inputFactura,
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
                Agregar Reporte de compra
              </h3>
              <p className="mt-1 text-sm text-gray-500">¡Hola!</p>
            </div>
            <div className="grid grid-cols-6 gap-6">

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtIdReporteDeCompra"
                  className="block text-sm font-medium text-gray-700"
                >
                  Id Reporte De Compra
                </label>
                <input
                  type="text"
                  name="TxtIdReporteDeCompra"
                  id="TxtIdReporteDeCompra"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  value={inputIdReporteDeCompra}
                  onChange={onInputValueChangedIdReporteDeCompra}
                  // onBlur={() => setTouched(true)}
                />
              </div>
              
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtCodigoDeReporte"
                  className="block text-sm font-medium text-gray-700"
                >
                  Código De Reporte
                </label>
                <input
                  type="text"
                  name="TxtCodigoDeReporte"
                  id="TxtCodigoDeReporte"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  value={inputCodigoDeReporte}
                  onChange={onInputValueChangedCodigoDeReporte}
                  // onBlur={() => setTouched(true)}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtFechaDeCompra"
                  className="block text-sm font-medium text-gray-700"
                >
                  Fecha De Compra
                </label>
                <input
                  type="text"
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
                <input
                  type="text"
                  name="TxtCredito"
                  id="TxtCredito"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                //   value={inputCredito}
                //   onChange={onInputValueChangedCredito}
                  // onBlur={() => setTouched(true)}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtFechaDePago"
                  className="block text-sm font-medium text-gray-700"
                >
                  Fecha De Pago
                </label>
                <input
                  type="date"
                  name="TxtFechaDePago"
                  id="TxtFechaDePago"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  value={inputFechaDePago}
                  onChange={onInputValueChangedFechaDePago}
                  // onBlur={() => setTouched(true)}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtIdMateriaPrima"
                  className="block text-sm font-medium text-gray-700"
                >
                  Id Materia Prima
                </label>
                <input
                  type="text"
                  name="TxtIdMateriaPrima"
                  id="TxtIdMateriaPrima"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  value={inputIdMateriaPrima}
                  onChange={onInputValueChangedIdMateriaPrima}
                  // onBlur={() => setTouched(true)}
                />
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
                  // onChange={onInputValueChangedCantidad}
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
                <input
                  type="text"
                  name="TxtUnidades"
                  id="TxtUnidades"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  value={inputUnidades}
                  onChange={onInputValueChangedUnidades}
                  // onBlur={() => setTouched(true)}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtIdProveedor"
                  className="block text-sm font-medium text-gray-700"
                >
                  Id Proveedor
                </label>
                <input
                  type="text"
                  name="TxtIdProveedor"
                  id="TxtIdProveedor"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  value={inputIdProveedor}
                  onChange={onInputValueChangedIdProveedor}
                  // onBlur={() => setTouched(true)}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtNombreProveedor"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nombre Proveedor
                </label>
                <input
                  type="text"
                  name="TxtNombreProveedor"
                  id="TxtNombreProveedor"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  value={inputNombreProveedor}
                  onChange={onInputValueChangedNombreProveedor}
                  // onBlur={() => setTouched(true)}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtPrecioPorUnidad"
                  className="block text-sm font-medium text-gray-700"
                >
                  Precio Por Unidad
                </label>
                <input
                  type="text"
                  name="TxtPrecioPorUnidad"
                  id="TxtPrecioPorUnidad"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  value={inputPrecioPorUnidad}
                  // onChange={onInputValueChangedPrecioPorUnidad}
                  // onBlur={() => setTouched(true)}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtPrecioTotalDelProducto"
                  className="block text-sm font-medium text-gray-700"
                >
                  Precio Total Del Producto
                </label>
                <input
                  type="text"
                  name="TxtPrecioTotalDelProducto"
                  id="TxtPrecioTotalDelProducto"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  value={inputPrecioTotalDelProducto}
                  // onChange={onInputValueChangedPrecioTotalDelProducto}
                  // onBlur={() => setTouched(true)}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtPrecioTotalDelCompra"
                  className="block text-sm font-medium text-gray-700"
                >
                  Precio Total Del Compra
                </label>
                <input
                  type="text"
                  name="TxtPrecioTotalDelCompra"
                  id="TxtPrecioTotalDelCompra"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  value={inputPrecioTotalDelCompra}
                  // onChange={onInputValueChangedPrecioTotalDelCompra}
                  // onBlur={() => setTouched(true)}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtTempetatura"
                  className="block text-sm font-medium text-gray-700"
                >
                  Tempetatura
                </label>
                <input
                  type="text"
                  name="TxtTempetatura"
                  id="TxtTempetatura"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  value={inputTempetatura}
                  // onChange={onInputValueChangedTempetatura}
                  // onBlur={() => setTouched(true)}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtCaducidad"
                  className="block text-sm font-medium text-gray-700"
                >
                  Caducidad
                </label>
                <input
                  type="text"
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
                <input
                  type="text"
                  name="TxtFactura"
                  id="TxtFactura"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  // value={inputFactura}
                  // onChange={onInputValueChangedFactura}
                  // onBlur={() => setTouched(true)}
                />
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

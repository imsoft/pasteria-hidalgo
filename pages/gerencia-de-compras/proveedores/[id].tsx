import { ChangeEvent, FC, useContext, useState } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

import { SidebarLayoutGerenciaCompras } from '../../../components/layouts/gerencia-de-compras/SidebarLayoutGerenciaCompras';

import { ProveedoresContext } from '../../../context/gerencia-de-compras/manejoDeProveedores/ManejoDeProveedoresContext';

import { dbProveedor } from "../../../database"

import { Proveedor, YesNo } from '../../../interfaces';

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const validYesNoOptions: YesNo[] = ["Si", "No"];

interface Props {
    proveedor: Proveedor;
}

export const ProveedorPage: FC<Props> = ({ proveedor }) => {
  const router = useRouter();

  const { actualizarProveedor, eliminarProveedor } =
    useContext(ProveedoresContext);

  const [inputNombre, setInputNombre] = useState(proveedor.nombre);
  const [inputDireccion, setInputDireccion] = useState(proveedor.direccion);
  const [inputTelefono, setInputTelefono] = useState(proveedor.telefono);
  const [inputHorarioDeApertura, setInputHorarioDeApertura] = useState(proveedor.horarioDeApertura);
  const [inputHorarioDeCierre, setInputHorarioDeCierre] = useState(proveedor.horarioDeCierre);
  const [inputProductosQueSeCompran, setInputProductosQueSeCompran] = useState(proveedor.productosQueSeCompran);
  const [inputEntregasADomicilio, setInputEntregasADomicilio] = useState(proveedor.entregasADomicilio);
  const [inputRfc, setInputRfc] = useState(proveedor.rfc);

  const MySwal = withReactContent(Swal);

  const [touched, setTouched] = useState(false);

  const onInputValueChangedNombre = (event: ChangeEvent<HTMLInputElement>) => {
    setInputNombre(event.target.value);
  };

  const onInputValueChangedDireccion = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputDireccion(event.target.value);
  };

  const onInputValueChangedTelefono = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputTelefono(event.target.value);
  };

  const onInputValueChangedHorarioDeApertura = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputHorarioDeApertura(event.target.value);
  };

  const onInputValueChangedHorarioDeCierre = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputHorarioDeCierre(event.target.value);
  };

  const onInputValueChangedProductosQueSeCompran = (event: ChangeEvent<HTMLInputElement>) => {
    setInputProductosQueSeCompran(event.target.value);
  };

  const onInputValueChangedEntregasADomicilio = (event: ChangeEvent<HTMLSelectElement>) => {
    setInputEntregasADomicilio(event.target.value);
  };

  const onInputValueChangedRfc = (event: ChangeEvent<HTMLInputElement>) => {
    setInputRfc(event.target.value);
  };

  const onSave = () => {
    if (
      inputNombre.trim().length === 0 &&
      inputDireccion.trim().length === 0 &&
      inputTelefono.trim().length === 0 &&
      inputHorarioDeApertura.trim().length === 0 &&
      inputHorarioDeCierre.trim().length === 0 &&
      inputProductosQueSeCompran.trim().length === 0 &&
      inputEntregasADomicilio.trim().length === 0 &&
      inputRfc.trim().length === 0
    )
      return;

    MySwal.fire({
      title: "¿Quieres actualizar la información a este proveedor?",
      text: "Verifica los datos antes de la operación",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#FFCC33",
      cancelButtonColor: "#d33",
      confirmButtonText: "Actualizar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        const actualizadoProveedor: Proveedor = {
          ...proveedor,
          nombre: inputNombre,
          direccion: inputDireccion,
          telefono: inputTelefono,
          horarioDeApertura: inputHorarioDeApertura,
          horarioDeCierre: inputHorarioDeCierre,
          productosQueSeCompran: inputProductosQueSeCompran,
          entregasADomicilio: inputEntregasADomicilio,
          rfc: inputRfc,
        };

        actualizarProveedor(actualizadoProveedor, true);
        router.push("/gerencia-de-compras/proveedores/VerProveedores");
      }
    });
  };

  const onDelete = () => {
    MySwal.fire({
      title: "¿Quieres eliminar a este proveedor?",
      text: "Verifica los datos antes de la operación",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#002D46",
      cancelButtonColor: "#d33",
      confirmButtonText: "Borrar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        eliminarProveedor(proveedor, true);
        router.push("/gerencia-de-compras/proveedores/VerProveedores");
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
                Proveedores
              </h3>
              <p className="mt-1 text-sm text-gray-500">¡Hola!</p>
            </div>
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtNombre"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nombre
                </label>
                <input
                  type="text"
                  name="TxtNombre"
                  id="TxtNombre"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  value={inputNombre}
                  onChange={onInputValueChangedNombre}
                  // onBlur={() => setTouched(true)}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtDireccion"
                  className="block text-sm font-medium text-gray-700"
                >
                  Dirección
                </label>
                <input
                  type="text"
                  name="TxtDireccion"
                  id="TxtDireccion"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  value={inputDireccion}
                  onChange={onInputValueChangedDireccion}
                  // onBlur={() => setTouched(true)}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtTelefono"
                  className="block text-sm font-medium text-gray-700"
                >
                  Teléfono
                </label>
                <input
                  type="text"
                  name="TxtTelefono"
                  id="TxtTelefono"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  value={inputTelefono}
                  onChange={onInputValueChangedTelefono}
                  // onBlur={() => setTouched(true)}
                />
              </div>
              
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtHorarioDeApertura"
                  className="block text-sm font-medium text-gray-700"
                >
                  Horario De Apertura
                </label>
                <input
                  type="time"
                  name="TxtHorarioDeApertura"
                  id="TxtHorarioDeApertura"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  value={inputHorarioDeApertura}
                  onChange={onInputValueChangedHorarioDeApertura}
                  // onBlur={() => setTouched(true)}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtHorarioDeCierre"
                  className="block text-sm font-medium text-gray-700"
                >
                  Horario De Cierre
                </label>
                <input
                  type="time"
                  name="TxtHorarioDeCierre"
                  id="TxtHorarioDeCierre"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  value={inputHorarioDeCierre}
                  onChange={onInputValueChangedHorarioDeCierre}
                  // onBlur={() => setTouched(true)}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtProductosQueSeCompran"
                  className="block text-sm font-medium text-gray-700"
                >
                  Productos Que Se Compran
                </label>
                <input
                  type="text"
                  name="TxtProductosQueSeCompran"
                  id="TxtProductosQueSeCompran"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  value={inputProductosQueSeCompran}
                  onChange={onInputValueChangedProductosQueSeCompran}
                  // onBlur={() => setTouched(true)}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="CmbEntregasADomicilio"
                  className="block text-sm font-medium text-gray-700"
                >
                  ¿Entrega a domicilio?
                </label>
                <select
                  id="CmbEntregasADomicilio"
                  name="CmbEntregasADomicilio"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm rounded-md"
                  value={inputEntregasADomicilio}
                  onChange={onInputValueChangedEntregasADomicilio}
                  // onBlur={() => setTouched(true)}
                  defaultValue="Selecciona un producto..."
                >
                  <option hidden>Selecciona una opción...</option>
                  {validYesNoOptions.map((yesNoOptions) => (
                    <option key={yesNoOptions}>{yesNoOptions}</option>
                  ))}
                </select>
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtRfc"
                  className="block text-sm font-medium text-gray-700"
                >
                  RFC
                </label>
                <input
                  type="text"
                  name="TxtRfc"
                  id="TxtRfc"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  value={inputRfc}
                  onChange={onInputValueChangedRfc}
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

  const proveedor = await dbProveedor.getProveedorById(id);

  if (!proveedor) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      proveedor,
    },
  };
};

export default ProveedorPage;

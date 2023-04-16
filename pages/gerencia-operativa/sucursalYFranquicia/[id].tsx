import { ChangeEvent, FC, useContext, useState } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

import { SucursalesYFranquiciasContext } from "../../../context/gerencia-operativa/sucursalYFranquicia/SucursalYFranquiciaContext";

import { SidebarLayoutGerenciaOperativa } from "../../../components/layouts/gerencia-operativa/SidebarLayoutGerenciaOperativa";

import { dbSucursalYFranquicia } from "../../../database";

import { SucursalYFranquicia } from "../../../interfaces";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

interface Props {
  sucursalYFranquicia: SucursalYFranquicia;
}

export const SucursalYFranquiciaPage: FC<Props> = ({ sucursalYFranquicia }) => {
  const router = useRouter();

  const { actualizarSucursalYFranquicia, eliminarSucursalYFranquicia } =
    useContext(SucursalesYFranquiciasContext);

  const [inputSucursalOFranquicia, setInputSucursalOFranquicia] = useState(
    sucursalYFranquicia.sucursalOFranquicia
  );
  const [inputNombreSucursalOFranquicia, setInputNombreSucursalOFranquicia] =
    useState(sucursalYFranquicia.nombreSucursalOFranquicia);
  const [inputDireccion, setInputDireccion] = useState(
    sucursalYFranquicia.direccion
  );
  const [inputDistancia, setInputDistancia] = useState(
    sucursalYFranquicia.distancia
  );
  const [inputFechaDePago, setInputFechaDePago] = useState(
    sucursalYFranquicia.fechaDePago
  );
  const [inputMontoDePago, setInputMontoDePago] = useState(
    sucursalYFranquicia.montoDePago
  );
  const [inputCuentaBancaria, setInputCuentaBancaria] = useState(
    sucursalYFranquicia.cuentaBancaria
  );
  const [inputBanco, setInputBanco] = useState(sucursalYFranquicia.banco);
  const [inputNombreDelBeneficiario, setInputNombreDelBeneficiario] = useState(
    sucursalYFranquicia.nombreDelBeneficiario
  );
  const [inputRfc, setInputRfc] = useState(sucursalYFranquicia.rfc);

  const MySwal = withReactContent(Swal);

  const [touched, setTouched] = useState(false);

  const onInputValueChangedSucursalOFranquicia = (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    setInputSucursalOFranquicia(event.target.value);
  };

  const onInputValueChangedNombreSucursalOFranquicia = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputNombreSucursalOFranquicia(event.target.value);
  };

  const onInputValueChangedDireccion = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputDireccion(event.target.value);
  };

  const onInputValueChangedDistancia = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputDistancia(event.target.value);
  };

  const onInputValueChangedFechaDePago = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputFechaDePago(event.target.value);
  };

  const onInputValueChangedMontoDePago = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputMontoDePago(event.target.value);
  };

  const onInputValueChangedCuentaBancaria = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputCuentaBancaria(event.target.value);
  };

  const onInputValueChangedBanco = (event: ChangeEvent<HTMLInputElement>) => {
    setInputBanco(event.target.value);
  };

  const onInputValueChangedNombreDelBeneficiario = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputNombreDelBeneficiario(event.target.value);
  };

  const onInputValueChangedRfc = (event: ChangeEvent<HTMLInputElement>) => {
    setInputRfc(event.target.value);
  };

  const onSave = () => {
    if (
      inputSucursalOFranquicia.trim().length === 0 &&
      inputNombreSucursalOFranquicia.trim().length === 0 &&
      inputDireccion.trim().length === 0 &&
      inputDistancia.trim().length === 0 &&
      inputFechaDePago.trim().length === 0 &&
      inputMontoDePago.trim().length === 0 &&
      inputCuentaBancaria.trim().length === 0 &&
      inputBanco.trim().length === 0 &&
      inputNombreDelBeneficiario.trim().length === 0 &&
      inputRfc.trim().length === 0
    )
      return;

    MySwal.fire({
      title: "¿Quieres actualizar la información a esta Sucursal O Franquicia?",
      text: "Verifica los datos antes de la operación",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#FFCC33",
      cancelButtonColor: "#d33",
      confirmButtonText: "Actualizar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        const actualizadoSucursalYFranquicia: SucursalYFranquicia = {
          ...sucursalYFranquicia,
          sucursalOFranquicia: inputSucursalOFranquicia,
          nombreSucursalOFranquicia: inputNombreSucursalOFranquicia,
          direccion: inputDireccion,
          distancia: inputDistancia,
          fechaDePago: inputFechaDePago,
          montoDePago: inputMontoDePago,
          cuentaBancaria: inputCuentaBancaria,
          banco: inputBanco,
          nombreDelBeneficiario: inputNombreDelBeneficiario,
          rfc: inputRfc,
        };

        actualizarSucursalYFranquicia(actualizadoSucursalYFranquicia, true);
        router.push(
          "/gerencia-operativa/sucursalYFranquicia/VerSucursalesYFranquicias"
        );
      }
    });
  };

  const onDelete = () => {
    MySwal.fire({
      title: "¿Quieres eliminar a esta Sucursal O Franquicia?",
      text: "Verifica los datos antes de la operación",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#002D46",
      cancelButtonColor: "#d33",
      confirmButtonText: "Borrar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        eliminarSucursalYFranquicia(sucursalYFranquicia, true);
        router.push(
          "/gerencia-operativa/sucursalYFranquicia/VerSucursalesYFranquicias"
        );
      }
    });
  };

  return (
    <SidebarLayoutGerenciaOperativa>
      <form>
        <div className="shadow sm:rounded-md sm:overflow-hidden">
          <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Sucursales y Franquicias
              </h3>
              <p className="mt-1 text-sm text-gray-500">¡Hola!</p>
            </div>

            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <label className="block text-sm font-medium text-gray-700">
                  ¿Sucursal o Franquicia?
                </label>

                <div className="col-span-6 sm:col-span-3">
                  <select
                    id="CmbNombre"
                    name="CmbNombre"
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm rounded-md"
                    defaultValue="Selecciona un producto..."
                    value={inputSucursalOFranquicia}
                    onChange={onInputValueChangedSucursalOFranquicia}
                    onBlur={() => setTouched(true)}
                  >
                    <option>Seleccione una opción...</option>
                    <option>Sucursal</option>
                    <option>Franquicia</option>
                  </select>
                </div>
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtDireccion"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nombre de la sucursal o franquicia
                </label>
                <input
                  type="text"
                  name="TxtDireccion"
                  id="TxtDireccion"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  value={inputDireccion}
                  onChange={onInputValueChangedNombreSucursalOFranquicia}
                  onBlur={() => setTouched(true)}
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
                  onBlur={() => setTouched(true)}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtDistancia"
                  className="block text-sm font-medium text-gray-700"
                >
                  Distancia de la fabrica a la sucursal o franquicia
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    type="text"
                    name="TxtDistancia"
                    id="TxtDistancia"
                    className="focus:ring-primary-yellow focus:border-primary-yellow block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                    value={inputDistancia}
                    onChange={onInputValueChangedDistancia}
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
                  htmlFor="TxtFechaDePago"
                  className="block text-sm font-medium text-gray-700"
                >
                  Fecha de pago
                </label>
                <input
                  type="date"
                  name="TxtFechaDePago"
                  id="TxtFechaDePago"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  value={inputFechaDePago}
                  onChange={onInputValueChangedFechaDePago}
                  onBlur={() => setTouched(true)}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtMontoDePago"
                  className="block text-sm font-medium text-gray-700"
                >
                  Monto de pago
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="text"
                    name="TxtMontoDePago"
                    id="TxtMontoDePago"
                    className="focus:ring-primary-yellow focus:border-primary-yellow block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                    value={inputMontoDePago}
                    onChange={onInputValueChangedMontoDePago}
                    onBlur={() => setTouched(true)}
                    placeholder="0"
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
                  htmlFor="TxtCuentaBancaria"
                  className="block text-sm font-medium text-gray-700"
                >
                  Cuenta Bancaria
                </label>
                <input
                  type="text"
                  name="TxtCuentaBancaria"
                  id="TxtCuentaBancaria"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  value={inputCuentaBancaria}
                  onChange={onInputValueChangedCuentaBancaria}
                  onBlur={() => setTouched(true)}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtBanco"
                  className="block text-sm font-medium text-gray-700"
                >
                  Banco
                </label>
                <input
                  type="text"
                  name="TxtBanco"
                  id="TxtBanco"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  value={inputBanco}
                  onChange={onInputValueChangedBanco}
                  onBlur={() => setTouched(true)}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtNombreDelNeneficiario"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nombre del beneficiario
                </label>
                <input
                  type="text"
                  name="TxtNombreDelNeneficiario"
                  id="TxtNombreDelNeneficiario"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  value={inputNombreDelBeneficiario}
                  onChange={onInputValueChangedNombreDelBeneficiario}
                  onBlur={() => setTouched(true)}
                />
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
                  onBlur={() => setTouched(true)}
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
    </SidebarLayoutGerenciaOperativa>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params as { id: string };

  const sucursalYFranquicia =
    await dbSucursalYFranquicia.getSucursalYFranquiciaById(id);

  if (!sucursalYFranquicia) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      sucursalYFranquicia,
    },
  };
};

export default SucursalYFranquiciaPage;

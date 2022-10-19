import { ChangeEvent, FC, useContext, useState } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

import { ApartadosJuridicosContext } from "../../../context/gerencia-operativa/apartadoJuridico/ApartadosJuridicosContext";

import { SidebarLayoutGerenciaOperativa } from "../../../components/layouts/gerencia-operativa/SidebarLayoutGerenciaOperativa";

import { dbApartadoJuridico } from "../../../database";

import { ApartadoJuridico } from "../../../interfaces";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

interface Props {
  apartadoJuridico: ApartadoJuridico;
}

export const ApartadoJuridicoPage: FC<Props> = ({ apartadoJuridico }) => {
  const router = useRouter();

  const { actualizarApartadoJuridico, eliminarApartadoJuridico } = useContext(
    ApartadosJuridicosContext
  );

  const [inputSucursalOFranquicia, setInputSucursalOFranquicia] = useState(
    apartadoJuridico.sucursalOFranquicia
  );
  const [inputDocumento, setInputDocumento] = useState(
    apartadoJuridico.documento
  );
  const [inputSucursales, setInputSucursales] = useState(
    apartadoJuridico.sucursales
  );
  const [inputFranquicias, setInputFranquicias] = useState(
    apartadoJuridico.franquicias
  );

  const MySwal = withReactContent(Swal);

  const onInputValueChangedSucursalOFranquicia = (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    setInputSucursalOFranquicia(event.target.value);
  };

  const onInputValueChangedDocumento = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputDocumento(event.target.value);
  };

  const onInputValueChangedSucursales = (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    setInputSucursales(event.target.value);
  };

  const onInputValueChangedFranquicias = (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    setInputFranquicias(event.target.value);
  };

  const onSave = () => {
    if (
      inputSucursalOFranquicia.trim().length === 0 &&
      inputDocumento.length === 0 &&
      inputSucursales?.trim().length === 0 &&
      inputFranquicias?.trim().length === 0
    )
      return;

    MySwal.fire({
      title: "¿Quieres actualizar la información a este apartado juridico?",
      text: "Verifica los datos antes de la operación",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#FFCC33",
      cancelButtonColor: "#d33",
      confirmButtonText: "Actualizar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        const actualizadoApartadoJuridico: ApartadoJuridico = {
          ...apartadoJuridico,
          sucursalOFranquicia: inputSucursalOFranquicia,
          documento: inputDocumento,
          sucursales: inputSucursales,
          franquicias: inputFranquicias,
        };

        actualizarApartadoJuridico(actualizadoApartadoJuridico, true);
        router.push("/gerencia-operativa/apartadoJuridico/VerApartadoJuridico");
      }
    });
  };

  const onDelete = () => {
    MySwal.fire({
      title: "¿Quieres eliminar a este apartado juridico?",
      text: "Verifica los datos antes de la operación",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#002D46",
      cancelButtonColor: "#d33",
      confirmButtonText: "Borrar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        eliminarApartadoJuridico(apartadoJuridico, true);
        router.push("/gerencia-operativa/apartadoJuridico/VerApartadoJuridico");
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
                Apartado Jurídico
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
                  onChange={onInputValueChangedSucursalOFranquicia}
                //   onBlur={() => setTouched(true)}
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
                  defaultValue="Selecciona un producto..."
                  value={inputDocumento}
                  onChange={onInputValueChangedFranquicias}
                //   onBlur={() => setTouched(true)}
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
                  defaultValue="Selecciona un producto..."
                  value={inputSucursales}
                  onChange={onInputValueChangedSucursales}
                //   onBlur={() => setTouched(true)}
                >
                  <option>Seleccione la sucursal...</option>
                  <option>Chapultepec</option>
                  <option>Chapalita</option>
                  <option>Chiapas</option>
                </select>
              </div>

              <div className="col-span-6">
                <label className="text-base font-medium text-gray-900">
                  Seleccione un documento...
                </label>
                <p className="text-sm leading-5 text-gray-500">
                  Solo archivos con extensión '.pdf'
                </p>
                <input
                  type="file"
                  id="BtnSeleccionarArchivo"
                  name="BtnSeleccionarArchivo"
                  accept="application/pdf"
                  className="bg-gray-400 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-primary-yellow hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-yellow"
                  value={inputFranquicias}
                  onChange={onInputValueChangedDocumento}
                //   onBlur={() => setTouched(true)}
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

  const apartadoJuridico = await dbApartadoJuridico.getApartadoJuridicoById(id);

  if (!apartadoJuridico) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      apartadoJuridico,
    },
  };
};

export default ApartadoJuridicoPage;

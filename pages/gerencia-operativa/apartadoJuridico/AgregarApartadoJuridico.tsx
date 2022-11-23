import { ChangeEvent, useContext, useState } from "react";
import { useRouter } from "next/router";

import { SidebarLayoutGerenciaOperativa } from "../../../components/layouts/gerencia-operativa/SidebarLayoutGerenciaOperativa";

import { ApartadosJuridicosContext } from "../../../context/gerencia-operativa/apartadoJuridico/ApartadosJuridicosContext";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const ApartadoJuridico = () => {
  const { agregarNuevoApartadoJuridico } = useContext(
    ApartadosJuridicosContext
  );

  const router = useRouter();

  const [inputSucursalOFranquicia, setInputSucursalOFranquicia] = useState("");
  const [inputSucursales, setInputSucursales] = useState("");
  const [inputFranquicias, setInputFranquicias] = useState("");
  const [inputDocumento, setInputDocumento] = useState("");

  const [touched, setTouched] = useState(false);

  const MySwal = withReactContent(Swal);

  const onTextFieldChangedFranquicias = (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    setInputFranquicias(event.target.value);
  };

  const onTextFieldChangedSucursales = (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    setInputSucursales(event.target.value);
  };

  const onTextFieldChangedSucursalOFranquicia = (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    setInputSucursalOFranquicia(event.target.value);
  };

  const onTextFieldChangedDocumento = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputDocumento(event.target.value);
  };

  const onSave = () => {
    if (
      inputSucursalOFranquicia.length === 0 &&
      inputSucursales.length === 0 &&
      inputFranquicias.length === 0 &&
      inputDocumento.length === 0
    )
      return;

    agregarNuevoApartadoJuridico(
      inputSucursalOFranquicia,
      inputDocumento,
      inputSucursales,
      inputFranquicias,
      true
    );

    MySwal.fire({
      position: "top-end",
      icon: "success",
      title: "Candidato Agregado",
      showConfirmButton: false,
      timer: 5000,
    });

    router.push("/gerencia-operativa/apartadoJuridico/VerApartadoJuridico");

    setTouched(false);
    setInputSucursalOFranquicia("");
    setInputSucursales("");
    setInputFranquicias("");
    setInputDocumento("");
  };

  return (
    <SidebarLayoutGerenciaOperativa>
      <form>
        <div className="shadow sm:rounded-md sm:overflow-hidden">
          <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Apartado Juridico
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
                  onChange={onTextFieldChangedSucursalOFranquicia}
                  onBlur={() => setTouched(true)}
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
                  onChange={onTextFieldChangedFranquicias}
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
                  onChange={onTextFieldChangedSucursales}
                  onBlur={() => setTouched(true)}
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
                  onChange={onTextFieldChangedDocumento}
                  onBlur={() => setTouched(true)}
                />
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
};

export default ApartadoJuridico;

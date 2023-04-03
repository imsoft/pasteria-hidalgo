import { ChangeEvent, useContext, useMemo, useState } from "react";
import { useRouter } from "next/router";

import { PersonalActivoContext } from "../../../context/recursos-humanos/personalActivo/PersonalActivoContext";
import { CandidatosContext } from "../../../context/recursos-humanos/candidatos";

import { SidebarLayoutRecursosHumanos } from "../../../components/layouts/recursos-humanos/SidebarLayoutRecursosHumanos";

import { PuestosEmpresa } from "../../../interfaces";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const puestosValidos: PuestosEmpresa[] = ["Administrador", "Chef", "Operador"];

export default function AgregarPersonalActivo() {
  const router = useRouter();

  const { agregarPersonalActivo } = useContext(PersonalActivoContext);

  const [inputNombre, setInputNombre] = useState("");
  const [inputPuesto, setInputDescripcionDelPuesto] = useState("");
  const [inputFechaDeContratacion, setInputFechaDeNacimiento] = useState("");
  const [inputNoContrato, setInputNoContrato] = useState("");
  const [inputNoExpediente, setInputNoExpediente] = useState("");
  const [inputBajaTemporal, setInputBajaTemporal] = useState("No");
  const [inputComentarios, setInputComentarios] = useState("");

  const [touched, setTouched] = useState(false);

  const { candidatos } = useContext(CandidatosContext);
  const candidatosMemo = useMemo(() => candidatos, [candidatos]);

  const MySwal = withReactContent(Swal);

  const onTextFieldChangedNombre = (event: ChangeEvent<HTMLSelectElement>) => {
    setInputNombre(event.target.value);
  };

  const onTextFieldChangedPuesto = (event: ChangeEvent<HTMLSelectElement>) => {
    setInputDescripcionDelPuesto(event.target.value as PuestosEmpresa);
  };

  const onTextFieldChangedFechaDeContratacion = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputFechaDeNacimiento(event.target.value);
  };

  const onTextFieldChangedNoContrato = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputNoContrato(event.target.value);
  };

  const onTextFieldChangedNoExpediente = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputNoExpediente(event.target.value);
  };

  const onTextFieldChangedBajaTemporal = (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    setInputBajaTemporal(event.target.value);
  };

  const onTextFieldChangedComentarios = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputComentarios(event.target.value);
  };

  const onSave = () => {
    if (
      inputNombre.length === 0 &&
      inputPuesto.length === 0 &&
      inputFechaDeContratacion.length === 0 &&
      inputNoContrato.length === 0 &&
      inputNoExpediente.length === 0 &&
      inputComentarios.length === 0 &&
      inputBajaTemporal.length === 0
    )
      return;

    console.log(inputBajaTemporal);

    agregarPersonalActivo(
      inputNombre,
      inputPuesto,
      inputFechaDeContratacion,
      inputNoContrato,
      inputNoExpediente,
      inputBajaTemporal,
      inputComentarios,
      true
    );

    MySwal.fire({
      position: "top-end",
      icon: "success",
      title: "Personal Activo Agregado",
      showConfirmButton: false,
      timer: 2000,
    });

    router.push("/recursos-humanos/personalActivo/VerPersonalActivo");

    setTouched(false);
    setInputNombre("");
    setInputDescripcionDelPuesto("");
    setInputFechaDeNacimiento("");
    setInputNoContrato("");
    setInputNoExpediente("");
    setInputBajaTemporal("");
    setInputComentarios("");
  };

  return (
    <SidebarLayoutRecursosHumanos>
      <form>
        <div className="shadow sm:rounded-md sm:overflow-hidden">
          <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Personal Activo
              </h3>
              <p className="mt-1 text-sm text-gray-500">¡Hola!</p>
            </div>
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="CmbNombre"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nombre
                </label>
                <select
                  id="CmbNombre"
                  name="CmbNombre"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm rounded-md"
                  defaultValue="Selecciona un producto..."
                  onChange={onTextFieldChangedNombre}
                  onBlur={() => setTouched(true)}
                >
                  <option hidden>Seleccione el nombre...</option>
                  {candidatosMemo.map((candidato) => (
                    <option key={candidato._id}> {candidato.nombre} </option>
                  ))}
                </select>
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtDPuesto"
                  className="block text-sm font-medium text-gray-700"
                >
                  Puesto
                </label>
                <select
                  id="CmbPuesto"
                  name="CmbPuesto"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm rounded-md"
                  defaultValue="Selecciona un producto..."
                  onChange={onTextFieldChangedPuesto}
                  onBlur={() => setTouched(true)}
                >
                  <option hidden>Selecciona una opción...</option>
                  {candidatosMemo
                    .filter((candidato) => candidato.nombre === inputNombre)
                    .map((candidato) => (
                      <option key={candidato.puesto}>{candidato.puesto}</option>
                    ))}
                </select>
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtFechaDeContratacion"
                  className="block text-sm font-medium text-gray-700"
                >
                  Fecha de contratación
                </label>
                <input
                  type="date"
                  name="TxtFechaDeContratacion"
                  id="TxtFechaDeContratacion"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  onChange={onTextFieldChangedFechaDeContratacion}
                  onBlur={() => setTouched(true)}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtNoDeContrato"
                  className="block text-sm font-medium text-gray-700"
                >
                  No. De Contrato
                </label>
                <input
                  type="text"
                  name="TxtNoDeContrato"
                  id="TxtNoDeContrato"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  onChange={onTextFieldChangedNoContrato}
                  onBlur={() => setTouched(true)}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtNoExpediente"
                  className="block text-sm font-medium text-gray-700"
                >
                  No. Expediente
                </label>
                <input
                  type="text"
                  name="TxtNoExpediente"
                  id="TxtNoExpediente"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  onChange={onTextFieldChangedNoExpediente}
                  onBlur={() => setTouched(true)}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="CmbBajaTemporal"
                  className="block text-sm font-medium text-gray-700"
                >
                  Baja Temporal
                </label>
                <select
                  id="CmbBajaTemporal"
                  name="CmbBajaTemporal"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm rounded-md"
                  onBlur={() => setTouched(true)}
                  onChange={onTextFieldChangedBajaTemporal}
                  defaultValue="Selecciona un producto..."
                  // disabled={true}
                >
                  <option>No</option>
                </select>
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtComentarios"
                  className="block text-sm font-medium text-gray-700"
                >
                  Comentarios
                </label>
                <input
                  type="text"
                  name="TxtComentarios"
                  id="TxtComentarios"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  onChange={onTextFieldChangedComentarios}
                  onBlur={() => setTouched(true)}
                />
              </div>
            </div>
          </div>
          <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
            <button
              type="button"
              className="bg-primary-blue border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-primary-yellow hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-yellow"
              onClick={onSave}
            >
              Guardar
            </button>
          </div>
        </div>
      </form>
    </SidebarLayoutRecursosHumanos>
  );
}

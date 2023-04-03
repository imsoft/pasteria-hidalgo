import { ChangeEvent, FC, useContext, useState } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

import { CandidatosContext } from "../../../context/recursos-humanos/candidatos/CandidatosContext";

import { SidebarLayoutRecursosHumanos } from "../../../components/layouts/recursos-humanos/SidebarLayoutRecursosHumanos";

import { dbCandidato } from "../../../database";

import { Candidato, PuestosEmpresa } from "../../../interfaces";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const puestosValidos: PuestosEmpresa[] = [
  "Administrador",
  "Contaduria",
  "Gerencia de compras",
  "Gerencia operativa",
  "Gerencia de ventas",
  "Recursos Humanos",
];

interface Props {
  candidato: Candidato;
}

export const CandidatoPage: FC<Props> = ({ candidato }) => {
  const router = useRouter();

  const { actualizarCandidato, eliminarCandidato } =
    useContext(CandidatosContext);

  const [inputNombre, setInputNombre] = useState(candidato.nombre);
  const [inputDescripcionDelPuesto, setInputDescripcionDelPuesto] = useState(
    candidato.descripcionDelPuesto
  );
  const [inputFechaDeNacimiento, setInputFechaDeNacimiento] = useState(
    candidato.fechaDeNacimiento
  );
  const [inputDomicilio, setInputDomicilio] = useState(candidato.domicilio);
  const [inputCurp, setInputCurp] = useState(candidato.curp);
  const [inputNoImss, setInputNoImss] = useState(candidato.noImss);
  const [inputNoCartaDePolicia, setInputNoCartaDePolicia] = useState(
    candidato.noCartaDePolicia
  );
  const [puesto, setPuesto] = useState<PuestosEmpresa>(candidato.puesto);
  const [inputCelular, setInputCelular] = useState(candidato.celular);
  const [inputContactoDeEmergencia, setInputContactoDeEmergencia] = useState(
    candidato.contactoDeEmergencia
  );
  const [inputCorreoElectronico, setInputCorreoElectronico] = useState(
    candidato.correoElectronico
  );
  const [inputReferencia1Nombre, setInputReferencia1Nombre] = useState(
    candidato.referencia1Nombre
  );
  const [inputReferencia1Empresa, setInputReferencia1Empresa] = useState(
    candidato.referencia1Empresa
  );
  const [
    inputReferencia1NumeroTelefonico,
    setInputReferencia1NumeroTelefonico,
  ] = useState(candidato.referencia1NumeroTelefonico);
  const [inputReferencia1Observaciones, setInputReferencia1Observaciones] =
    useState(candidato.referencia1Observaciones);
  const [inputReferencia2Nombre, setInputReferencia2Nombre] = useState(
    candidato.referencia2Nombre
  );
  const [inputReferencia2Empresa, setInputReferencia2Empresa] = useState(
    candidato.referencia2Empresa
  );
  const [
    inputReferencia2NumeroTelefonico,
    setInputReferencia2NumeroTelefonico,
  ] = useState(candidato.referencia2NumeroTelefonico);
  const [inputReferencia2Observaciones, setInputReferencia2Observaciones] =
    useState(candidato.referencia2Observaciones);
  const [inputReferencia3Nombre, setInputReferencia3Nombre] = useState(
    candidato.referencia3Nombre
  );
  const [inputReferencia3Empresa, setInputReferencia3Empresa] = useState(
    candidato.referencia3Empresa
  );
  const [
    inputReferencia3NumeroTelefonico,
    setInputReferencia3NumeroTelefonico,
  ] = useState(candidato.referencia3NumeroTelefonico);
  const [inputReferencia3Observaciones, setInputReferencia3Observaciones] =
    useState(candidato.referencia3Observaciones);

  const MySwal = withReactContent(Swal);

  // const [touched, setTouched] = useState(false);
  // const esNombreValido = useMemo( () => inputNombre.length <= 0 && touched, [inputNombre, touched] );
  // const esPuestoValido = useMemo( () => inputPuesto.length <= 0 && touched, [inputPuesto, touched] );
  // const esDescripcionDelPuestoValido = useMemo( () => inputDescripcionDelPuesto.length <= 0 && touched, [inputDescripcionDelPuesto, touched] );
  // const esFechaDeNacimientoValido = useMemo( () => inputFechaDeNacimiento.length <= 0 && touched, [inputFechaDeNacimiento, touched] );
  // const esDomicilioValido = useMemo( () => inputDomicilio.length <= 0 && touched, [inputDomicilio, touched] );
  // const esCurpValido = useMemo( () => inputCurp.length <= 0 && touched, [inputCurp, touched] );
  // const esNoImssValido = useMemo( () => inputNoImss.length <= 0 && touched, [inputNoImss, touched] );
  // const esNoCartaDePoliciaValido = useMemo( () => inputNoCartaDePolicia.length <= 0 && touched, [inputNoCartaDePolicia, touched] );

  const onInputValueChangedNombre = (event: ChangeEvent<HTMLInputElement>) => {
    setInputNombre(event.target.value);
  };

  const onInputValueChangedDescripcionDelPuesto = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputDescripcionDelPuesto(event.target.value);
  };

  const onInputValueChangedFechaDeNacimiento = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputFechaDeNacimiento(event.target.value);
  };

  const onInputValueChangedDomicilio = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputDomicilio(event.target.value);
  };

  const onInputValueChangedCurp = (event: ChangeEvent<HTMLInputElement>) => {
    setInputCurp(event.target.value);
  };

  const onInputValueChangedNoImss = (event: ChangeEvent<HTMLInputElement>) => {
    setInputNoImss(event.target.value);
  };

  const onInputValueChangedNoCartaDePolicia = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputNoCartaDePolicia(event.target.value);
  };

  const onStatusChanged = (event: ChangeEvent<HTMLSelectElement>) => {
    setPuesto(event.target.value as PuestosEmpresa);
  };

  const onInputValueChangedCelular = (event: ChangeEvent<HTMLInputElement>) => {
    setInputCelular(event.target.value);
  };

  const onInputValueChangedContactoDeEmergencia = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputContactoDeEmergencia(event.target.value);
  };

  const onInputValueChangedCorreoElectronico = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputCorreoElectronico(event.target.value);
  };

  const onInputValueChangedReferencia1Nombre = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputReferencia1Nombre(event.target.value);
  };

  const onInputValueChangedReferencia1Empresa = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputReferencia1Empresa(event.target.value);
  };

  const onInputValueChangedReferencia1NumeroTelefonico = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputReferencia1NumeroTelefonico(event.target.value);
  };

  const onInputValueChangedReferencia1Observaciones = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputReferencia1Observaciones(event.target.value);
  };

  const onInputValueChangedReferencia2Nombre = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputReferencia2Nombre(event.target.value);
  };

  const onInputValueChangedReferencia2Empresa = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputReferencia2Empresa(event.target.value);
  };

  const onInputValueChangedReferencia2NumeroTelefonico = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputReferencia2NumeroTelefonico(event.target.value);
  };

  const onInputValueChangedReferencia2Observaciones = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputReferencia2Observaciones(event.target.value);
  };

  const onInputValueChangedReferencia3Nombre = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputReferencia3Nombre(event.target.value);
  };

  const onInputValueChangedReferencia3Empresa = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputReferencia3Empresa(event.target.value);
  };

  const onInputValueChangedReferencia3NumeroTelefonico = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputReferencia3NumeroTelefonico(event.target.value);
  };

  const onInputValueChangedReferencia3Observaciones = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputReferencia3Observaciones(event.target.value);
  };

  const onSave = () => {
    if (
      inputNombre.trim().length === 0 &&
      puesto.trim().length === 0 &&
      inputDescripcionDelPuesto.trim().length === 0 &&
      inputFechaDeNacimiento.trim().length === 0 &&
      inputDomicilio.trim().length === 0 &&
      inputCurp.trim().length === 0 &&
      inputNoImss?.trim().length === 0 &&
      inputNoCartaDePolicia.trim().length === 0 &&
      inputCelular.trim().length === 0 &&
      inputContactoDeEmergencia.trim().length === 0 &&
      inputCorreoElectronico.trim().length === 0 &&
      inputReferencia1Nombre.trim().length === 0 &&
      inputReferencia1Empresa.trim().length === 0 &&
      inputReferencia1NumeroTelefonico.trim().length === 0 &&
      inputReferencia1Observaciones.trim().length === 0 &&
      inputReferencia2Nombre.trim().length === 0 &&
      inputReferencia2Empresa.trim().length === 0 &&
      inputReferencia2NumeroTelefonico.trim().length === 0 &&
      inputReferencia2Observaciones.trim().length === 0 &&
      inputReferencia3Nombre?.trim().length === 0 &&
      inputReferencia3Empresa?.trim().length === 0 &&
      inputReferencia3NumeroTelefonico?.trim().length === 0 &&
      inputReferencia3Observaciones?.trim().length === 0
    )
      return;

    MySwal.fire({
      title: "¿Quieres actualizar la información a este candidato?",
      text: "Verifica los datos antes de la operación",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#FFCC33",
      cancelButtonColor: "#d33",
      confirmButtonText: "Actualizar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        const actualizadoCandidato: Candidato = {
          ...candidato,
          nombre: inputNombre,
          puesto,
          descripcionDelPuesto: inputDescripcionDelPuesto,
          fechaDeNacimiento: inputFechaDeNacimiento,
          domicilio: inputDomicilio,
          curp: inputCurp,
          noImss: inputNoImss,
          noCartaDePolicia: inputNoCartaDePolicia,
          celular: inputCelular,
          contactoDeEmergencia: inputContactoDeEmergencia,
          correoElectronico: inputCorreoElectronico,
          referencia1Nombre: inputReferencia1Nombre,
          referencia1Empresa: inputReferencia1Empresa,
          referencia1NumeroTelefonico: inputReferencia1NumeroTelefonico,
          referencia1Observaciones: inputReferencia1Observaciones,
          referencia2Nombre: inputReferencia2Nombre,
          referencia2Empresa: inputReferencia2Empresa,
          referencia2NumeroTelefonico: inputReferencia2NumeroTelefonico,
          referencia2Observaciones: inputReferencia2Observaciones,
          referencia3Nombre: inputReferencia3Nombre,
          referencia3Empresa: inputReferencia3Empresa,
          referencia3NumeroTelefonico: inputReferencia3NumeroTelefonico,
          referencia3Observaciones: inputReferencia3Observaciones,
        };

        actualizarCandidato(actualizadoCandidato, true);
        router.push("/recursos-humanos/candidato/VerCandidatos");
      }
    });
  };

  const onDelete = () => {
    MySwal.fire({
      title: "¿Quieres eliminar a este candidato?",
      text: "Verifica los datos antes de la operación",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#002D46",
      cancelButtonColor: "#d33",
      confirmButtonText: "Borrar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        eliminarCandidato(candidato, true);
        router.push("/recursos-humanos/candidato/VerCandidatos");
      }
    });
  };

  return (
    <SidebarLayoutRecursosHumanos>
      <form>
        <div className="shadow sm:rounded-md sm:overflow-hidden">
          <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Candidato
              </h3>
              <p className="mt-1 text-sm text-gray-500">¡Hola!</p>
            </div>
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtDescripcionProducto"
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
                  htmlFor="TxtDescripcionProducto"
                  className="block text-sm font-medium text-gray-700"
                >
                  Puesto
                </label>
                <select
                  id="CmbPuesto"
                  name="CmbPuesto"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm rounded-md"
                  value={puesto}
                  onChange={onStatusChanged}
                  // onBlur={() => setTouched(true)}
                >
                  <option hidden>Selecciona un producto...</option>
                  {puestosValidos.map((puesto) => (
                    <option key={puesto} value={puesto}>
                      {puesto}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtDescripcionProducto"
                  className="block text-sm font-medium text-gray-700"
                >
                  Descripción y funciones de puesto
                </label>
                <input
                  type="text"
                  name="TxtDescripcionPuesto"
                  id="TxtDescripcionPuesto"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  value={inputDescripcionDelPuesto}
                  onChange={onInputValueChangedDescripcionDelPuesto}
                  // onBlur={() => setTouched(true)}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtDescripcionProducto"
                  className="block text-sm font-medium text-gray-700"
                >
                  Fecha de nacimiento
                </label>
                <input
                  type="date"
                  name="TxtFechaNacimiento"
                  id="TxtFechaNacimiento"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  value={inputFechaDeNacimiento}
                  onChange={onInputValueChangedFechaDeNacimiento}
                  // onBlur={() => setTouched(true)}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtDescripcionProducto"
                  className="block text-sm font-medium text-gray-700"
                >
                  Domicilio
                </label>
                <input
                  type="text"
                  name="TxtDomicilio"
                  id="TxtDomicilio"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  value={inputDomicilio}
                  onChange={onInputValueChangedDomicilio}
                  // onBlur={() => setTouched(true)}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtDescripcionProducto"
                  className="block text-sm font-medium text-gray-700"
                >
                  C.U.R.P.
                </label>
                <input
                  type="text"
                  name="TxtCurp"
                  id="TxtCurp"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  value={inputCurp}
                  onChange={onInputValueChangedCurp}
                  // onBlur={() => setTouched(true)}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtDescripcionProducto"
                  className="block text-sm font-medium text-gray-700"
                >
                  No. IMSS
                </label>
                <input
                  type="text"
                  name="TxtNoImss"
                  id="TxtNoImss"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  value={inputNoImss}
                  onChange={onInputValueChangedNoImss}
                  // onBlur={() => setTouched(true)}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtDescripcionProducto"
                  className="block text-sm font-medium text-gray-700"
                >
                  No. Carta de policía
                </label>
                <input
                  type="text"
                  name="TxtNoCartaPolicia"
                  id="TxtNoCartaPolicia"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  value={inputNoCartaDePolicia}
                  onChange={onInputValueChangedNoCartaDePolicia}
                  // onBlur={() => setTouched(true)}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtCelular"
                  className="block text-sm font-medium text-gray-700"
                >
                  Celular
                </label>
                <input
                  type="tel"
                  name="TxtCelular"
                  id="TxtCelular"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  value={inputCelular}
                  onChange={onInputValueChangedCelular}
                  // onBlur={() => setTouched(true)}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtContactoDeEmergencia"
                  className="block text-sm font-medium text-gray-700"
                >
                  Contacto de emergencia
                </label>
                <input
                  type="tel"
                  name="TxtContactoDeEmergencia"
                  id="TxtContactoDeEmergencia"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  value={inputContactoDeEmergencia}
                  onChange={onInputValueChangedContactoDeEmergencia}
                  // onBlur={() => setTouched(true)}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtCorreoElectronico"
                  className="block text-sm font-medium text-gray-700"
                >
                  Correo electrónico
                </label>
                <input
                  type="email"
                  name="TxtCorreoElectronico"
                  id="TxtCorreoElectronico"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  value={inputCorreoElectronico}
                  onChange={onInputValueChangedCorreoElectronico}
                  // onBlur={() => setTouched(true)}
                />
              </div>
            </div>

            <div className="shadow sm:rounded-md sm:overflow-hidden">
              <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
                <div>
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Referencias
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Nota: Obligatorio dos referencias y una opcional.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Referencia #1
                  </h3>
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
                      onChange={onInputValueChangedReferencia1Nombre}
                      value={inputReferencia1Nombre}
                      // onBlur={() => setTouched(true)}
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="TxtEmpresa"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Empresa
                    </label>
                    <input
                      type="text"
                      name="TxtEmpresa"
                      id="TxtEmpresa"
                      autoComplete="off"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                      onChange={onInputValueChangedReferencia1Empresa}
                      value={inputReferencia1Empresa}
                      // onBlur={() => setTouched(true)}
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="TxtNumeroTelefonico"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Número Télefonico
                    </label>
                    <input
                      type="email"
                      name="TxtNumeroTelefonico"
                      id="TxtNumeroTelefonico"
                      autoComplete="off"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                      onChange={onInputValueChangedReferencia1NumeroTelefonico}
                      value={inputReferencia1NumeroTelefonico}
                      // onBlur={() => setTouched(true)}
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="TxtObservaciones"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Observaciones
                    </label>
                    <input
                      type="email"
                      name="TxtObservaciones"
                      id="TxtObservaciones"
                      autoComplete="off"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                      onChange={onInputValueChangedReferencia1Observaciones}
                      value={inputReferencia1Observaciones}
                      // onBlur={() => setTouched(true)}
                    />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Referencia #2
                  </h3>
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
                      onChange={onInputValueChangedReferencia2Nombre}
                      value={inputReferencia2Nombre}
                      // onBlur={() => setTouched(true)}
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="TxtEmpresa"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Empresa
                    </label>
                    <input
                      type="text"
                      name="TxtEmpresa"
                      id="TxtEmpresa"
                      autoComplete="off"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                      onChange={onInputValueChangedReferencia2Empresa}
                      value={inputReferencia2Empresa}
                      // onBlur={() => setTouched(true)}
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="TxtNumeroTelefonico"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Número Télefonico
                    </label>
                    <input
                      type="email"
                      name="TxtNumeroTelefonico"
                      id="TxtNumeroTelefonico"
                      autoComplete="off"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                      onChange={onInputValueChangedReferencia2NumeroTelefonico}
                      value={inputReferencia2NumeroTelefonico}
                      // onBlur={() => setTouched(true)}
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="TxtObservaciones"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Observaciones
                    </label>
                    <input
                      type="email"
                      name="TxtObservaciones"
                      id="TxtObservaciones"
                      autoComplete="off"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                      onChange={onInputValueChangedReferencia2Observaciones}
                      value={inputReferencia2Observaciones}
                      // onBlur={() => setTouched(true)}
                    />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Referencia #3 (Opcional)
                  </h3>
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
                      onChange={onInputValueChangedReferencia3Nombre}
                      value={inputReferencia3Nombre}
                      // onBlur={() => setTouched(true)}
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="TxtEmpresa"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Empresa
                    </label>
                    <input
                      type="text"
                      name="TxtEmpresa"
                      id="TxtEmpresa"
                      autoComplete="off"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                      onChange={onInputValueChangedReferencia3Empresa}
                      value={inputReferencia3Empresa}
                      // onBlur={() => setTouched(true)}
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="TxtNumeroTelefonico"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Número Télefonico
                    </label>
                    <input
                      type="email"
                      name="TxtNumeroTelefonico"
                      id="TxtNumeroTelefonico"
                      autoComplete="off"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                      onChange={onInputValueChangedReferencia3NumeroTelefonico}
                      value={inputReferencia3NumeroTelefonico}
                      // onBlur={() => setTouched(true)}
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="TxtObservaciones"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Observaciones
                    </label>
                    <input
                      type="email"
                      name="TxtObservaciones"
                      id="TxtObservaciones"
                      autoComplete="off"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                      onChange={onInputValueChangedReferencia3Observaciones}
                      value={inputReferencia3Observaciones}
                      // onBlur={() => setTouched(true)}
                    />
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
    </SidebarLayoutRecursosHumanos>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params as { id: string };

  const candidato = await dbCandidato.getCandidatoById(id);

  if (!candidato) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      candidato,
    },
  };
};

export default CandidatoPage;

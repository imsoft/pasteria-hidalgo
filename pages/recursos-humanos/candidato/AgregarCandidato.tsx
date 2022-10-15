import { ChangeEvent, useContext, useState } from "react";
import { SidebarLayoutRecursosHumanos } from "../../../components/layouts/recursos-humanos/SidebarLayoutRecursosHumanos";
import { CandidatosContext } from "../../../context/recursos-humanos/candidatos";
import { PuestosEmpresa } from "../../../interfaces";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const puestosValidos: PuestosEmpresa[] = ["Administrador", "Chef", "Operador"];

export default function AgregarCandidato() {
  const { agregarNuevoCandidato } = useContext(CandidatosContext);

  const [inputNombre, setInputNombre] = useState("");
  const [inputPuesto, setInputPuesto] = useState("");
  const [inputDescripcionDelPuesto, setInputDescripcionDelPuesto] = useState("");
  const [inputFechaDeNacimiento, setInputFechaDeNacimiento] = useState("");
  const [inputDomicilio, setInputDomicilio] = useState("");
  const [inputCurp, setInputCurp] = useState("");
  const [inputNoImss, setInputNoImss] = useState("");
  const [inputNoCartaDePolicia, setInputNoCartaDePolicia] = useState("");
  const [inputCelular, setInputCelular] = useState("");
  const [inputContactoDeEmergencia, setInputContactoDeEmergencia] = useState("");
  const [inputCorreoElectronico, setInputCorreoElectronico] = useState("");

  const [inputReferencia1Nombre, setInputReferencia1Nombre] = useState("");
  const [inputReferencia1Empresa, setInputReferencia1Empresa] = useState("");
  const [inputReferencia1CorreoElectronico, setInputReferencia1CorreoElectronico] = useState("");
  const [inputReferencia2Nombre, setInputReferencia2Nombre] = useState("");
  const [inputReferencia2Empresa, setInputReferencia2Empresa] = useState("");
  const [inputReferencia2CorreoElectronico, setInputReferencia2CorreoElectronico] = useState("");
  const [inputReferencia3Nombre, setInputReferencia3Nombre] = useState("");
  const [inputReferencia3Empresa, setInputReferencia3Empresa] = useState("");
  const [inputReferencia3CorreoElectronico, setInputReferencia3CorreoElectronico] = useState("");

  const [touched, setTouched] = useState(false);

  const MySwal = withReactContent(Swal);

  const onTextFieldChangedNombre = (event: ChangeEvent<HTMLInputElement>) => {
    setInputNombre(event.target.value);
  };

  const onTextFieldChangedPuesto = (event: ChangeEvent<HTMLSelectElement>) => {
    setInputPuesto(event.target.value as PuestosEmpresa);
  };

  const onTextFieldChangedDescripcionDelPuesto = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputDescripcionDelPuesto(event.target.value);
  };

  const onTextFieldChangedFechaDeNacimiento = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputFechaDeNacimiento(event.target.value);
  };

  const onTextFieldChangedDomicilio = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputDomicilio(event.target.value);
  };

  const onTextFieldChangedCurp = (event: ChangeEvent<HTMLInputElement>) => {
    setInputCurp(event.target.value);
  };

  const onTextFieldChangedNoImss = (event: ChangeEvent<HTMLInputElement>) => {
    setInputNoImss(event.target.value);
  };

  const onTextFieldChangedNoCartaDePolicia = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputNoCartaDePolicia(event.target.value);
  };

  const onTextFieldChangedCelular = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputCelular(event.target.value);
  };

  const onTextFieldChangedContactoDeEmergencia = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputContactoDeEmergencia(event.target.value);
  };

  const onTextFieldChangedCorreoElectronico = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputCorreoElectronico(event.target.value);
  };

  const onTextFieldChangedReferencia1Nombre = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputReferencia1Nombre(event.target.value);
  };

  const onTextFieldChangedReferencia1Empresa = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputReferencia1Empresa(event.target.value);
  };

  const onTextFieldChangedReferencia1CorreoElectronico = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputReferencia1CorreoElectronico(event.target.value);
  };

  const onTextFieldChangedReferencia2Nombre = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputReferencia2Nombre(event.target.value);
  };

  const onTextFieldChangedReferencia2Empresa = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputReferencia2Empresa(event.target.value);
  };

  const onTextFieldChangedReferencia2CorreoElectronico = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputReferencia2CorreoElectronico(event.target.value);
  };

  const onTextFieldChangedReferencia3Nombre = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputReferencia3Nombre(event.target.value);
  };

  const onTextFieldChangedReferencia3Empresa = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputReferencia3Empresa(event.target.value);
  };

  const onTextFieldChangedReferencia3CorreoElectronico = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputReferencia3CorreoElectronico(event.target.value);
  };

  const onSave = () => {
    if (
      inputNombre.length === 0 &&
      inputPuesto.length === 0 &&
      inputDescripcionDelPuesto.length === 0 &&
      inputFechaDeNacimiento.length === 0 &&
      inputDomicilio.length === 0 &&
      inputCurp.length === 0 &&
      inputNoImss.length === 0 &&
      inputNoCartaDePolicia.length === 0 &&
      inputCelular.length === 0 &&
      inputContactoDeEmergencia.length === 0 &&
      inputCorreoElectronico.length === 0 &&
      inputReferencia1Nombre.length === 0 &&
      inputReferencia1Empresa.length === 0 &&
      inputReferencia1CorreoElectronico.length === 0 &&
      inputReferencia2Nombre.length === 0 &&
      inputReferencia2Empresa.length === 0 &&
      inputReferencia2CorreoElectronico.length === 0 &&
      inputReferencia3Nombre.length === 0 &&
      inputReferencia3Empresa.length === 0 &&
      inputReferencia3CorreoElectronico.length === 0
    )
      return;

    agregarNuevoCandidato(
      inputNombre,
      inputPuesto,
      inputDescripcionDelPuesto,
      inputFechaDeNacimiento,
      inputDomicilio,
      inputCurp,
      inputNoImss,
      inputNoCartaDePolicia,
      inputCelular,
      inputContactoDeEmergencia,
      inputCorreoElectronico,
      inputReferencia1Nombre,
      inputReferencia1Empresa,
      inputReferencia1CorreoElectronico,
      inputReferencia2Nombre,
      inputReferencia2Empresa,
      inputReferencia2CorreoElectronico,
      inputReferencia3Nombre,
      inputReferencia3Empresa,
      inputReferencia3CorreoElectronico,
      true
    );

    MySwal.fire({
      position: "top-end",
      icon: "success",
      title: "Candidato Agregado",
      showConfirmButton: false,
      timer: 5000,
    });

    setTouched(false);
    setInputNombre("");
    setInputPuesto("");
    setInputDescripcionDelPuesto("");
    setInputFechaDeNacimiento("");
    setInputDomicilio("");
    setInputCurp("");
    setInputNoImss("");
    setInputNoCartaDePolicia("");
    setInputCelular("");
    setInputContactoDeEmergencia("");
    setInputCorreoElectronico("");

    setInputReferencia1Nombre("");
    setInputReferencia1Empresa("");
    setInputReferencia1CorreoElectronico("");
    setInputReferencia2Nombre("");
    setInputReferencia2Empresa("");
    setInputReferencia2CorreoElectronico("");
    setInputReferencia3Nombre("");
    setInputReferencia3Empresa("");
    setInputReferencia3CorreoElectronico("");
  };

  return (
    <SidebarLayoutRecursosHumanos>
      <form>
        <div className="shadow sm:rounded-md sm:overflow-hidden">
          <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Agregar Candidato
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
                  onChange={onTextFieldChangedNombre}
                  onBlur={() => setTouched(true)}
                />
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
                  <option>Seleccione el puesto...</option>
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
                  onChange={onTextFieldChangedDescripcionDelPuesto}
                  onBlur={() => setTouched(true)}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtFechaDeNacimiento"
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
                  onChange={onTextFieldChangedFechaDeNacimiento}
                  onBlur={() => setTouched(true)}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtDomicilio"
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
                  onChange={onTextFieldChangedDomicilio}
                  onBlur={() => setTouched(true)}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtCurp"
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
                  onChange={onTextFieldChangedCurp}
                  onBlur={() => setTouched(true)}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtNoImss"
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
                  onChange={onTextFieldChangedNoImss}
                  onBlur={() => setTouched(true)}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtNoCartaPolicia"
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
                  onChange={onTextFieldChangedNoCartaDePolicia}
                  onBlur={() => setTouched(true)}
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
                  onChange={onTextFieldChangedCelular}
                  onBlur={() => setTouched(true)}
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
                  onChange={onTextFieldChangedContactoDeEmergencia}
                  onBlur={() => setTouched(true)}
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
                  onChange={onTextFieldChangedCorreoElectronico}
                  onBlur={() => setTouched(true)}
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
                      onChange={onTextFieldChangedReferencia1Nombre}
                      onBlur={() => setTouched(true)}
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
                      onChange={onTextFieldChangedReferencia1Empresa}
                      onBlur={() => setTouched(true)}
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="TxtNumeroTelefonico"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Número Teléfonico
                    </label>
                    <input
                      type="tel"
                      name="TxtNumeroTelefonico"
                      id="TxtNumeroTelefonico"
                      autoComplete="off"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                      onChange={onTextFieldChangedReferencia1CorreoElectronico}
                      onBlur={() => setTouched(true)}
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
                      onChange={onTextFieldChangedReferencia2Nombre}
                      onBlur={() => setTouched(true)}
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
                      onChange={onTextFieldChangedReferencia2Empresa}
                      onBlur={() => setTouched(true)}
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="TxtNumeroTelefonico"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Número Teléfonico
                    </label>
                    <input
                      type="tel"
                      name="TxtNumeroTelefonico"
                      id="TxtNumeroTelefonico"
                      autoComplete="off"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                      onChange={onTextFieldChangedReferencia2CorreoElectronico}
                      onBlur={() => setTouched(true)}
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
                      onChange={onTextFieldChangedReferencia3Nombre}
                      onBlur={() => setTouched(true)}
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
                      onChange={onTextFieldChangedReferencia3Empresa}
                      onBlur={() => setTouched(true)}
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="TxtNumeroTelefonico"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Número Teléfonico
                    </label>
                    <input
                      type="tel"
                      name="TxtNumeroTelefonico"
                      id="TxtNumeroTelefonico"
                      autoComplete="off"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                      onChange={onTextFieldChangedReferencia3CorreoElectronico}
                      onBlur={() => setTouched(true)}
                    />
                  </div>
                </div>

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

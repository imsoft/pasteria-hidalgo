import { ChangeEvent, useContext, useState } from "react";
import { SidebarLayoutRecursosHumanos } from "../../../components/layouts/recursos-humanos/SidebarLayoutRecursosHumanos";
import { CandidatosContext } from "../../../context/recursos-humanos/candidatos";

export default function AgregarCandidato() {
  const { agregarNuevoCandidato } = useContext(CandidatosContext);

  const [inputNombre, setInputNombre] = useState("");
  const [inputPuesto, setInputPuesto] = useState("");
  const [inputDescripcionDelPuesto, setInputDescripcionDelPuesto] =
    useState("");
  const [inputFechaDeNacimiento, setInputFechaDeNacimiento] = useState("");
  const [inputDomicilio, setInputDomicilio] = useState("");
  const [inputCurp, setInputCurp] = useState("");
  const [inputNoImss, setInputNoImss] = useState("");
  const [inputNoCartaDePolicia, setInputNoCartaDePolicia] = useState("");

  const [touched, setTouched] = useState(false);

  // const onTextFieldChanged = (event: ChangeEvent<HTMLInputElement>) => {
  //   console.log( event.target.value );
  // };

  const onTextFieldChangedNombre = (event: ChangeEvent<HTMLInputElement>) => {
    setInputNombre(event.target.value);
  };

  const onTextFieldChangedPuesto = (event: ChangeEvent<HTMLSelectElement>) => {
    setInputPuesto(event.target.value);
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

  const onSave = () => {
    if (
      inputNombre.length === 0 &&
      inputPuesto.length === 0 &&
      inputDescripcionDelPuesto.length === 0 &&
      inputFechaDeNacimiento.length === 0 &&
      inputDomicilio.length === 0 &&
      inputCurp.length === 0 &&
      inputNoImss.length === 0 &&
      inputNoCartaDePolicia.length === 0
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
      inputNoCartaDePolicia
    );

    setTouched(false);
    setInputNombre("");
    setInputPuesto("");
    setInputDescripcionDelPuesto("");
    setInputFechaDeNacimiento("");
    setInputDomicilio("");
    setInputCurp("");
    setInputNoImss("");
    setInputNoCartaDePolicia("");
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
                  onChange={onTextFieldChangedNombre}
                  onBlur={() => setTouched(true)}
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
                  defaultValue="Selecciona un producto..."
                  onChange={onTextFieldChangedPuesto}
                  onBlur={() => setTouched(true)}
                >
                  <option>Seleccione el puesto...</option>
                  <option>Operador</option>
                  <option>Chef</option>
                  <option>Administrador</option>
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
                  onChange={onTextFieldChangedFechaDeNacimiento}
                  onBlur={() => setTouched(true)}
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
                  onChange={onTextFieldChangedDomicilio}
                  onBlur={() => setTouched(true)}
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
                  onChange={onTextFieldChangedCurp}
                  onBlur={() => setTouched(true)}
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
                  onChange={onTextFieldChangedNoImss}
                  onBlur={() => setTouched(true)}
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
                  onChange={onTextFieldChangedNoCartaDePolicia}
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
    </SidebarLayoutRecursosHumanos>
  );
}

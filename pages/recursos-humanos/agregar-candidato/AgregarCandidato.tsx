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

  const onTextFieldChanged = (event: ChangeEvent<HTMLInputElement>) => {
    // console.log( event.target.value );
    setInputNombre(event.target.value);
    setInputPuesto(event.target.value);
    setInputDescripcionDelPuesto(event.target.value);
    setInputFechaDeNacimiento(event.target.value);
    setInputDomicilio(event.target.value);
    setInputCurp(event.target.value);
    setInputNoImss(event.target.value);
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
                  onChange={onTextFieldChanged}
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
                  onChange={onTextFieldChanged}
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
                  onChange={onTextFieldChanged}
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
                  onChange={onTextFieldChanged}
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
                  onChange={onTextFieldChanged}
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
                  onChange={onTextFieldChanged}
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
                  onChange={onTextFieldChanged}
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

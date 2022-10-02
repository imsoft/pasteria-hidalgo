import { useRouter } from 'next/router';
import { ChangeEvent, useContext, useState, useReducer } from 'react';
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { SidebarLayoutGerenciaCompras } from "../../../components/layouts/gerencia-de-compras/SidebarLayoutGerenciaCompras";
import { ProveedoresContext } from "../../../context/gerencia-de-compras/manejoDeProveedores/ManejoDeProveedoresContext";

export default function ManejoDeProveedores() {

  const router = useRouter();

  const { agregarNuevoProveedor } = useContext(ProveedoresContext);

  const [inputNombre, setInputNombre] = useState("");
  const [inputDireccion, setInputDireccion] = useState("");
  const [inputTelefono, setInputTelefono] = useState("");
  const [inputHorarioAtencion, setInputHorarioAtencion] = useState("");
  const [inputProductosQueSeCompran, setInputProductosQueSeCompran] = useState("");
  const [inputEntregasADomicilio, setInputEntregasADomicilio] = useState("");

  const [touched, setTouched] = useState(false);

  const MySwal = withReactContent(Swal);

  const onTextFieldChangedNombre = (event: ChangeEvent<HTMLInputElement>) => {
    setInputNombre(event.target.value);
  };

  const onTextFieldChangedDireccion = (event: ChangeEvent<HTMLInputElement>) => {
    setInputDireccion(event.target.value);
  };

  const onTextFieldChangedTelefono = (event: ChangeEvent<HTMLInputElement>) => {
    setInputTelefono(event.target.value);
  };

  const onTextFieldChangedHorarioAtencion = (event: ChangeEvent<HTMLInputElement>) => {
    setInputHorarioAtencion(event.target.value);
  };

  const onTextFieldChangedProductosQueSeCompran = (event: ChangeEvent<HTMLSelectElement>) => {
    setInputProductosQueSeCompran(event.target.value);
  };

  const onTextFieldChangedEntregasADomicilio = (event: ChangeEvent<HTMLSelectElement>) => {
    setInputEntregasADomicilio(event.target.value);
  };

  const onSave = () => {
    if (
      inputNombre.length === 0 &&
      inputDireccion.length === 0 &&
      inputTelefono.length === 0 &&
      inputHorarioAtencion.length === 0
      // inputProductosQueSeCompran.length === 0 &&
      // inputEntregasADomicilio.length === 0
    )
    return;

    agregarNuevoProveedor(
      inputNombre,
      inputDireccion,
      inputTelefono,
      inputHorarioAtencion,
      inputProductosQueSeCompran,
      inputEntregasADomicilio,
      true
    );

    MySwal.fire({
      position: "top-end",
      icon: "success",
      title: "Proveedor Agregado",
      showConfirmButton: false,
      timer: 2000,
    });

    router.push("/gerencia-de-compras/proveedores/VerProveedores");

    setTouched(false);
    setInputNombre("");
    setInputDireccion("");
    setInputTelefono("");
    setInputHorarioAtencion("");
    setInputProductosQueSeCompran("");
    setInputEntregasADomicilio("");
  };

  return (
    <SidebarLayoutGerenciaCompras>
      <form>
        <div className="shadow sm:rounded-md sm:overflow-hidden">
          <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Manejo de proveedores
              </h3>
              {/* <p className="mt-1 text-sm text-gray-500">¡Hola!</p> */}
            </div>

            <div className="grid grid-cols-6 gap-6">

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtNombre"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nombre&#40;s&#41;
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
                  onChange={onTextFieldChangedDireccion}
                  onBlur={() => setTouched(true)}
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
                  type="tel"
                  name="TxtTelefono"
                  id="TxtTelefono"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  onChange={onTextFieldChangedTelefono}
                  onBlur={() => setTouched(true)}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtHorarioDeAtencion"
                  className="block text-sm font-medium text-gray-700"
                >
                  Horario de atención
                </label>
                <input
                  type="time"
                  name="TxtHorarioDeAtencion"
                  id="TxtHorarioDeAtencion"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  onChange={onTextFieldChangedHorarioAtencion}
                  onBlur={() => setTouched(true)}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtTiposDeProductosQueSeCompran"
                  className="block text-sm font-medium text-gray-700"
                >
                  Tipos de productos que se compran
                </label>
                <select
                  id="CmbTiposDeProductosQueSeCompran"
                  name="CmbTiposDeProductosQueSeCompran"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm rounded-md"
                  onChange={onTextFieldChangedProductosQueSeCompran}
                  onBlur={() => setTouched(true)}
                  defaultValue="Selecciona un producto..."
                >
                  <option>Selecciona un producto...</option>
                  <option>Masa</option>
                  <option>Fresas</option>
                  <option>Leche</option>
                </select>
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtTiposDeProductosQueSeCompran"
                  className="block text-sm font-medium text-gray-700"
                >
                  ¿Entrega a domicilio?
                </label>
                <select
                  id="CmbTiposDeProductosQueSeCompran"
                  name="CmbTiposDeProductosQueSeCompran"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm rounded-md"
                  onChange={onTextFieldChangedEntregasADomicilio}
                  onBlur={() => setTouched(true)}
                  defaultValue="Selecciona un producto..."
                >
                  <option>Selecciona una opción...</option>
                  <option>Si</option>
                  <option>No</option>
                </select>
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
    </SidebarLayoutGerenciaCompras>
  );
}

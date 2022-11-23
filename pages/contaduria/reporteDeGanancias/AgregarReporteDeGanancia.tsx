import { SidebarLayoutContaduria } from "../../../components/layouts/contaduria/SidebarLayoutContaduria";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function ReporteGanancias() {
  const MySwal = withReactContent(Swal);

  const onSave = () => {
    MySwal.fire({
      position: "top-end",
      icon: "success",
      title: "Reporte de ganancia Agregado",
      showConfirmButton: false,
      timer: 2000,
    });
  };

  return (
    <SidebarLayoutContaduria>
      <form>
        <div className="shadow sm:rounded-md sm:overflow-hidden">
          <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Reporte de ganancias
              </h3>
              <p className="mt-1 text-sm text-gray-500">¡Hola!</p>
            </div>
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="CmbReporteDeEntrada"
                  className="block text-sm font-medium text-gray-700"
                >
                  Reporte de entrada
                </label>
                <select
                  id="CmbReporteDeEntrada"
                  name="CmbReporteDeEntrada"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm rounded-md"
                  // onChange={onTextFieldChangedUnidades}
                  // onBlur={() => setTouched(true)}
                  defaultValue="Selecciona un producto..."
                >
                  <option>Selecciona una opción...</option>

                  <option>Reporte de entrada #1</option>
                  <option>Reporte de entrada #2</option>
                  <option>Reporte de entrada #3</option>
                </select>
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="CmbReporteDeSalida"
                  className="block text-sm font-medium text-gray-700"
                >
                  Reporte de salida
                </label>
                <select
                  id="CmbReporteDeSalida"
                  name="CmbReporteDeSalida"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm rounded-md"
                  // onChange={onTextFieldChangedUnidades}
                  // onBlur={() => setTouched(true)}
                  defaultValue="Selecciona un producto..."
                >
                  <option>Selecciona una opción...</option>

                  <option>Reporte de salida #1</option>
                  <option>Reporte de salida #2</option>
                  <option>Reporte de salida #3</option>
                </select>
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
    </SidebarLayoutContaduria>
  );
}

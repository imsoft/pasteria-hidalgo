import { ChangeEvent, useContext, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useRouter } from "next/router";
import { MateriasPrimasContext } from "../../../context/gerencia-operativa/materiaPrima/MateriaPrimaContext";
import { Temperatura, Unidades } from "../../../interfaces";
import { SidebarLayoutGerenciaOperativa } from "../../../components/layouts/gerencia-operativa/SidebarLayoutGerenciaOperativa";

const validTemperature: Temperatura[] = [
  "Ambiente",
  "Refrigerado",
  "Congelado",
];

const validUnits: Unidades[] = ["Gramos", "Kilogramos", "Mililitros", "Litros"];

export default function AgregarMateriaPrima() {
  const router = useRouter();
  const { agregarNuevaMateriaPrima } = useContext(MateriasPrimasContext);

  const [inputMateriaPrima, setInputMateriaPrima] = useState("");
  const [inputUnidades, setInputUnidades] = useState("");
  const [inputTemperatura, setInputTemperatura] = useState("");

  const [touched, setTouched] = useState(false);

  const MySwal = withReactContent(Swal);

  const onTextFieldChangedMateriaPrima = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputMateriaPrima(event.target.value);
  };

  const onTextFieldChangedUnidades = (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    setInputUnidades(event.target.value as Unidades);
  };

  const onTextFieldChangedTemperatura = (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    setInputTemperatura(event.target.value as Temperatura);
  };

  const onSave = () => {
    if (
      inputMateriaPrima.length === 0 &&
      inputUnidades.length === 0 &&
      inputTemperatura.length === 0
    )
      return;

    agregarNuevaMateriaPrima(
      inputMateriaPrima,
      inputUnidades,
      inputTemperatura,
      true
    );

    MySwal.fire({
      position: "top-end",
      icon: "success",
      title: "Materia prima Agregada",
      showConfirmButton: false,
      timer: 5000,
    });

    router.push("/gerencia-operativa/materiaPrima/VerMateriaPrima");

    setTouched(false);
    setInputMateriaPrima("");
    setInputUnidades("");
    setInputTemperatura("");
  };

  return (
    <SidebarLayoutGerenciaOperativa>
      <form>
        <div className="shadow sm:rounded-md sm:overflow-hidden">
          <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Materia Prima
              </h3>
              <p className="mt-1 text-sm text-gray-500">¡Hola!</p>
            </div>
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="TxtNombreMateriaPrima"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nombre Materia Prima
                </label>
                <input
                  type="text"
                  name="TxtNombreMateriaPrima"
                  id="TxtNombreMateriaPrima"
                  autoComplete="off"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm"
                  onChange={onTextFieldChangedMateriaPrima}
                  onBlur={() => setTouched(true)}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="CmbTemperatura"
                  className="block text-sm font-medium text-gray-700"
                >
                  Temperatura
                </label>
                <select
                  id="CmbTemperatura"
                  name="CmbTemperatura"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm rounded-md"
                  defaultValue="Selecciona un producto..."
                  onChange={onTextFieldChangedTemperatura}
                  onBlur={() => setTouched(true)}
                >
                  <option hidden>Seleccione la temperatura...</option>
                  {validTemperature.map((temperatura) => (
                    <option key={temperatura} value={temperatura}>
                      {temperatura}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="CmbUnidades"
                  className="block text-sm font-medium text-gray-700"
                >
                  Unidades
                </label>
                <select
                  id="CmbUnidades"
                  name="CmbUnidades"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-yellow focus:border-primary-yellow sm:text-sm rounded-md"
                  defaultValue="Selecciona un producto..."
                  onChange={onTextFieldChangedUnidades}
                  onBlur={() => setTouched(true)}
                >
                  <option hidden>Seleccione la unidad...</option>
                  {validUnits.map((unidad) => (
                    <option key={unidad} value={unidad}>
                      {unidad}
                    </option>
                  ))}
                </select>
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
        </div>
      </form>
    </SidebarLayoutGerenciaOperativa>
  );
}

import { ChangeEvent, FC, useContext, useState } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Temperatura, Unidades } from "../../../interfaces";
import { MateriaPrima } from "../../../interfaces/materiaPrima";
import { MateriasPrimasContext } from "../../../context/gerencia-operativa/materiaPrima/MateriaPrimaContext";
import { SidebarLayoutGerenciaOperativa } from "../../../components/layouts/gerencia-operativa/SidebarLayoutGerenciaOperativa";
import { dbMateriaPrima } from "../../../database";

const validTemperature: Temperatura[] = [
  "Ambiente",
  "Refrigerado",
  "Congelado",
];

const validUnits: Unidades[] = [
  "Gramos",
  "Kilogramos",
  "Mililitros",
  "Litros",
  "Por pieza",
];

interface Props {
  materiaPrima: MateriaPrima;
}

export const MateriaPrimaPage: FC<Props> = ({ materiaPrima }) => {
  const router = useRouter();

  const { actualizarMateriaPrima, eliminarMateriaPrima } = useContext(
    MateriasPrimasContext
  );

  const [inputMateriaPrima, setInputMateriaPrima] = useState(
    materiaPrima.materiaPrima
  );
  const [inputUnidades, setInputUnidades] = useState<Unidades>(
    materiaPrima.unidades
  );
  const [inputTemperatura, setInputTemperatura] = useState<Temperatura>(
    materiaPrima.temperatura
  );

  const MySwal = withReactContent(Swal);

  const onInputValueChangedMateriaPrima = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputMateriaPrima(event.target.value);
  };

  const onInputValueChangedUnidades = (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    setInputUnidades(event.target.value as Unidades);
  };

  const onInputValueChangedTemperatura = (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    setInputTemperatura(event.target.value as Temperatura);
  };

  const onSave = () => {
    if (
      inputMateriaPrima.trim().length === 0 &&
      inputUnidades.trim().length === 0 &&
      inputTemperatura.trim().length === 0
    )
      return;

    MySwal.fire({
      title: "¿Quieres actualizar la información a esta materia prima?",
      text: "Verifica los datos antes de la operación",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#FFCC33",
      cancelButtonColor: "#d33",
      confirmButtonText: "Actualizar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        const actualizadoMateriaPrima: MateriaPrima = {
          ...materiaPrima,
          materiaPrima: inputMateriaPrima,
          unidades: inputUnidades,
          temperatura: inputTemperatura,
        };

        actualizarMateriaPrima(actualizadoMateriaPrima, true);
        router.push("/gerencia-operativa/materiaPrima/VerMateriaPrima");
      }
    });
  };

  const onDelete = () => {
    MySwal.fire({
      title: "¿Quieres eliminar a esta materia prima?",
      text: "Verifica los datos antes de la operación",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#002D46",
      cancelButtonColor: "#d33",
      confirmButtonText: "Borrar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        eliminarMateriaPrima(materiaPrima, true);
        router.push("/gerencia-operativa/materiaPrima/VerMateriaPrima");
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
                  value={inputMateriaPrima}
                  onChange={onInputValueChangedMateriaPrima}
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
                  value={inputTemperatura}
                  onChange={onInputValueChangedTemperatura}
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
                  value={inputUnidades}
                  onChange={onInputValueChangedUnidades}
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

  const materiaPrima = await dbMateriaPrima.getMateriaPrimaById(id);

  if (!materiaPrima) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      materiaPrima,
    },
  };
};

export default MateriaPrimaPage;

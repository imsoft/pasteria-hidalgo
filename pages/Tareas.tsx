import React from "react";
import { SidebarLayout } from "../components/layouts/SidebarLayout";

const Tareas = () => {
  return (
    <>
      <SidebarLayout>
        <div className="container mx-auto">
          {/* Gerencia de compras */}
          <h2 className="text-2xl text-green-600 font-bold mt-5">
            —Gerencia de compras—
          </h2>
          <h3 className="text-xl font-bold mt-5">Reporte de compra</h3>
          <ul className="list-disc mt-5">
            <label>
              <input type="checkbox" className="accent-green-200" /> - Sumatoria
              en reporte de compra.
            </label>
            <br />
            <label>
              <input type="checkbox" className="accent-green-200" /> - Arreglar
              diseño al ver reporte de compra.
            </label>
            <br />
          </ul>

          <h3 className="text-xl font-bold mt-5">
            Acondicionamiento de sucursales
          </h3>
          <ul className="list-disc mt-5">
            <label>
              <input type="checkbox" className="accent-green-200" checked /> -
              Corregir las sucursales y franquicias.
            </label>
            <br />
          </ul>

          {/* Gerencia de ventas */}
          <h2 className="text-2xl text-green-600 font-bold mt-5">
            —Gerencia de compras—
          </h2>
          <h3 className="text-xl font-bold mt-5">Cliente frecuente</h3>
          <ul className="list-disc mt-5">
            <label>
              <input type="checkbox" className="accent-green-200" checked /> -
              Agregar sucursal o franquicia.
            </label>
          </ul>

          <h3 className="text-xl font-bold mt-5">
            Reporte de ventas ambulantes
          </h3>
          <ul className="list-disc mt-5">
            <label>
              <input type="checkbox" className="accent-green-200" /> ✅ - Clonar
              reporte de ventas individual en reporte de ventas ambulantes
              individual y quitar especificación del lugar de evento del clon.
              (Corregir bugs)
            </label>
          </ul>

          <h3 className="text-xl font-bold mt-5">
            Reporte de ventas ambulantes general
          </h3>
          <ul className="list-disc mt-5">
            <label>
              <input type="checkbox" className="accent-green-200" checked /> -
              Eliminarlo
            </label>
          </ul>

          <h3 className="text-xl font-bold mt-5">
            Reporte de ventas individual
          </h3>
          <ul className="list-disc mt-5">
            <label>
              <input type="checkbox" className="accent-green-200" checked /> -
              Preguntar al cliente frecuente si quiere usar sus puntos o no.
            </label>
          </ul>

          {/* Gerencia operativa */}
          <h2 className="text-2xl text-green-600 font-bold mt-5">
            —Gerencia operativa—
          </h2>

          <h3 className="text-xl font-bold mt-5">Sucursal o franquicia</h3>
          <ul className="list-disc mt-5">
            <label>
              <input type="checkbox" className="accent-green-200" checked /> -
              Quitar la lista y solo dejar el cuadro de texto.
            </label>
            <br />

            <label>
              <input type="checkbox" className="accent-green-200" /> - Agregar
              pestaña del pago según el presupuesto.
            </label>
            <br />
          </ul>

          <h3 className="text-xl font-bold mt-5">Personal de mantenimiento</h3>
          <ul className="list-disc mt-5">
            <label>
              <input type="checkbox" className="accent-green-200" checked /> -
              Quitar la lista y solo dejar el cuadro de texto.
            </label>
            <br />

            <label>
              <input type="checkbox" className="accent-green-200" /> - Agregar
              pestaña del pago según el presupuesto.
            </label>
            <br />
          </ul>

          <h3 className="text-xl font-bold mt-5">Mantenimiento</h3>
          <ul className="list-disc mt-5">
            <label>
              <input type="checkbox" className="accent-green-200" checked /> -
              Agregar la sucursal o franquicia.
            </label>
            <br />
          </ul>

          <h3 className="text-xl font-bold mt-5">Reporte de salida</h3>
          <ul className="list-disc mt-5">
            <label>
              <input type="checkbox" className="accent-green-200" /> ✅ - Quitar
              desde masa hasta temperatura de relleno.
            </label>
            <br />

            <label>
              <input type="checkbox" className="accent-green-200" /> ✅ -
              Agregar lista de paste de salado, dulce y otros, junto con la
              cantidad.
            </label>
            <br />

            <label>
              <input type="checkbox" className="accent-green-200" /> - Quitar
              todo lo de producto extra
            </label>
            <br />

            <label>
              <input type="checkbox" className="accent-green-200" /> - Agregar
              otra opción a tipo de producto que diga "Extra"
            </label>
            <br />

            <label>
              <input type="checkbox" className="accent-green-200" /> - Si se
              seleccionar "Extra" que aparezca una caja de texto
            </label>
            <br />

            <label>
              <input type="checkbox" className="accent-green-200" /> - Agregar
              una lista como en ventas individual
            </label>
            <br />
          </ul>

          {/* Contaduria */}
          <h2 className="text-2xl text-green-600 font-bold mt-5">
            —Contaduria—
          </h2>

          <h3 className="text-xl font-bold mt-5">Asignar comisiones</h3>
          <ul className="list-disc mt-5">
            <label>
              <input type="checkbox" className="accent-green-200" /> - Por
              sucursal o franquicia, mínimo de la meta y si ya se alcanzó o no.
            </label>
            <br />
          </ul>

          <h3 className="text-xl font-bold mt-5">Inventario</h3>
          <ul className="list-disc mt-5">
            <label>
              <input type="checkbox" className="accent-green-200" /> - Ver
              inventarios.
            </label>
            <br />
          </ul>

          <h3 className="text-xl font-bold mt-5">Asignar precios</h3>
          <ul className="list-disc mt-5">
            <label>
              <input type="checkbox" className="accent-green-200" checked /> -
              Solo ver el precio máximo.
            </label>
            <br />
          </ul>

          <h3 className="text-xl font-bold mt-5">Reporte de ganancias</h3>
          <ul className="list-disc mt-5">
            <label>
              <input type="checkbox" className="accent-green-200" /> - Se
              comprara con el reporte de entrada con las ventas del mes, según
              las sucursales y franquicias y de todas las sucursales.
            </label>
            <br />
          </ul>

          <h3 className="text-xl font-bold mt-5">Reportes de ventas</h3>
          <ul className="list-disc mt-5">
            <label>
              <input type="checkbox" className="accent-green-200" checked /> -
              Ver reportes de ventas.
            </label>
            <br />
          </ul>

          <h3 className="text-xl font-bold mt-5">Check In</h3>
          <ul className="list-disc mt-5">
            <label>
              <input type="checkbox" className="accent-green-200" checked /> -
              Ver la lista.
            </label>
            <br />
          </ul>

          <h3 className="text-xl font-bold mt-5">Asignar precios</h3>
          <ul className="list-disc mt-5">
            <label>
              <input type="checkbox" className="accent-green-200" /> -
              CRUD de precio máximo
            </label>
            <br />
          </ul>

          {/* Miscelaneos */}
          <h2 className="text-2xl text-green-600 font-bold mt-5">
            -Miscelaneos—
          </h2>
          <h3 className="text-xl font-bold mt-5">Caja registradora</h3>
          <ul className="list-disc mt-5">
            <label>
              <input type="checkbox" className="accent-green-200" /> - Ver caja
              registradora
            </label>
            <br />
          </ul>
        </div>
      </SidebarLayout>
    </>
  );
};

export default Tareas;

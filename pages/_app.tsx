import { ReactElement, ReactNode, Suspense, lazy } from "react";
import { NextPage } from "next";
import { AppProps } from "next/app";

// Contaduria

import { AsignarComisionProvider } from "../context/contaduria/asignarComision";
import { ReporteDeGananciaProvider } from "../context/contaduria/reporteDeGanancia";

// Gerencia de compras

import { AcondicionamientoDeSucursalesProvider } from "../context/gerencia-de-compras/acondicionamientoDeSucursales";
import { AsignarPreciosProvider } from "../context/gerencia-de-compras/asignarPrecios";
import { ProductosYaCompradosProvider } from "../context/gerencia-de-compras/productosYaComprados/ProductosYaCompradosProvider";
import { ProveedoresProvider } from "../context/gerencia-de-compras/manejoDeProveedores";
import { ReportesDeComprasProvider } from "../context/gerencia-de-compras/reporteDeCompras";
import { ReporteVentasAmbulantesIndividualProvider } from "../context/gerencia-de-ventas/reporteVentasAmbulantesIndividual";

// Gerencia de ventas

import { ClientesFrecuentesProvider } from "../context/gerencia-de-ventas/clienteFrecuente";
import { ReportesVentasIndividualProvider } from "../context/gerencia-de-ventas/reporteVentasIndividual";

// Gerencia operativa

import { ApartadosJuridicosProvider } from "../context/gerencia-operativa/apartadoJuridico";
import { ManejosDePersonalProvider } from "../context/gerencia-operativa/manejoDePersonal";
import { MantenimientosProvider } from "../context/gerencia-operativa/mantenimiento";
import { PersonalesDeMantenimientoProvider } from "../context/gerencia-operativa/personalDeMantenimiento/PersonalDeMantenimientoProvider";
import { ReportesDeSalidaProvider } from "../context/gerencia-operativa/reporteDeSalida";
import { SucursalesYFranquiciasProvider } from "../context/gerencia-operativa/sucursalYFranquicia";
import { MateriasPrimasProvider } from "../context/gerencia-operativa/materiaPrima";
import { ManejosDeAlmacenProvider } from "../context/gerencia-operativa/manejoDeAlmacen";

// Recursos Humanos

import { CandidatosProvider } from "../context/recursos-humanos/candidatos";
import { ChecksInPersonalProvider } from "../context/recursos-humanos/checkInPersonal";
import { PersonalActivoProvider } from "../context/recursos-humanos/personalActivo";

// Miscelaneos

import "../styles/globals.css";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => page);
  return getLayout(
    <Suspense fallback={<div>Loading...</div>}>
      <CandidatosProvider>
        <ChecksInPersonalProvider>
          <ClientesFrecuentesProvider>
            <ManejosDePersonalProvider>
              <PersonalActivoProvider>
                <ProductosYaCompradosProvider>
                  <ProveedoresProvider>
                    <ReportesDeComprasProvider>
                      <SucursalesYFranquiciasProvider>
                        <AcondicionamientoDeSucursalesProvider>
                          <AsignarPreciosProvider>
                            <ApartadosJuridicosProvider>
                              <ReportesDeSalidaProvider>
                                <MantenimientosProvider>
                                  <PersonalesDeMantenimientoProvider>
                                    <ReportesVentasIndividualProvider>
                                      <MateriasPrimasProvider>
                                        <ReporteVentasAmbulantesIndividualProvider>
                                          <AsignarComisionProvider>
                                            <ManejosDeAlmacenProvider>
                                              <ReporteDeGananciaProvider>
                                                <Component {...pageProps} />
                                              </ReporteDeGananciaProvider>
                                            </ManejosDeAlmacenProvider>
                                          </AsignarComisionProvider>
                                        </ReporteVentasAmbulantesIndividualProvider>
                                      </MateriasPrimasProvider>
                                    </ReportesVentasIndividualProvider>
                                  </PersonalesDeMantenimientoProvider>
                                </MantenimientosProvider>
                              </ReportesDeSalidaProvider>
                            </ApartadosJuridicosProvider>
                          </AsignarPreciosProvider>
                        </AcondicionamientoDeSucursalesProvider>
                      </SucursalesYFranquiciasProvider>
                    </ReportesDeComprasProvider>
                  </ProveedoresProvider>
                </ProductosYaCompradosProvider>
              </PersonalActivoProvider>
            </ManejosDePersonalProvider>
          </ClientesFrecuentesProvider>
        </ChecksInPersonalProvider>
      </CandidatosProvider>
    </Suspense>
  );
}

export default MyApp;

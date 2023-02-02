import { ReactElement, ReactNode } from "react";
import { NextPage } from "next";
import { AppProps } from "next/app";

// Contaduria

// Gerencia de compras

import { AcondicionamientoDeSucursalesProvider } from "../context/gerencia-de-compras/acondicionamientoDeSucursales";
import { AsignarPreciosProvider } from "../context/gerencia-de-compras/asignarPrecios";
import { ProductosYaCompradosProvider } from "../context/gerencia-de-compras/productosYaComprados/ProductosYaCompradosProvider";
import { ProveedoresProvider } from "../context/gerencia-de-compras/manejoDeProveedores";
import { ReportesDeComprasProvider } from "../context/gerencia-de-compras/reporteDeCompras";

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
                                      <ReportesVentasIndividualProvider>
                                        <Component {...pageProps} />
                                      </ReportesVentasIndividualProvider>
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
  );
}

export default MyApp;

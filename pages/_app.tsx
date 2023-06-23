import {
  ReactElement,
  ReactNode,
  Suspense,
  lazy,
  useEffect,
  useState,
} from "react";
import { NextPage } from "next";
import { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";

// Contaduria

import { AsignarComisionProvider } from "../context/contaduria/asignarComision";
import { ReporteDeGananciaProvider } from "../context/contaduria/reporteDeGanancia";

// Gerencia de compras

import { AcondicionamientoDeSucursalesProvider } from "../context/gerencia-de-compras/acondicionamientoDeSucursales";
import { AsignarPreciosProvider } from "../context/gerencia-de-compras/asignarPrecios";
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
import { PersonalesDeMantenimientoProvider } from "../context/gerencia-operativa/personalDeMantenimiento";
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
import { AuthProvider } from "../context/auth";

// TODO: Checar de donde viene esto:
import { ProductosYaCompradosProvider } from "../context/gerencia-de-compras/productosYaComprados/ProductosYaCompradosProvider";
import { useRouter } from "next/router";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const router = useRouter();
  const [flag, setFlag] = useState(false);

  const getLayout = Component.getLayout || ((page) => page);

  useEffect(() => {
    if (flag) {
      router.reload();
    } else {
      setFlag(true);
    }
  }, []);

  return getLayout(
    <Suspense fallback={<div>Loading...</div>}>
      <SessionProvider>
        <AuthProvider>
          <SucursalesYFranquiciasProvider>
            <MantenimientosProvider>
              <PersonalesDeMantenimientoProvider>
                <ReportesDeComprasProvider>
                  <AsignarComisionProvider>
                    <ApartadosJuridicosProvider>
                      <AsignarPreciosProvider>
                        <ReportesDeSalidaProvider>
                          <MateriasPrimasProvider>
                            <CandidatosProvider>
                              <PersonalActivoProvider>
                                <ManejosDePersonalProvider>
                                  <ChecksInPersonalProvider>
                                    <ClientesFrecuentesProvider>
                                      <ReportesVentasIndividualProvider>
                                        <ProveedoresProvider>
                                          <AcondicionamientoDeSucursalesProvider>
                                            <ReporteDeGananciaProvider>
                                              <ReporteVentasAmbulantesIndividualProvider>
                                                <ManejosDeAlmacenProvider>
                                                  <Component {...pageProps} />
                                                </ManejosDeAlmacenProvider>
                                              </ReporteVentasAmbulantesIndividualProvider>
                                            </ReporteDeGananciaProvider>
                                          </AcondicionamientoDeSucursalesProvider>
                                        </ProveedoresProvider>
                                      </ReportesVentasIndividualProvider>
                                    </ClientesFrecuentesProvider>
                                  </ChecksInPersonalProvider>
                                </ManejosDePersonalProvider>
                              </PersonalActivoProvider>
                            </CandidatosProvider>
                          </MateriasPrimasProvider>
                        </ReportesDeSalidaProvider>
                      </AsignarPreciosProvider>
                    </ApartadosJuridicosProvider>
                  </AsignarComisionProvider>
                </ReportesDeComprasProvider>
              </PersonalesDeMantenimientoProvider>
            </MantenimientosProvider>
          </SucursalesYFranquiciasProvider>
        </AuthProvider>
      </SessionProvider>
    </Suspense>
  );
}

export default MyApp;

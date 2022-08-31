import { SidebarLayoutRecursosHumanos } from "../../../components/layouts/recursos-humanos/SidebarLayoutRecursosHumanos";
import { useContext } from 'react';
import { CandidatosContext } from '../../../context/candidatos/CandidatosContext';
import ListaCandidatos from "../../../components/layouts/recursos-humanos/ListaCandidatos";

const VerCandidatos = () => {

  const { candidatos } = useContext( CandidatosContext );

  return (
    <SidebarLayoutRecursosHumanos>
        <div>Ver Candidatos</div>
        <ListaCandidatos />
        {/* {
          candidatos.map( candidato => {
            <p>

            </p>
          } );
        } */}
    </SidebarLayoutRecursosHumanos>
  )
}

export default VerCandidatos;
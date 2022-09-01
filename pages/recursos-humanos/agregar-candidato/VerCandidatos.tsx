import { SidebarLayoutRecursosHumanos } from "../../../components/layouts/recursos-humanos/SidebarLayoutRecursosHumanos";
import { useContext } from 'react';
import { CandidatosContext } from '../../../context/recursos-humanos/candidatos/CandidatosContext';
import ListaCandidatos from "../../../components/layouts/recursos-humanos/ListaCandidatos";

const VerCandidatos = () => {

  const { candidatos } = useContext( CandidatosContext );

  return (
    <SidebarLayoutRecursosHumanos>
        <div>Ver Candidatos</div>
        <ListaCandidatos />
    </SidebarLayoutRecursosHumanos>
  )
}

export default VerCandidatos;
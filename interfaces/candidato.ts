export interface Candidato {
  _id: string;
  nombre: string;
  puesto: PuestoCandidato;
  descripcionDelPuesto: string;
  fechaDeNacimiento: string;
  domicilio: string;
  curp: string;
  noImss: string;
  noCartaDePolicia: string;
}

export type PuestoCandidato = 'Administrador' | 'Chef' | 'Operador';
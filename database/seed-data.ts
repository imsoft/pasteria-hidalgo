import { PuestosEmpresa } from "../interfaces";

interface SeedCandidato {
  nombre: string;
  puesto: PuestosEmpresa;
  descripcionDelPuesto: string;
  fechaDeNacimiento: string;
  domicilio: string;
  curp: string;
  noImss?: string;
  noCartaDePolicia: string;
  celular: string;
  contactoDeEmergencia: string;
  correoElectronico: string;
  referencia1Nombre: string;
  referencia1Empresa: string;
  referencia1NumeroTelefonico: string;
  referencia1Observaciones: string;
  referencia2Nombre: string;
  referencia2Empresa: string;
  referencia2NumeroTelefonico: string;
  referencia2Observaciones: string;
  referencia3Nombre?: string;
  referencia3Empresa?: string;
  referencia3NumeroTelefonico?: string;
  referencia3Observaciones?: string;
}

interface SeedData {
  candidatos: SeedCandidato[];
}

export const initialData: SeedData = {
  candidatos: [
    {
      // 1
      nombre: "Brandon Uriel Garcia Ramos",
      puesto: "Administrador",
      descripcionDelPuesto: "Checar funciones de la aplicación web",
      fechaDeNacimiento: "1997-03-15",
      domicilio: "Cipriano Campos Alatorre #752 interior #104",
      curp: "garb970315hjcrmr01",
      noImss: "24681012",
      noCartaDePolicia: "123456789",
      celular: "3334109866",
      contactoDeEmergencia: "3339693868",
      correoElectronico: "bugr.2487@gmail.com",
      referencia1Nombre: "Yeltza",
      referencia1Empresa: "Infinito Aduanero",
      referencia1NumeroTelefonico: "3339693868",
      referencia1Observaciones: "Muy buen trabajador",
      referencia2Nombre: "Javier",
      referencia2Empresa: "Abogado SA de CV",
      referencia2NumeroTelefonico: "3331717277",
      referencia2Observaciones: "Muy inteligente, pero un poco impuntual",
      referencia3Nombre: "Happy",
      referencia3Empresa: "Aviantor",
      referencia3NumeroTelefonico: "33323253487",
      referencia3Observaciones: "Gran elemento para trabajar en equipo",
    },
    {
      // 2
      nombre: "Juan Perez",
      puesto: "Contaduria",
      descripcionDelPuesto: "Programación en JavaScript",
      fechaDeNacimiento: "1995-05-20",
      domicilio: "Av. Principal #123",
      curp: "peju950520hjcrmr02",
      noImss: "13579246",
      noCartaDePolicia: "987654321",
      celular: "3335556666",
      contactoDeEmergencia: "3331112222",
      correoElectronico: "juanperez@gmail.com",
      referencia1Nombre: "Ana",
      referencia1Empresa: "IT Solutions",
      referencia1NumeroTelefonico: "3334445555",
      referencia1Observaciones: "Muy eficiente",
      referencia2Nombre: "Pedro",
      referencia2Empresa: "TechCorp",
      referencia2NumeroTelefonico: "3338889999",
      referencia2Observaciones: "Buen compañero de trabajo",
      referencia3Nombre: "Luis",
      referencia3Empresa: "GlobalSoft",
      referencia3NumeroTelefonico: "3332223333",
      referencia3Observaciones: "Muy colaborador",
    },
    {
      // 3
      nombre: "María González",
      puesto: "Gerencia de compras",
      descripcionDelPuesto: "Estrategias de redes sociales",
      fechaDeNacimiento: "1989-03-12",
      domicilio: "Calle del Parque #456",
      curp: "GOMM890312MVZLSR08",
      noImss: "24681357",
      noCartaDePolicia: "123456789",
      celular: "4447778888",
      contactoDeEmergencia: "4442221111",
      correoElectronico: "mariagonzalez@gmail.com",
      referencia1Nombre: "Carlos",
      referencia1Empresa: "Agencia de Publicidad",
      referencia1NumeroTelefonico: "4445556666",
      referencia1Observaciones: "Excelente creatividad",
      referencia2Nombre: "Sofía",
      referencia2Empresa: "Compañía de Cosméticos",
      referencia2NumeroTelefonico: "4449998888",
      referencia2Observaciones: "Gran capacidad de liderazgo",
      referencia3Nombre: "Javier",
      referencia3Empresa: "Empresa de Tecnología",
      referencia3NumeroTelefonico: "4443332222",
      referencia3Observaciones: "Muy detallista en su trabajo",
    },
    {
      // 4
      nombre: "Luisa Rodríguez",
      puesto: "Recursos Humanos",
      descripcionDelPuesto: "Administración de personal",
      fechaDeNacimiento: "1992-11-04",
      domicilio: "Avenida del Bosque #789",
      curp: "RORL921104MNTSDS01",
      noImss: "36985214",
      noCartaDePolicia: "987654321",
      celular: "5558889999",
      contactoDeEmergencia: "5553332222",
      correoElectronico: "luisarodriguez@gmail.com",
      referencia1Nombre: "Alejandro",
      referencia1Empresa: "Empresa de Consultoría",
      referencia1NumeroTelefonico: "5557778888",
      referencia1Observaciones: "Gran capacidad de resolución de problemas",
      referencia2Nombre: "Fernanda",
      referencia2Empresa: "Compañía de Seguros",
      referencia2NumeroTelefonico: "5551112222",
      referencia2Observaciones: "Muy proactiva y comprometida",
      referencia3Nombre: "Arturo",
      referencia3Empresa: "Empresa de Construcción",
      referencia3NumeroTelefonico: "5554443333",
      referencia3Observaciones: "Excelente trabajo en equipo",
    },
    {
      // 5
      nombre: "Diego López",
      puesto: "Gerencia de ventas",
      descripcionDelPuesto: "Desarrollo de aplicaciones en React",
      fechaDeNacimiento: "1991-08-07",
      domicilio: "Calle de la Rosa #345",
      curp: "LOPD910807HMCRGR06",
      noImss: "12345678",
      noCartaDePolicia: "87654321",
      celular: "2223334444",
      contactoDeEmergencia: "2225556666",
      correoElectronico: "diegolopez@gmail.com",
      referencia1Nombre: "Mónica",
      referencia1Empresa: "Empresa de Desarrollo de Software",
      referencia1NumeroTelefonico: "2224445555",
      referencia1Observaciones: "Muy puntual y organizado",
      referencia2Nombre: "Jorge",
      referencia2Empresa: "Empresa de Consultoría en TI",
      referencia2NumeroTelefonico: "2227778888",
      referencia2Observaciones: "Excelente trabajo en equipo",
      referencia3Nombre: "Laura",
      referencia3Empresa: "Empresa de Diseño Gráfico",
      referencia3NumeroTelefonico: "2221112222",
      referencia3Observaciones: "Muy creativo en el diseño de interfaces",
    },
    {
      // 6
      nombre: "Sofía Ramírez",
      puesto: "Gerencia operativa",
      descripcionDelPuesto: "Litigio mercantil",
      fechaDeNacimiento: "1985-02-23",
      domicilio: "Calle de la Palma #678",
      curp: "RASM850223MVZMSF08",
      noImss: "24680135",
      noCartaDePolicia: "987654321",
      celular: "6669998888",
      contactoDeEmergencia: "6662221111",
      correoElectronico: "sofiaramirez@gmail.com",
      referencia1Nombre: "Pedro",
      referencia1Empresa: "Bufete de Abogados",
      referencia1NumeroTelefonico: "6665554444",
      referencia1Observaciones: "Muy buena capacidad de argumentación",
      referencia2Nombre: "Isabel",
      referencia2Empresa: "Empresa de Bienes Raíces",
      referencia2NumeroTelefonico: "6667778888",
      referencia2Observaciones:
        "Gran capacidad para solucionar problemas legales",
      referencia3Nombre: "Javier",
      referencia3Empresa: "Empresa de Seguridad",
      referencia3NumeroTelefonico: "6663332222",
      referencia3Observaciones: "Excelente en la gestión de documentos legales",
    },
    {
      // 7
      nombre: "María Fernández",
      puesto: "Administrador",
      descripcionDelPuesto: "Desarrollo de software en Java",
      fechaDeNacimiento: "1990-10-15",
      domicilio: "Av. de los Pinos #456",
      curp: "FEAM901015MVZRRR01",
      noImss: "35715926",
      noCartaDePolicia: "111222333",
      celular: "5557778888",
      contactoDeEmergencia: "5554443333",
      correoElectronico: "mariafernandez@gmail.com",
      referencia1Nombre: "Juan",
      referencia1Empresa: "Empresa de Desarrollo de Software",
      referencia1NumeroTelefonico: "5552221111",
      referencia1Observaciones: "Muy responsable y proactivo",
      referencia2Nombre: "Carla",
      referencia2Empresa: "Empresa de Consultoría en TI",
      referencia2NumeroTelefonico: "5553334444",
      referencia2Observaciones: "Excelente liderazgo y gestión de equipos",
      referencia3Nombre: "Pedro",
      referencia3Empresa: "Empresa de Automatización Industrial",
      referencia3NumeroTelefonico: "5556667777",
      referencia3Observaciones:
        "Muy hábil en la implementación de soluciones tecnológicas",
    },
    {
      // 8
      nombre: "Luisa Torres",
      puesto: "Recursos Humanos",
      descripcionDelPuesto: "Atención clínica a pacientes",
      fechaDeNacimiento: "1987-03-12",
      domicilio: "Calle del Sol #789",
      curp: "TOTL870312MVZRRR03",
      noImss: "46801325",
      noCartaDePolicia: "456789012",
      celular: "7773332222",
      contactoDeEmergencia: "7775554444",
      correoElectronico: "luisatorres@gmail.com",
      referencia1Nombre: "Ana",
      referencia1Empresa: "Clínica de Psicoterapia",
      referencia1NumeroTelefonico: "7774445555",
      referencia1Observaciones: "Muy comprometida con su trabajo",
      referencia2Nombre: "Jorge",
      referencia2Empresa: "Centro de Rehabilitación",
      referencia2NumeroTelefonico: "7776667777",
      referencia2Observaciones: "Gran capacidad de empatía y comprensión",
      referencia3Nombre: "Mónica",
      referencia3Empresa: "Centro de Investigación en Salud Mental",
      referencia3NumeroTelefonico: "7778889999",
      referencia3Observaciones:
        "Excelente en la investigación y análisis de casos clínicos",
    },
    {
      // 9
      nombre: "Pedro García",
      puesto: "Gerencia de ventas",
      descripcionDelPuesto:
        "Asesoría y representación legal en derecho corporativo",
      fechaDeNacimiento: "1985-07-01",
      domicilio: "Calle de la Paz #321",
      curp: "GAPD850701HDFRRR02",
      noImss: "24681357",
      noCartaDePolicia: "987654321",
      celular: "5551112222",
      contactoDeEmergencia: "5556667777",
      correoElectronico: "pedrogarcia@gmail.com",
      referencia1Nombre: "María",
      referencia1Empresa: "Bufete de Abogados",
      referencia1NumeroTelefonico: "5553334444",
      referencia1Observaciones: "Excelente habilidad de negociación",
      referencia2Nombre: "José",
      referencia2Empresa: "Departamento Legal de Empresa de Telecomunicaciones",
      referencia2NumeroTelefonico: "5552221111",
      referencia2Observaciones:
        "Gran conocimiento en derecho de telecomunicaciones",
      referencia3Nombre: "Luis",
      referencia3Empresa: "Notaría Pública",
      referencia3NumeroTelefonico: "5557778888",
      referencia3Observaciones:
        "Muy preciso y detallista en la revisión de documentos legales",
    },
    {
      // 10
      nombre: "Carmen Méndez",
      puesto: "Gerencia operativa",
      descripcionDelPuesto: "Atención clínica y tratamiento de pacientes",
      fechaDeNacimiento: "1992-02-25",
      domicilio: "Calle de las Flores #567",
      curp: "MEMC920225MDFRRR06",
      noImss: "13579024",
      noCartaDePolicia: "123456789",
      celular: "7774445555",
      contactoDeEmergencia: "7771112222",
      correoElectronico: "carmenmendez@gmail.com",
      referencia1Nombre: "Juan",
      referencia1Empresa: "Centro de Salud",
      referencia1NumeroTelefonico: "7772223333",
      referencia1Observaciones:
        "Gran dedicación y compromiso con sus pacientes",
      referencia2Nombre: "María",
      referencia2Empresa: "Clínica de Especialidades Médicas",
      referencia2NumeroTelefonico: "7775556666",
      referencia2Observaciones:
        "Muy hábil en el diagnóstico y tratamiento de enfermedades crónicas",
      referencia3Nombre: "Jorge",
      referencia3Empresa: "Hospital General",
      referencia3NumeroTelefonico: "7778889999",
      referencia3Observaciones:
        "Excelente coordinación y liderazgo en equipos médicos multidisciplinarios",
    },
  ],
};

import bcrypt from "bcryptjs";

import {
  IListadoDeReporteDeCompra,
  IListadoReporteDeSalida,
  ListadoDeProductos,
  LugarDeVenta,
  PuestosEmpresa,
  Temperatura,
  Unidades,
  YesNo,
} from "../interfaces";

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

interface SeedPersonalActivo {
  nombre: string;
  puesto: PuestosEmpresa;
  fechaDeContratacion: string;
  noContrato: string;
  noExpediente: string;
  bajaTemporal: string;
  comentarios: string;
}

interface SeedCheckInPersonal {
  sucursalOFranquicia: string;
  nombreSucursalOFranquicia: string;
  nombre: string;
  fecha: string;
  horaDeIngreso: string;
  horaDeSalida: string;
}

interface SeedAcondicionamientoDeSucursal {
  sucursalOFranquicia: string;
  nombreSucursalOFranquicia: string;
  producto: string;
  fechaDeCompra: string;
  descripcionDelProducto: string;
  fechaEstimadaDeEntrega: string;
  proveedor: string;
  factura: YesNo;
  precioDeCompra: number;
  cantidad: number;
  totalAcomulado: number;
}

interface SeedProveedor {
  nombre: string;
  direccion: string;
  telefono: string;
  horarioDeApertura: string;
  horarioDeCierre: string;
  productosQueSeCompran: string;
  entregasADomicilio: string;
  rfc: string;
}

interface SeedReporteDeCompra {
  fechaDeCompra: string;
  nombreProveedor: string;
  credito: string;
  factura: string;
  listadoDeReporteDeCompra: IListadoDeReporteDeCompra[];
  precioTotalDelCompra: number;
}

interface SeedAsignarPrecio {
  producto: string;
  precioMaximo: string;
}

interface SeedClienteFrecuente {
  nombre: string;
  correoElectronico: string;
  fechaDeNacimiento: string;
  puntosDeCompra: number;
  sucursalOFranquicia: string;
  nombreSucursalOFranquicia: string;
}

interface SeedReporteVentasAmbulantesIndividual {
  fecha: string;
  nombreDelVendedor: string;
  totalDeLaVenta: number;
  listadoDeProductos: ListadoDeProductos[];
}

interface SeedReporteVentasIndividual {
  fecha: string;
  nombreDelVendedor: string;
  lugarDeVenta: LugarDeVenta;
  nombreLugarDeVenta: string;
  totalDeLaVenta: number;
  listadoDeProductos: ListadoDeProductos[];
  correoElectronicoClienteFrecuente: string;
  puntosClienteFrecuente: number;
}

interface SeedApartadoJuridico {
  sucursalOFranquicia: string;
  nombreSucursalOFranquicia: string;
  nombreDelArchivo: string;
  urlDelArchivo: string;
}

interface SeedSucursalYFranquicia {
  sucursalOFranquicia: string;
  nombreSucursalOFranquicia: string;
  direccion: string;
  distancia: string;
  fechaDePago: string;
  montoDePago: string;
  cuentaBancaria: string;
  banco: string;
  nombreDelBeneficiario: string;
  rfc: string;
}

interface SeedPersonalDeMantenimiento {
  nombre: string;
  oficio: string;
  direccion: string;
  telefono: string;
}

interface SeedMantenimiento {
  sucursalOFranquicia: string;
  nombreSucursalOFranquicia: string;
  nombreMaquina: string;
  proveedor: string;
  fechaDeGarantia: string;
  fechaDeMantenimiento: string;
  modificacionDeMantenimiento: string;
}

interface SeedReporteDeSalida {
  sucursalAEnviar: string;
  nombreDelRepartidor: string;
  datosDeLaRuta: string;
  kilometrajeDeEntrada: string;
  kilometrajeDeSalida: string;
  listadoReporteDeSalida: IListadoReporteDeSalida[];
}

interface SeedMateriaPrima {
  materiaPrima: string;
  unidades: Unidades;
  temperatura: Temperatura;
}

interface SeedAsignarComision {
  sucursalOFranquicia: string;
  nombreSucursalOFranquicia: string;
  mes: string;
  anio: string;
  minimoDeLaMeta: number;
}

interface SeedManejoDeAlmacen {
  materiaPrima: string;
  unidades: string;
  temperatura: string;
  cantidad: number;
}

interface SeedUsuario {
  nombre: string;
  correoElectronico: string;
  contrasenia: string;
  role: string[];
}

interface SeedData {
  candidatos: SeedCandidato[];
  personalActivo: SeedPersonalActivo[];
  checkInDePersonal: SeedCheckInPersonal[];
  acondicionamientoDeSucursal: SeedAcondicionamientoDeSucursal[];
  proveedor: SeedProveedor[];
  reporteDeCompra: SeedReporteDeCompra[];
  asignarPrecio: SeedAsignarPrecio[];
  clienteFrecuente: SeedClienteFrecuente[];
  reporteVentasAmbulantesIndividual: SeedReporteVentasAmbulantesIndividual[];
  reporteVentasIndividual: SeedReporteVentasIndividual[];
  apartadoJuridico: SeedApartadoJuridico[];
  sucursalYFranquicia: SeedSucursalYFranquicia[];
  personalDeMantenimiento: SeedPersonalDeMantenimiento[];
  mantenimiento: SeedMantenimiento[];
  reporteDeSalida: SeedReporteDeSalida[];
  materiaPrima: SeedMateriaPrima[];
  asignarComision: SeedAsignarComision[];
  manejoDeAlmacen: SeedManejoDeAlmacen[];
  usuario: SeedUsuario[];
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
  personalActivo: [
    {
      // 1, relacionado con candidato #9
      nombre: "Pedro García",
      puesto: "Gerencia de ventas",
      fechaDeContratacion: "2021-06-01",
      noContrato: "20210601",
      noExpediente: "MFS20210601",
      bajaTemporal: "No",
      comentarios: "Excelente desempeño y habilidades de liderazgo.",
    },
    {
      // 2, relacionado con candidato #8
      nombre: "Luisa Torres",
      puesto: "Recursos Humanos",
      fechaDeContratacion: "2023-01-15",
      noContrato: "JLGP20230115",
      noExpediente: "20230115",
      bajaTemporal: "No",
      comentarios:
        "Posee amplios conocimientos en programación y bases de datos.",
    },
    {
      // 3, relacionado con candidato #2
      nombre: "Juan Perez",
      puesto: "Contaduria",
      fechaDeContratacion: "2022-09-10",
      noContrato: "AKHG20220910",
      noExpediente: "20220910",
      bajaTemporal: "Si",
      comentarios: "Licencia temporal por maternidad.",
    },
    {
      // 4, relacionado con candidato #7
      nombre: "María Fernández",
      puesto: "Administrador",
      fechaDeContratacion: "2020-03-01",
      noContrato: "RP20200301",
      noExpediente: "20200301",
      bajaTemporal: "No",
      comentarios:
        "Excelente manejo de la contabilidad y finanzas de la empresa.",
    },
    {
      // 5, relacionado con candidato #5
      nombre: "Diego López",
      puesto: "Gerencia de ventas",
      fechaDeContratacion: "2021-11-10",
      noContrato: "SLG20211110",
      noExpediente: "20211110",
      bajaTemporal: "Si",
      comentarios: "Licencia temporal por enfermedad.",
    },
    {
      // 6, relacionado con candidato #4
      nombre: "Luisa Rodríguez",
      puesto: "Recursos Humanos",
      fechaDeContratacion: "2022-05-20",
      noContrato: "JCTH20220520",
      noExpediente: "20220520",
      bajaTemporal: "No",
      comentarios:
        "Responsable de la supervisión y ejecución de proyectos de construcción.",
    },
  ],
  checkInDePersonal: [
    {
      sucursalOFranquicia: "Franquicia",
      nombreSucursalOFranquicia: "Galerías",
      nombre: "Pedro García",
      fecha: "2023-07-15",
      horaDeIngreso: "09:30",
      horaDeSalida: "18:00",
    },
    {
      sucursalOFranquicia: "Sucursal",
      nombreSucursalOFranquicia: "Zapopan",
      nombre: "Luisa Torres",
      fecha: "2023-04-20",
      horaDeIngreso: "08:00",
      horaDeSalida: "17:00",
    },
    {
      sucursalOFranquicia: "Franquicia",
      nombreSucursalOFranquicia: "Plaza del Sol",
      nombre: "Juan Perez",
      fecha: "2023-10-10",
      horaDeIngreso: "11:00",
      horaDeSalida: "20:00",
    },
    {
      sucursalOFranquicia: "Sucursal",
      nombreSucursalOFranquicia: "Tlaquepaque",
      nombre: "María Fernández",
      fecha: "2023-05-05",
      horaDeIngreso: "07:00",
      horaDeSalida: "16:00",
    },
    {
      sucursalOFranquicia: "Franquicia",
      nombreSucursalOFranquicia: "Andares",
      nombre: "Diego López",
      fecha: "2023-11-20",
      horaDeIngreso: "10:00",
      horaDeSalida: "19:00",
    },
    {
      sucursalOFranquicia: "Sucursal",
      nombreSucursalOFranquicia: "Centro",
      nombre: "Luisa Rodríguez",
      fecha: "2023-06-15",
      horaDeIngreso: "13:00",
      horaDeSalida: "21:00",
    },
  ],
  acondicionamientoDeSucursal: [
    {
      // 1
      sucursalOFranquicia: "Sucursal",
      nombreSucursalOFranquicia: "Polanco",
      producto: "Sillones",
      fechaDeCompra: "2023-02-15",
      descripcionDelProducto: "Material de gamuza",
      precioDeCompra: 30,
      fechaEstimadaDeEntrega: "2023-02-18",
      proveedor: "Frutas y Verduras S.A.",
      factura: "No",
      totalAcomulado: 90,
      cantidad: 3,
    },
    {
      // 2
      sucursalOFranquicia: "Sucursal",
      nombreSucursalOFranquicia: "Reforma",
      producto: "Sillas",
      fechaDeCompra: "2023-03-10",
      descripcionDelProducto: "Sillas ergonomias",
      precioDeCompra: 250,
      fechaEstimadaDeEntrega: "2023-03-18",
      proveedor: "Tienda de Ropa Fashion",
      factura: "Si",
      totalAcomulado: 500,
      cantidad: 2,
    },
    {
      // 3
      sucursalOFranquicia: "Sucursal",
      nombreSucursalOFranquicia: "Centro",
      producto: "Computadora portátil",
      fechaDeCompra: "2023-04-01",
      descripcionDelProducto: "Laptop Dell Inspiron 15",
      precioDeCompra: 1200,
      fechaEstimadaDeEntrega: "2023-04-05",
      proveedor: "Tecnología Total",
      factura: "Si",
      totalAcomulado: 1200,
      cantidad: 1,
    },
    {
      // 4
      sucursalOFranquicia: "Sucursal",
      nombreSucursalOFranquicia: "Providencia",
      producto: "Papel de baño",
      fechaDeCompra: "2023-03-20",
      descripcionDelProducto: "Marca charmin",
      precioDeCompra: 15,
      fechaEstimadaDeEntrega: "2023-03-22",
      proveedor: "Ropa Cool S.A.",
      factura: "No",
      totalAcomulado: 45,
      cantidad: 3,
    },
    {
      // 5
      sucursalOFranquicia: "Franquicia",
      nombreSucursalOFranquicia: "Polanco",
      producto: "Teléfono móvil",
      fechaDeCompra: "2023-03-15",
      descripcionDelProducto: "Smartphone Samsung Galaxy S21",
      precioDeCompra: 900,
      fechaEstimadaDeEntrega: "2023-03-20",
      proveedor: "ElectroTech",
      factura: "Si",
      totalAcomulado: 1800,
      cantidad: 2,
    },
    {
      // 6
      sucursalOFranquicia: "Sucursal",
      nombreSucursalOFranquicia: "Providencia",
      producto: "Mesa de comedor",
      fechaDeCompra: "2023-02-28",
      descripcionDelProducto: "Mesa de madera maciza para 8 personas",
      precioDeCompra: 1200,
      fechaEstimadaDeEntrega: "2023-03-10",
      proveedor: "Muebles Elegantes",
      factura: "No",
      totalAcomulado: 1200,
      cantidad: 1,
    },
    {
      // 7
      sucursalOFranquicia: "Franquicia",
      nombreSucursalOFranquicia: "Santa Fe",
      producto: "Laptop",
      fechaDeCompra: "2023-04-01",
      descripcionDelProducto: "Laptop HP Spectre x360",
      precioDeCompra: 1500,
      fechaEstimadaDeEntrega: "2023-04-07",
      proveedor: "Tecnología Avanzada",
      factura: "Si",
      totalAcomulado: 1500,
      cantidad: 1,
    },
    {
      // 8
      sucursalOFranquicia: "Sucursal",
      nombreSucursalOFranquicia: "Polanco",
      producto: "Delantales",
      fechaDeCompra: "2023-03-20",
      descripcionDelProducto: "Color blanco",
      precioDeCompra: 80,
      fechaEstimadaDeEntrega: "2023-03-25",
      proveedor: "Deportes Max",
      factura: "No",
      totalAcomulado: 240,
      cantidad: 3,
    },
    {
      // 9
      sucursalOFranquicia: "Franquicia",
      nombreSucursalOFranquicia: "Centro Histórico",
      producto: "Smartphone",
      fechaDeCompra: "2023-04-02",
      descripcionDelProducto: "Samsung Galaxy S21",
      precioDeCompra: 1000,
      fechaEstimadaDeEntrega: "2023-04-05",
      proveedor: "ElectroTech",
      factura: "Si",
      totalAcomulado: 2000,
      cantidad: 2,
    },
    {
      // 10
      sucursalOFranquicia: "Sucursal",
      nombreSucursalOFranquicia: "Providencia",
      producto: "Libro",
      fechaDeCompra: "2023-03-28",
      descripcionDelProducto: "El Principito",
      precioDeCompra: 10,
      fechaEstimadaDeEntrega: "2023-04-01",
      proveedor: "Librería El Sabio",
      factura: "No",
      totalAcomulado: 20,
      cantidad: 2,
    },
  ],
  proveedor: [
    {
      // 1
      nombre: "María",
      direccion: "Avenida Revolución #456",
      telefono: "3312345678",
      horarioDeApertura: "08:30",
      horarioDeCierre: "17:30",
      productosQueSeCompran: "Manzanas",
      entregasADomicilio: "Sí",
      rfc: "MARG890715DFA",
    },
    {
      // 2
      nombre: "Juan",
      direccion: "Calle Juárez #123",
      telefono: "3333333333",
      horarioDeApertura: "09:00",
      horarioDeCierre: "18:00",
      productosQueSeCompran: "Plátanos",
      entregasADomicilio: "Sí",
      rfc: "JUAG790503GH",
    },
    {
      // 3
      nombre: "Laura",
      direccion: "Calle Reforma #789",
      telefono: "3356789012",
      horarioDeApertura: "11:00",
      horarioDeCierre: "20:00",
      productosQueSeCompran: "Uvas",
      entregasADomicilio: "No",
      rfc: "LAUG870415JKL",
    },
    {
      // 4
      nombre: "Pedro",
      direccion: "Avenida Vallarta #456",
      telefono: "3378901234",
      horarioDeApertura: "07:30",
      horarioDeCierre: "16:30",
      productosQueSeCompran: "Papayas",
      entregasADomicilio: "Sí",
      rfc: "PEDM880512QWE",
    },
    {
      // 5
      nombre: "María",
      direccion: "Calle Independencia #123",
      telefono: "3345678901",
      horarioDeApertura: "09:00",
      horarioDeCierre: "18:00",
      productosQueSeCompran: "Plátanos",
      entregasADomicilio: "Sí",
      rfc: "MAAM901205RTY",
    },
    {
      // 6
      nombre: "Juan",
      direccion: "Avenida Juárez #789",
      telefono: "3367890123",
      horarioDeApertura: "08:30",
      horarioDeCierre: "17:30",
      productosQueSeCompran: "Manzanas",
      entregasADomicilio: "No",
      rfc: "JUAG880721QAZ",
    },
    {
      // 7
      nombre: "Laura",
      direccion: "Calle Reforma #456",
      telefono: "3356789012",
      horarioDeApertura: "08:00",
      horarioDeCierre: "16:30",
      productosQueSeCompran: "Huevos",
      entregasADomicilio: "Sí",
      rfc: "LAUG890527JKL",
    },
    {
      // 8
      nombre: "Pedro",
      direccion: "Avenida Hidalgo #789",
      telefono: "3378901234",
      horarioDeApertura: "07:30",
      horarioDeCierre: "18:00",
      productosQueSeCompran: "Carne",
      entregasADomicilio: "No",
      rfc: "PEDP940315RTY",
    },
    {
      // 9
      nombre: "María",
      direccion: "Calle Juárez #1234",
      telefono: "3367890123",
      horarioDeApertura: "09:00",
      horarioDeCierre: "20:00",
      productosQueSeCompran: "Verduras",
      entregasADomicilio: "Sí",
      rfc: "MARG891205UIO",
    },
    {
      // 10
      nombre: "Juan",
      direccion: "Boulevard López Mateos #567",
      telefono: "3345678901",
      horarioDeApertura: "10:30",
      horarioDeCierre: "18:30",
      productosQueSeCompran: "Pan",
      entregasADomicilio: "Sí",
      rfc: "JUAN880915KLO",
    },
  ],
  reporteDeCompra: [
    {
      // 1
      fechaDeCompra: "28/09/2022",
      nombreProveedor: "María",
      credito: "No",
      factura: "No",
      listadoDeReporteDeCompra: [
        {
          uuid: 1,
          materiaPrima: "Lechuga",
          unidades: "Gramos",
          tempetatura: "Ambiente",
          caducidad: "2022-09-30",
          cantidad: 5,
          precioPorUnidad: 5,
          precioTotalDelProducto: 25,
        },
        {
          uuid: 2,
          materiaPrima: "Pepino",
          unidades: "Kilogramos",
          tempetatura: "Ambiente",
          caducidad: "2022-09-30",
          cantidad: 3,
          precioPorUnidad: 8,
          precioTotalDelProducto: 24,
        },
      ],
      precioTotalDelCompra: 49,
    },
    {
      // 2
      fechaDeCompra: "10/11/2022",
      nombreProveedor: "Juan",
      credito: "Sí",
      factura: "Sí",
      listadoDeReporteDeCompra: [
        {
          uuid: 1,
          materiaPrima: "Carne de res",
          unidades: "Kilogramos",
          tempetatura: "Refrigerado",
          caducidad: "2022-11-12",
          cantidad: 2,
          precioPorUnidad: 50,
          precioTotalDelProducto: 100,
        },
        {
          uuid: 2,
          materiaPrima: "Pescado",
          unidades: "Kilogramos",
          tempetatura: "Congelado",
          caducidad: "2022-11-15",
          cantidad: 3,
          precioPorUnidad: 30,
          precioTotalDelProducto: 90,
        },
      ],
      precioTotalDelCompra: 190,
    },
    {
      // 3
      fechaDeCompra: "12/02/2023",
      nombreProveedor: "Pedro",
      credito: "No",
      factura: "Sí",
      listadoDeReporteDeCompra: [
        {
          uuid: 1,
          materiaPrima: "Arroz",
          unidades: "Kilogramos",
          tempetatura: "Ambiente",
          caducidad: "2023-03-30",
          cantidad: 10,
          precioPorUnidad: 5,
          precioTotalDelProducto: 50,
        },
        {
          uuid: 2,
          materiaPrima: "Frijoles",
          unidades: "Kilogramos",
          tempetatura: "Ambiente",
          caducidad: "2023-04-30",
          cantidad: 5,
          precioPorUnidad: 8,
          precioTotalDelProducto: 40,
        },
      ],
      precioTotalDelCompra: 90,
    },
    {
      // 4
      fechaDeCompra: "20/03/2023",
      nombreProveedor: "Ana",
      credito: "Sí",
      factura: "No",
      listadoDeReporteDeCompra: [
        {
          uuid: 1,
          materiaPrima: "Queso",
          unidades: "Kilogramos",
          tempetatura: "Refrigerado",
          caducidad: "2023-03-31",
          cantidad: 2,
          precioPorUnidad: 30,
          precioTotalDelProducto: 60,
        },
        {
          uuid: 2,
          materiaPrima: "Huevo",
          unidades: "Kilogramos",
          tempetatura: "Ambiente",
          caducidad: "2023-04-15",
          cantidad: 12,
          precioPorUnidad: 1,
          precioTotalDelProducto: 12,
        },
      ],
      precioTotalDelCompra: 72,
    },
    {
      // 5
      fechaDeCompra: "01/04/2023",
      nombreProveedor: "María",
      credito: "Sí",
      factura: "Sí",
      listadoDeReporteDeCompra: [
        {
          uuid: 1,
          materiaPrima: "Lechuga",
          unidades: "Gramos",
          tempetatura: "Refrigerado",
          caducidad: "2023-04-03",
          cantidad: 6,
          precioPorUnidad: 2,
          precioTotalDelProducto: 12,
        },
        {
          uuid: 2,
          materiaPrima: "Zanahoria",
          unidades: "Kilogramos",
          tempetatura: "Ambiente",
          caducidad: "2023-04-10",
          cantidad: 3,
          precioPorUnidad: 3,
          precioTotalDelProducto: 9,
        },
      ],
      precioTotalDelCompra: 21,
    },
    {
      // 6
      fechaDeCompra: "25/02/2023",
      nombreProveedor: "Juan",
      credito: "No",
      factura: "No",
      listadoDeReporteDeCompra: [
        {
          uuid: 1,
          materiaPrima: "Pollo",
          unidades: "Kilogramos",
          tempetatura: "Congelado",
          caducidad: "2023-04-02",
          cantidad: 5,
          precioPorUnidad: 8,
          precioTotalDelProducto: 40,
        },
        {
          uuid: 2,
          materiaPrima: "Papa",
          unidades: "Kilogramos",
          tempetatura: "Ambiente",
          caducidad: "2023-04-20",
          cantidad: 2,
          precioPorUnidad: 2,
          precioTotalDelProducto: 4,
        },
      ],
      precioTotalDelCompra: 44,
    },
    {
      // 7
      fechaDeCompra: "02/04/2023",
      nombreProveedor: "Pedro",
      credito: "Sí",
      factura: "Sí",
      listadoDeReporteDeCompra: [
        {
          uuid: 1,
          materiaPrima: "Tomate",
          unidades: "Kilogramos",
          tempetatura: "Ambiente",
          caducidad: "2023-04-04",
          cantidad: 3,
          precioPorUnidad: 5,
          precioTotalDelProducto: 15,
        },
        {
          uuid: 2,
          materiaPrima: "Cebolla",
          unidades: "Kilogramos",
          tempetatura: "Ambiente",
          caducidad: "2023-04-15",
          cantidad: 2,
          precioPorUnidad: 3,
          precioTotalDelProducto: 6,
        },
      ],
      precioTotalDelCompra: 21,
    },
    {
      // 8
      fechaDeCompra: "31/03/2023",
      nombreProveedor: "Ana",
      credito: "No",
      factura: "Sí",
      listadoDeReporteDeCompra: [
        {
          uuid: 1,
          materiaPrima: "Queso",
          unidades: "Kilogramos",
          tempetatura: "Refrigerado",
          caducidad: "2023-04-05",
          cantidad: 2,
          precioPorUnidad: 7,
          precioTotalDelProducto: 14,
        },
        {
          uuid: 2,
          materiaPrima: "Huevo",
          unidades: "Gramos",
          tempetatura: "Ambiente",
          caducidad: "2023-04-10",
          cantidad: 1,
          precioPorUnidad: 12,
          precioTotalDelProducto: 12,
        },
      ],
      precioTotalDelCompra: 26,
    },
    {
      // 9
      fechaDeCompra: "01/04/2023",
      nombreProveedor: "María",
      credito: "No",
      factura: "No",
      listadoDeReporteDeCompra: [
        {
          uuid: 1,
          materiaPrima: "Lechuga",
          unidades: "Gramos",
          tempetatura: "Refrigerado",
          caducidad: "2023-04-03",
          cantidad: 5,
          precioPorUnidad: 2,
          precioTotalDelProducto: 10,
        },
        {
          uuid: 2,
          materiaPrima: "Zanahoria",
          unidades: "Kilogramos",
          tempetatura: "Ambiente",
          caducidad: "2023-04-07",
          cantidad: 3,
          precioPorUnidad: 4,
          precioTotalDelProducto: 12,
        },
      ],
      precioTotalDelCompra: 22,
    },
    {
      // 10
      fechaDeCompra: "30/03/2023",
      nombreProveedor: "Juan",
      credito: "Sí",
      factura: "Sí",
      listadoDeReporteDeCompra: [
        {
          uuid: 1,
          materiaPrima: "Pollo",
          unidades: "Kilogramos",
          tempetatura: "Congelado",
          caducidad: "2023-04-05",
          cantidad: 2,
          precioPorUnidad: 8,
          precioTotalDelProducto: 16,
        },
        {
          uuid: 2,
          materiaPrima: "Pescado",
          unidades: "Kilogramos",
          tempetatura: "Refrigerado",
          caducidad: "2023-04-10",
          cantidad: 1,
          precioPorUnidad: 15,
          precioTotalDelProducto: 15,
        },
      ],
      precioTotalDelCompra: 31,
    },
  ],
  asignarPrecio: [
    {
      // 1
      producto: "Harina",
      precioMaximo: "50",
    },
    {
      // 2
      producto: "Arroz",
      precioMaximo: "30",
    },
    {
      // 3
      producto: "Leche",
      precioMaximo: "25",
    },
    {
      // 4
      producto: "Aceite de oliva",
      precioMaximo: "120",
    },

    {
      // 5
      producto: "Salchichas",
      precioMaximo: "60",
    },
    {
      // 6
      producto: "Café",
      precioMaximo: "80",
    },
    {
      // 7
      producto: "Azúcar",
      precioMaximo: "40",
    },
    {
      // 8
      producto: "Pasta de dientes",
      precioMaximo: "15",
    },
    {
      // 9
      producto: "Jabón de baño",
      precioMaximo: "10",
    },
    {
      // 10
      producto: "Papel higiénico",
      precioMaximo: "20",
    },
  ],
  clienteFrecuente: [
    {
      // 1
      nombre: "María",
      correoElectronico: "maria@hotmail.com",
      fechaDeNacimiento: "1995-07-15",
      puntosDeCompra: 50,
      sucursalOFranquicia: "Franquicia",
      nombreSucursalOFranquicia: "Norte",
    },
    {
      // 2
      nombre: "Juan",
      correoElectronico: "juan@yahoo.com",
      fechaDeNacimiento: "1980-05-10",
      puntosDeCompra: 25,
      sucursalOFranquicia: "Sucursal",
      nombreSucursalOFranquicia: "Este",
    },
    {
      // 3
      nombre: "Pedro",
      correoElectronico: "pedro@gmail.com",
      fechaDeNacimiento: "1978-02-28",
      puntosDeCompra: 100,
      sucursalOFranquicia: "Franquicia",
      nombreSucursalOFranquicia: "Oeste",
    },
    {
      // 4
      nombre: "Luisa",
      correoElectronico: "luisa@hotmail.com",
      fechaDeNacimiento: "2000-09-12",
      puntosDeCompra: 75,
      sucursalOFranquicia: "Sucursal",
      nombreSucursalOFranquicia: "Sur",
    },
    {
      // 5
      nombre: "Ana",
      correoElectronico: "ana@gmail.com",
      fechaDeNacimiento: "1992-03-20",
      puntosDeCompra: 40,
      sucursalOFranquicia: "Franquicia",
      nombreSucursalOFranquicia: "Noreste",
    },
    {
      // 6
      nombre: "Carlos",
      correoElectronico: "carlos@yahoo.com",
      fechaDeNacimiento: "1985-11-05",
      puntosDeCompra: 20,
      sucursalOFranquicia: "Sucursal",
      nombreSucursalOFranquicia: "Sureste",
    },
    {
      // 7
      nombre: "Laura",
      correoElectronico: "laura@hotmail.com",
      fechaDeNacimiento: "1998-06-30",
      puntosDeCompra: 60,
      sucursalOFranquicia: "Franquicia",
      nombreSucursalOFranquicia: "Noroeste",
    },
    {
      // 8
      nombre: "Jorge",
      correoElectronico: "jorge@gmail.com",
      fechaDeNacimiento: "1974-12-18",
      puntosDeCompra: 30,
      sucursalOFranquicia: "Sucursal",
      nombreSucursalOFranquicia: "Centro-Sur",
    },
    {
      // 9
      nombre: "Isabel",
      correoElectronico: "isabel@yahoo.com",
      fechaDeNacimiento: "1988-08-08",
      puntosDeCompra: 70,
      sucursalOFranquicia: "Franquicia",
      nombreSucursalOFranquicia: "Centro-Norte",
    },
    {
      // 10
      nombre: "Ricardo",
      correoElectronico: "ricardo@gmail.com",
      fechaDeNacimiento: "1991-04-25",
      puntosDeCompra: 15,
      sucursalOFranquicia: "Sucursal",
      nombreSucursalOFranquicia: "Centro-Este",
    },
  ],
  reporteVentasAmbulantesIndividual: [
    {
      // 1
      fecha: "15/05/2023",
      nombreDelVendedor: "Laura",
      totalDeLaVenta: 250,
      listadoDeProductos: [
        {
          idProducto: "PC_SP",
          tipoDeProducto: "Paste Dulce",
          saborProducto: "Strawberry Pecan",
          cantidad: 3,
          precioProducto: 70,
          monto: 210,
        },
        {
          idProducto: "GB_CJ",
          tipoDeProducto: "Paste Dulce",
          saborProducto: "Chocolate Chip",
          cantidad: 2,
          precioProducto: 20,
          monto: 40,
        },
      ],
    },
    {
      // 2
      fecha: "06/07/2023",
      nombreDelVendedor: "Juan",
      totalDeLaVenta: 480,
      listadoDeProductos: [
        {
          idProducto: "PN_PA",
          tipoDeProducto: "Paste Salado",
          saborProducto: "Pan de Ajo",
          cantidad: 8,
          precioProducto: 40,
          monto: 320,
        },
        {
          idProducto: "DS_AU",
          tipoDeProducto: "Paste Dulce",
          saborProducto: "Azúcar",
          cantidad: 12,
          precioProducto: 10,
          monto: 120,
        },
      ],
    },
    {
      // 3
      fecha: "20/07/2023",
      nombreDelVendedor: "Ricardo",
      totalDeLaVenta: 85,
      listadoDeProductos: [
        {
          idProducto: "BE_ML",
          tipoDeProducto: "Paste Dulce",
          saborProducto: "Manzana",
          cantidad: 2,
          precioProducto: 30,
          monto: 60,
        },
        {
          idProducto: "PA_TQ",
          tipoDeProducto: "Paste Dulce",
          saborProducto: "Tres Leches",
          cantidad: 1,
          precioProducto: 25,
          monto: 25,
        },
      ],
    },
    {
      // 4
      fecha: "12/08/2023",
      nombreDelVendedor: "Pedro",
      totalDeLaVenta: 2000,
      listadoDeProductos: [
        {
          idProducto: "HB_HN",
          tipoDeProducto: "Paste Salado",
          saborProducto: "Hawaiana",
          cantidad: 5,
          precioProducto: 250,
          monto: 1250,
        },
        {
          idProducto: "FB_RN",
          tipoDeProducto: "Otros",
          saborProducto: "Regular",
          cantidad: 3,
          precioProducto: 100,
          monto: 300,
        },
        {
          idProducto: "BT_ST",
          tipoDeProducto: "Otros",
          saborProducto: "Soda",
          cantidad: 4,
          precioProducto: 50,
          monto: 200,
        },
      ],
    },
    {
      // 5
      fecha: "18/09/2023",
      nombreDelVendedor: "María",
      totalDeLaVenta: 350,
      listadoDeProductos: [
        {
          idProducto: "CH_CV",
          tipoDeProducto: "Paste Dulce",
          saborProducto: "Chocolate Vainilla",
          cantidad: 2,
          precioProducto: 120,
          monto: 240,
        },
        {
          idProducto: "PM_BT",
          tipoDeProducto: "Paste Dulce",
          saborProducto: "Mango",
          cantidad: 3,
          precioProducto: 30,
          monto: 90,
        },
        {
          idProducto: "CP_MS",
          tipoDeProducto: "Paste Dulce",
          saborProducto: "Mocha Sin Azúcar",
          cantidad: 1,
          precioProducto: 80,
          monto: 80,
        },
      ],
    },
    {
      // 6
      fecha: "10/05/2023",
      nombreDelVendedor: "Andrés",
      totalDeLaVenta: 540,
      listadoDeProductos: [
        {
          idProducto: "SV_MM",
          tipoDeProducto: "Paste Salado",
          saborProducto: "Vegetariano",
          cantidad: 4,
          precioProducto: 120,
          monto: 480,
        },
        {
          idProducto: "BT_FR",
          tipoDeProducto: "Paste Dulce",
          saborProducto: "Fruta",
          cantidad: 2,
          precioProducto: 30,
          monto: 60,
        },
      ],
    },
    {
      // 7
      fecha: "14/11/2023",
      nombreDelVendedor: "Luisa",
      totalDeLaVenta: 120,
      listadoDeProductos: [
        {
          idProducto: "CB_CR",
          tipoDeProducto: "Paste Dulce",
          saborProducto: "Crema",
          cantidad: 6,
          precioProducto: 20,
          monto: 120,
        },
      ],
    },
    {
      // 8
      fecha: "22/12/2023",
      nombreDelVendedor: "David",
      totalDeLaVenta: 420,
      listadoDeProductos: [
        {
          idProducto: "CC_MR",
          tipoDeProducto: "Paste Salado",
          saborProducto: "Mocha Rebanado",
          cantidad: 10,
          precioProducto: 30,
          monto: 300,
        },
        {
          idProducto: "BV_FR",
          tipoDeProducto: "Paste Dulce",
          saborProducto: "Fresa",
          cantidad: 2,
          precioProducto: 60,
          monto: 120,
        },
      ],
    },
    {
      // 9
      fecha: "01/01/2024",
      nombreDelVendedor: "Roberto",
      totalDeLaVenta: 80,
      listadoDeProductos: [
        {
          idProducto: "BR_TP",
          tipoDeProducto: "Paste Salado",
          saborProducto: "Tres Pudines",
          cantidad: 1,
          precioProducto: 80,
          monto: 80,
        },
      ],
    },
    {
      // 10
      fecha: "28/02/2024",
      nombreDelVendedor: "Laura",
      totalDeLaVenta: 500,
      listadoDeProductos: [
        {
          idProducto: "TM_CH",
          tipoDeProducto: "Paste Dulce",
          saborProducto: "Chocolate",
          cantidad: 1,
          precioProducto: 500,
          monto: 500,
        },
      ],
    },
  ],
  reporteVentasIndividual: [
    {
      // 1
      fecha: "14/07/2023",
      nombreDelVendedor: "Ana",
      lugarDeVenta: "Sucursal",
      nombreLugarDeVenta: "Polanco",
      totalDeLaVenta: 1500,
      listadoDeProductos: [
        {
          idProducto: "O_L",
          tipoDeProducto: "Otros",
          saborProducto: "Limpieza",
          cantidad: 3,
          precioProducto: 100,
          monto: 300,
        },
        {
          idProducto: "PA_J",
          tipoDeProducto: "Paste Dulce",
          saborProducto: "Jeans",
          cantidad: 2,
          precioProducto: 500,
          monto: 1000,
        },
      ],
      correoElectronicoClienteFrecuente: "ana@gmail.com",
      puntosClienteFrecuente: 25,
    },
    {
      // 2
      fecha: "22/09/2023",
      nombreDelVendedor: "Carlos",
      lugarDeVenta: "Franquicia",
      nombreLugarDeVenta: "Centro Histórico",
      totalDeLaVenta: 780,
      listadoDeProductos: [
        {
          idProducto: "LB_B",
          tipoDeProducto: "Paste Dulce",
          saborProducto: "Biografía",
          cantidad: 1,
          precioProducto: 500,
          monto: 500,
        },
        {
          idProducto: "PE_E",
          tipoDeProducto: "Paste Salado",
          saborProducto: "Exótico",
          cantidad: 2,
          precioProducto: 140,
          monto: 280,
        },
        {
          idProducto: "CE_M",
          tipoDeProducto: "Otros",
          saborProducto: "Manga larga",
          cantidad: 1,
          precioProducto: 60,
          monto: 60,
        },
      ],
      correoElectronicoClienteFrecuente: "carlos@gmail.com",
      puntosClienteFrecuente: 10,
    },
    {
      // 3
      fecha: "05/12/2023",
      nombreDelVendedor: "Lucía",
      lugarDeVenta: "Sucursal",
      nombreLugarDeVenta: "Satélite",
      totalDeLaVenta: 4500,
      listadoDeProductos: [
        {
          idProducto: "PH_T",
          tipoDeProducto: "Paste Dulce",
          saborProducto: "Tecnología",
          cantidad: 1,
          precioProducto: 4000,
          monto: 4000,
        },
        {
          idProducto: "AU_A",
          tipoDeProducto: "Paste Salado",
          saborProducto: "Alámbricos",
          cantidad: 1,
          precioProducto: 500,
          monto: 500,
        },
      ],
      correoElectronicoClienteFrecuente: "lucia@gmail.com",
      puntosClienteFrecuente: 100,
    },
    {
      // 4
      fecha: "10/03/2023",
      nombreDelVendedor: "Pedro",
      lugarDeVenta: "Sucursal",
      nombreLugarDeVenta: "Condesa",
      totalDeLaVenta: 750,
      listadoDeProductos: [
        {
          idProducto: "ZP_D",
          tipoDeProducto: "Paste Dulce",
          saborProducto: "Deportivos",
          cantidad: 1,
          precioProducto: 600,
          monto: 600,
        },
        {
          idProducto: "CM_N",
          tipoDeProducto: "Paste Salado",
          saborProducto: "Negra",
          cantidad: 2,
          precioProducto: 75,
          monto: 150,
        },
      ],
      correoElectronicoClienteFrecuente: "pedro@gmail.com",
      puntosClienteFrecuente: 5,
    },
    {
      // 5
      fecha: "20/06/2023",
      nombreDelVendedor: "María",
      lugarDeVenta: "Franquicia",
      nombreLugarDeVenta: "Polanco",
      totalDeLaVenta: 1200,
      listadoDeProductos: [
        {
          idProducto: "CO_L",
          tipoDeProducto: "Paste Salado",
          saborProducto: "Laptop",
          cantidad: 1,
          precioProducto: 1000,
          monto: 1000,
        },
        {
          idProducto: "MP_T",
          tipoDeProducto: "Paste Dulce",
          saborProducto: "Tecnológico",
          cantidad: 1,
          precioProducto: 200,
          monto: 200,
        },
      ],
      correoElectronicoClienteFrecuente: "maria@gmail.com",
      puntosClienteFrecuente: 50,
    },
    {
      // 6
      fecha: "15/09/2023",
      nombreDelVendedor: "Luisa",
      lugarDeVenta: "Franquicia",
      nombreLugarDeVenta: "Centro Histórico",
      totalDeLaVenta: 900,
      listadoDeProductos: [
        {
          idProducto: "TV_S",
          tipoDeProducto: "Paste Dulce",
          saborProducto: "Smart TV",
          cantidad: 1,
          precioProducto: 800,
          monto: 800,
        },
        {
          idProducto: "B_C",
          tipoDeProducto: "Paste Salado",
          saborProducto: "Clásico",
          cantidad: 2,
          precioProducto: 50,
          monto: 100,
        },
      ],
      correoElectronicoClienteFrecuente: "luisa@gmail.com",
      puntosClienteFrecuente: 20,
    },
    {
      // 7
      fecha: "22/11/2023",
      nombreDelVendedor: "Carlos",
      lugarDeVenta: "Sucursal",
      nombreLugarDeVenta: "Polanco",
      totalDeLaVenta: 450,
      listadoDeProductos: [
        {
          idProducto: "RC_G",
          tipoDeProducto: "Paste Dulce",
          saborProducto: "Gala",
          cantidad: 1,
          precioProducto: 400,
          monto: 400,
        },
        {
          idProducto: "PS_DM",
          tipoDeProducto: "Paste Salado",
          saborProducto: "Doble Mole",
          cantidad: 3,
          precioProducto: 50,
          monto: 150,
        },
      ],
      correoElectronicoClienteFrecuente: "carlos@gmail.com",
      puntosClienteFrecuente: 10,
    },
    {
      // 8
      fecha: "5/5/2023",
      nombreDelVendedor: "Ana",
      lugarDeVenta: "Franquicia",
      nombreLugarDeVenta: "Providencia",
      totalDeLaVenta: 3200,
      listadoDeProductos: [
        {
          idProducto: "C_A",
          tipoDeProducto: "Otros",
          saborProducto: "Android",
          cantidad: 1,
          precioProducto: 3000,
          monto: 3000,
        },
        {
          idProducto: "CA_G",
          tipoDeProducto: "Paste Dulce",
          saborProducto: "Genérico",
          cantidad: 2,
          precioProducto: 100,
          monto: 200,
        },
      ],
      correoElectronicoClienteFrecuente: "ana@gmail.com",
      puntosClienteFrecuente: 100,
    },
    {
      // 9
      fecha: "10/3/2023",
      nombreDelVendedor: "Sofía",
      lugarDeVenta: "Sucursal",
      nombreLugarDeVenta: "Condesa",
      totalDeLaVenta: 750,
      listadoDeProductos: [
        {
          idProducto: "LP_LP",
          tipoDeProducto: "Paste Dulce",
          saborProducto: "Literatura Polaca",
          cantidad: 3,
          precioProducto: 150,
          monto: 450,
        },
        {
          idProducto: "PS_VV",
          tipoDeProducto: "Paste Salado",
          saborProducto: "Vegano",
          cantidad: 5,
          precioProducto: 60,
          monto: 300,
        },
      ],
      correoElectronicoClienteFrecuente: "sofia@gmail.com",
      puntosClienteFrecuente: 30,
    },
    {
      // 10
      fecha: "7/6/2023",
      nombreDelVendedor: "Pedro",
      lugarDeVenta: "Franquicia",
      nombreLugarDeVenta: "Polanco",
      totalDeLaVenta: 420,
      listadoDeProductos: [
        {
          idProducto: "AB_A",
          tipoDeProducto: "Paste Salado",
          saborProducto: "Aretes",
          cantidad: 1,
          precioProducto: 350,
          monto: 350,
        },
        {
          idProducto: "PD_CCM",
          tipoDeProducto: "Paste Dulce",
          saborProducto: "Cajeta con caramelo",
          cantidad: 2,
          precioProducto: 35,
          monto: 70,
        },
      ],
      correoElectronicoClienteFrecuente: "pedro@gmail.com",
      puntosClienteFrecuente: 5,
    },
  ],
  apartadoJuridico: [
    {
      // 1
      sucursalOFranquicia: "Franquicia",
      nombreSucursalOFranquicia: "Polanco",
      nombreDelArchivo: "Hoja Membretada_imSoft.pdf",
      urlDelArchivo:
        "https://firebasestorage.googleapis.com/v0/b/la-casa-del-paste.appspot.com/o/apartado-juridico%2FHoja%20Membretada_imSoft.pdf?alt=media&token=8a6d51af-97a6-4e47-b9f8-72596388444a",
    },
    {
      // 2
      sucursalOFranquicia: "Sucursal",
      nombreSucursalOFranquicia: "Condesa",
      nombreDelArchivo: "Hoja Membretada_imSoft.pdf",
      urlDelArchivo:
        "https://firebasestorage.googleapis.com/v0/b/la-casa-del-paste.appspot.com/o/apartado-juridico%2FHoja%20Membretada_imSoft.pdf?alt=media&token=8a6d51af-97a6-4e47-b9f8-72596388444a",
    },
    {
      // 3
      sucursalOFranquicia: "Sucursal",
      nombreSucursalOFranquicia: "Roma",
      nombreDelArchivo: "Hoja Membretada_imSoft.pdf",
      urlDelArchivo:
        "https://firebasestorage.googleapis.com/v0/b/la-casa-del-paste.appspot.com/o/apartado-juridico%2FHoja%20Membretada_imSoft.pdf?alt=media&token=8a6d51af-97a6-4e47-b9f8-72596388444a",
    },
    {
      // 4
      sucursalOFranquicia: "Franquicia",
      nombreSucursalOFranquicia: "Santa Fe",
      nombreDelArchivo: "Hoja Membretada_imSoft.pdf",
      urlDelArchivo:
        "https://firebasestorage.googleapis.com/v0/b/la-casa-del-paste.appspot.com/o/apartado-juridico%2FHoja%20Membretada_imSoft.pdf?alt=media&token=8a6d51af-97a6-4e47-b9f8-72596388444a",
    },
    {
      // 5
      sucursalOFranquicia: "Sucursal",
      nombreSucursalOFranquicia: "Polanco",
      nombreDelArchivo: "Hoja Membretada_imSoft.pdf",
      urlDelArchivo:
        "https://firebasestorage.googleapis.com/v0/b/la-casa-del-paste.appspot.com/o/apartado-juridico%2FHoja%20Membretada_imSoft.pdf?alt=media&token=8a6d51af-97a6-4e47-b9f8-72596388444a",
    },
    {
      // 6
      sucursalOFranquicia: "Franquicia",
      nombreSucursalOFranquicia: "Interlomas",
      nombreDelArchivo: "Hoja Membretada_imSoft.pdf",
      urlDelArchivo:
        "https://firebasestorage.googleapis.com/v0/b/la-casa-del-paste.appspot.com/o/apartado-juridico%2FHoja%20Membretada_imSoft.pdf?alt=media&token=8a6d51af-97a6-4e47-b9f8-72596388444a",
    },
    {
      // 7
      sucursalOFranquicia: "Sucursal",
      nombreSucursalOFranquicia: "Satélite",
      nombreDelArchivo: "Hoja Membretada_imSoft.pdf",
      urlDelArchivo:
        "https://firebasestorage.googleapis.com/v0/b/la-casa-del-paste.appspot.com/o/apartado-juridico%2FHoja%20Membretada_imSoft.pdf?alt=media&token=8a6d51af-97a6-4e47-b9f8-72596388444a",
    },
    {
      // 8
      sucursalOFranquicia: "Franquicia",
      nombreSucursalOFranquicia: "Centro Histórico",
      nombreDelArchivo: "Hoja Membretada_imSoft.pdf",
      urlDelArchivo:
        "https://firebasestorage.googleapis.com/v0/b/la-casa-del-paste.appspot.com/o/apartado-juridico%2FHoja%20Membretada_imSoft.pdf?alt=media&token=8a6d51af-97a6-4e47-b9f8-72596388444a",
    },
    {
      // 9
      sucursalOFranquicia: "Sucursal",
      nombreSucursalOFranquicia: "Providencia",
      nombreDelArchivo: "Hoja Membretada_imSoft.pdf",
      urlDelArchivo:
        "https://firebasestorage.googleapis.com/v0/b/la-casa-del-paste.appspot.com/o/apartado-juridico%2FHoja%20Membretada_imSoft.pdf?alt=media&token=8a6d51af-97a6-4e47-b9f8-72596388444a",
    },
    {
      // 10
      sucursalOFranquicia: "Sucursal",
      nombreSucursalOFranquicia: "Zapopan",
      nombreDelArchivo: "Hoja Membretada_imSoft.pdf",
      urlDelArchivo:
        "https://firebasestorage.googleapis.com/v0/b/la-casa-del-paste.appspot.com/o/apartado-juridico%2FHoja%20Membretada_imSoft.pdf?alt=media&token=8a6d51af-97a6-4e47-b9f8-72596388444a",
    },
  ],
  sucursalYFranquicia: [
    {
      // 1
      sucursalOFranquicia: "Sucursal",
      nombreSucursalOFranquicia: "Polanco",
      direccion: "Av. Presidente Masaryk #123",
      distancia: "20",
      fechaDePago: "15/03/2023",
      montoDePago: "78",
      cuentaBancaria: "MX31 2345 6789 1234 5678",
      banco: "Bancomer",
      nombreDelBeneficiario: "Juan Pérez",
      rfc: "PELJ890315DF",
    },
    {
      // 2
      sucursalOFranquicia: "Sucursal",
      nombreSucursalOFranquicia: "Condesa",
      direccion: "Av. Tamaulipas #456",
      distancia: "10",
      fechaDePago: "28/06/2023",
      montoDePago: "92.5",
      cuentaBancaria: "MX98 9876 5432 1098 7654",
      banco: "Santander",
      nombreDelBeneficiario: "Ana Gómez",
      rfc: "GOZA890623SD",
    },
    {
      // 3
      sucursalOFranquicia: "Franquicia",
      nombreSucursalOFranquicia: "Centro Histórico",
      direccion: "Calle de Madero #789",
      distancia: "5",
      fechaDePago: "10/09/2022",
      montoDePago: "65.75",
      cuentaBancaria: "MX76 1234 5678 9876 5432",
      banco: "HSBC",
      nombreDelBeneficiario: "Pedro Rodríguez",
      rfc: "ROPD800910LR",
    },
    {
      // 4
      sucursalOFranquicia: "Sucursal",
      nombreSucursalOFranquicia: "Santa Fe",
      direccion: "Av. Vasco de Quiroga #234",
      distancia: "15",
      fechaDePago: "05/11/2022",
      montoDePago: "150.25",
      cuentaBancaria: "MX45 6789 1234 9876 5432",
      banco: "Banorte",
      nombreDelBeneficiario: "María Hernández",
      rfc: "HEMM921105JK",
    },
    {
      // 5
      sucursalOFranquicia: "Franquicia",
      nombreSucursalOFranquicia: "Polanco II",
      direccion: "Av. Horacio #567",
      distancia: "12",
      fechaDePago: "20/07/2023",
      montoDePago: "42.99",
      cuentaBancaria: "MX22 5432 9876 1234 5678",
      banco: "Scotiabank",
      nombreDelBeneficiario: "Carlos Pérez",
      rfc: "PERC920720KQ",
    },
    {
      // 6
      sucursalOFranquicia: "Sucursal",
      nombreSucursalOFranquicia: "Roma Norte",
      direccion: "Calle de Álvaro Obregón #789",
      distancia: "8",
      fechaDePago: "12/12/2022",
      montoDePago: "25.50",
      cuentaBancaria: "MX89 1098 7654 5678 4321",
      banco: "Banregio",
      nombreDelBeneficiario: "Laura Morales",
      rfc: "MOLM910612RT",
    },
    {
      // 7
      sucursalOFranquicia: "Sucursal",
      nombreSucursalOFranquicia: "Providencia",
      direccion: "Av. Terranova #456",
      distancia: "6",
      fechaDePago: "08/09/2022",
      montoDePago: "37.75",
      cuentaBancaria: "MX12 8765 4321 9876 5432",
      banco: "Inbursa",
      nombreDelBeneficiario: "Juanita González",
      rfc: "GOJG880908HP",
    },
    {
      // 8
      sucursalOFranquicia: "Franquicia",
      nombreSucursalOFranquicia: "Las Águilas",
      direccion: "Av. Revolución #1234",
      distancia: "18",
      fechaDePago: "05/06/2023",
      montoDePago: "63.25",
      cuentaBancaria: "MX76 4321 9876 5678 1098",
      banco: "Banco del Bajío",
      nombreDelBeneficiario: "Pedro Gómez",
      rfc: "GOPG910605XT",
    },
    {
      // 9
      sucursalOFranquicia: "Sucursal",
      nombreSucursalOFranquicia: "Andares",
      direccion: "Av. Patria #5678",
      distancia: "22",
      fechaDePago: "18/03/2023",
      montoDePago: "92.00",
      cuentaBancaria: "MX22 9876 5432 1234 1098",
      banco: "Afirme",
      nombreDelBeneficiario: "Eduardo Martínez",
      rfc: "MAME891230PH",
    },
    {
      //10
      sucursalOFranquicia: "Franquicia",
      nombreSucursalOFranquicia: "Polanco",
      direccion: "Av. Presidente Masaryk #123",
      distancia: "12.5",
      fechaDePago: "02/04/2023",
      montoDePago: "150.75",
      cuentaBancaria: "US12 3456 7890 1234 5678",
      banco: "Bank of America",
      nombreDelBeneficiario: "Ana Sánchez",
      rfc: "SAAA8907125A",
    },
  ],
  personalDeMantenimiento: [
    {
      // 1
      nombre: "María Rodríguez",
      oficio: "Arquitecta",
      direccion: "Av. Reforma #456",
      telefono: "5512345678",
    },
    {
      // 2
      nombre: "Pedro Gómez",
      oficio: "Plomero",
      direccion: "Calle Juárez #789",
      telefono: "3323456789",
    },
    {
      // 3
      nombre: "Laura Torres",
      oficio: "Electricista",
      direccion: "Av. Hidalgo #234",
      telefono: "3334567890",
    },
    {
      // 4
      nombre: "Ricardo Fernández",
      oficio: "Pintor",
      direccion: "Calle 5 de Mayo #567",
      telefono: "5545678901",
    },
    {
      // 5
      nombre: "Carolina López",
      oficio: "Albañil",
      direccion: "Av. Insurgentes #890",
      telefono: "3312345678",
    },
    {
      // 6
      nombre: "Fernando Ramírez",
      oficio: "Jardinero",
      direccion: "Calle Zaragoza #123",
      telefono: "3323456789",
    },
    {
      // 7
      nombre: "Patricia Méndez",
      oficio: "Fontanera",
      direccion: "Av. Benito Juárez #456",
      telefono: "5512345678",
    },
    {
      // 8
      nombre: "Sergio Torres",
      oficio: "Cerrajero",
      direccion: "Calle Allende #789",
      telefono: "3334567890",
    },
    {
      // 9
      nombre: "Martha García",
      oficio: "Vidriera",
      direccion: "Av. Madero #234",
      telefono: "5545678901",
    },
    {
      // 10
      nombre: "Carlos Hernández",
      oficio: "Instalador de Aire Acondicionado",
      direccion: "Calle Reforma #567",
      telefono: "3312345678",
    },
  ],
  mantenimiento: [
    {
      // 1
      sucursalOFranquicia: "Sucursal",
      nombreSucursalOFranquicia: "Polanco",
      nombreMaquina: "Cafetera",
      proveedor: "Breville",
      fechaDeGarantia: "15/06/2025",
      fechaDeMantenimiento: "18/03/2023",
      modificacionDeMantenimiento: "Reemplazo de bomba de agua",
    },
    {
      // 2
      sucursalOFranquicia: "Franquicia",
      nombreSucursalOFranquicia: "Zapopan",
      nombreMaquina: "Horno",
      proveedor: "Whirlpool",
      fechaDeGarantia: "10/12/2024",
      fechaDeMantenimiento: "28/09/2023",
      modificacionDeMantenimiento: "Limpieza de quemadores",
    },
    {
      // 3
      sucursalOFranquicia: "Sucursal",
      nombreSucursalOFranquicia: "Reforma",
      nombreMaquina: "Batidora",
      proveedor: "KitchenAid",
      fechaDeGarantia: "05/08/2025",
      fechaDeMantenimiento: "14/11/2023",
      modificacionDeMantenimiento: "Cambio de motor",
    },
    {
      // 4
      sucursalOFranquicia: "Franquicia",
      nombreSucursalOFranquicia: "Condesa",
      nombreMaquina: "Freidora",
      proveedor: "T-fal",
      fechaDeGarantia: "20/09/2024",
      fechaDeMantenimiento: "30/07/2023",
      modificacionDeMantenimiento: "Limpieza profunda de cestillos",
    },
    {
      // 5
      sucursalOFranquicia: "Sucursal",
      nombreSucursalOFranquicia: "Satélite",
      nombreMaquina: "Máquina de café",
      proveedor: "Saeco",
      fechaDeGarantia: "18/03/2025",
      fechaDeMantenimiento: "12/10/2023",
      modificacionDeMantenimiento: "Calibración de molinillo",
    },
    {
      // 6
      sucursalOFranquicia: "Franquicia",
      nombreSucursalOFranquicia: "San Angel",
      nombreMaquina: "Extractor de jugos",
      proveedor: "Hurom",
      fechaDeGarantia: "25/07/2024",
      fechaDeMantenimiento: "05/12/2023",
      modificacionDeMantenimiento: "Cambio de filtros",
    },
    {
      // 7
      sucursalOFranquicia: "Franquicia",
      nombreSucursalOFranquicia: "Roma",
      nombreMaquina: "Extractor de jugos",
      proveedor: "Oster",
      fechaDeGarantia: "10/09/2024",
      fechaDeMantenimiento: "15/05/2023",
      modificacionDeMantenimiento: "Limpieza de filtro",
    },
    {
      // 8
      sucursalOFranquicia: "Sucursal",
      nombreSucursalOFranquicia: "Del Valle",
      nombreMaquina: "Licuadora",
      proveedor: "Hamilton Beach",
      fechaDeGarantia: "28/07/2025",
      fechaDeMantenimiento: "10/11/2023",
      modificacionDeMantenimiento: "Cambio de vaso",
    },
    {
      // 9
      sucursalOFranquicia: "Franquicia",
      nombreSucursalOFranquicia: "Coyoacán",
      nombreMaquina: "Horno",
      proveedor: "LG",
      fechaDeGarantia: "15/12/2024",
      fechaDeMantenimiento: "20/09/2023",
      modificacionDeMantenimiento: "Cambio de resistencia",
    },
    {
      // 10
      sucursalOFranquicia: "Sucursal",
      nombreSucursalOFranquicia: "Narvarte",
      nombreMaquina: "Cafetera",
      proveedor: "De'Longhi",
      fechaDeGarantia: "20/01/2025",
      fechaDeMantenimiento: "12/08/2023",
      modificacionDeMantenimiento: "Limpieza de sistema de leche",
    },
  ],
  reporteDeSalida: [
    {
      // 1
      sucursalAEnviar: "Polanco",
      nombreDelRepartidor: "María Rodríguez",
      datosDeLaRuta: "Pasará por Paseo de la Reforma",
      kilometrajeDeEntrada: "10",
      kilometrajeDeSalida: "18",
      listadoReporteDeSalida: [
        {
          uuid: 1,
          fecha: "2023-04-15",
          tipoDeProducto: "Bebidas",
          producto: "Refresco",
          codigoDelProducto: "B_R",
          cantidadDeProducto: 12,
        },
        {
          uuid: 2,
          fecha: "2023-04-28",
          tipoDeProducto: "Alimentos",
          producto: "Chips",
          codigoDelProducto: "A_C",
          cantidadDeProducto: 8,
        },
      ],
    },
    {
      // 2
      sucursalAEnviar: "Roma",
      nombreDelRepartidor: "Pedro García",
      datosDeLaRuta: "Pasará por Insurgentes Sur",
      kilometrajeDeEntrada: "5",
      kilometrajeDeSalida: "11",
      listadoReporteDeSalida: [
        {
          uuid: 1,
          fecha: "2023-04-16",
          tipoDeProducto: "Bebidas",
          producto: "Agua embotellada",
          codigoDelProducto: "B_A",
          cantidadDeProducto: 24,
        },
        {
          uuid: 2,
          fecha: "2023-04-29",
          tipoDeProducto: "Alimentos",
          producto: "Chocolate",
          codigoDelProducto: "A_CH",
          cantidadDeProducto: 10,
        },
      ],
    },
    {
      // 3
      sucursalAEnviar: "Del Valle",
      nombreDelRepartidor: "Carlos Martínez",
      datosDeLaRuta: "Pasará por Viaducto Miguel Alemán",
      kilometrajeDeEntrada: "8",
      kilometrajeDeSalida: "15",
      listadoReporteDeSalida: [
        {
          uuid: 1,
          fecha: "2023-04-17",
          tipoDeProducto: "Bebidas",
          producto: "Cerveza",
          codigoDelProducto: "B_C",
          cantidadDeProducto: 18,
        },
        {
          uuid: 2,
          fecha: "2023-04-30",
          tipoDeProducto: "Alimentos",
          producto: "Papas fritas",
          codigoDelProducto: "A_PF",
          cantidadDeProducto: 6,
        },
      ],
    },
    {
      // 4
      sucursalAEnviar: "Condesa",
      nombreDelRepartidor: "Mario Jiménez",
      datosDeLaRuta: "Pasará por Avenida Álvaro Obregón",
      kilometrajeDeEntrada: "6",
      kilometrajeDeSalida: "14",
      listadoReporteDeSalida: [
        {
          uuid: 1,
          fecha: "2023-04-19",
          tipoDeProducto: "Bebidas",
          producto: "Té helado",
          codigoDelProducto: "B_TH",
          cantidadDeProducto: 10,
        },
        {
          uuid: 2,
          fecha: "2023-05-01",
          tipoDeProducto: "Alimentos",
          producto: "Cereal",
          codigoDelProducto: "A_CE",
          cantidadDeProducto: 3,
        },
      ],
    },
    {
      // 5
      sucursalAEnviar: "Polanco",
      nombreDelRepartidor: "Laura Torres",
      datosDeLaRuta: "Pasará por Reforma Lomas",
      kilometrajeDeEntrada: "4",
      kilometrajeDeSalida: "12",
      listadoReporteDeSalida: [
        {
          uuid: 1,
          fecha: "2023-04-20",
          tipoDeProducto: "Bebidas",
          producto: "Refresco de cola",
          codigoDelProducto: "B_RC",
          cantidadDeProducto: 15,
        },
        {
          uuid: 2,
          fecha: "2023-05-02",
          tipoDeProducto: "Alimentos",
          producto: "Pizzas",
          codigoDelProducto: "A_PI",
          cantidadDeProducto: 4,
        },
      ],
    },
    {
      // 6
      sucursalAEnviar: "Centro",
      nombreDelRepartidor: "Jorge Ramírez",
      datosDeLaRuta: "Pasará por Calle Madero",
      kilometrajeDeEntrada: "7",
      kilometrajeDeSalida: "13",
      listadoReporteDeSalida: [
        {
          uuid: 1,
          fecha: "2023-04-21",
          tipoDeProducto: "Bebidas",
          producto: "Agua mineral",
          codigoDelProducto: "B_AM",
          cantidadDeProducto: 20,
        },
        {
          uuid: 2,
          fecha: "2023-05-03",
          tipoDeProducto: "Alimentos",
          producto: "Sandwiches",
          codigoDelProducto: "A_SA",
          cantidadDeProducto: 6,
        },
      ],
    },
    {
      // 7
      sucursalAEnviar: "Roma",
      nombreDelRepartidor: "María Fernández",
      datosDeLaRuta: "Pasará por Avenida Cuauhtémoc",
      kilometrajeDeEntrada: "5",
      kilometrajeDeSalida: "9",
      listadoReporteDeSalida: [
        {
          uuid: 1,
          fecha: "2023-04-23",
          tipoDeProducto: "Bebidas",
          producto: "Jugo de naranja",
          codigoDelProducto: "B_JN",
          cantidadDeProducto: 8,
        },
        {
          uuid: 2,
          fecha: "2023-05-04",
          tipoDeProducto: "Alimentos",
          producto: "Frutas",
          codigoDelProducto: "A_FR",
          cantidadDeProducto: 12,
        },
      ],
    },
    {
      // 8
      sucursalAEnviar: "Del Valle",
      nombreDelRepartidor: "Carlos Martínez",
      datosDeLaRuta: "Pasará por Avenida Universidad",
      kilometrajeDeEntrada: "6",
      kilometrajeDeSalida: "14",
      listadoReporteDeSalida: [
        {
          uuid: 1,
          fecha: "2023-04-24",
          tipoDeProducto: "Bebidas",
          producto: "Refresco de limón",
          codigoDelProducto: "B_RL",
          cantidadDeProducto: 6,
        },
        {
          uuid: 2,
          fecha: "2023-05-05",
          tipoDeProducto: "Alimentos",
          producto: "Snacks",
          codigoDelProducto: "A_SN",
          cantidadDeProducto: 8,
        },
      ],
    },
    {
      // 9
      sucursalAEnviar: "Polanco",
      nombreDelRepartidor: "Patricia Silva",
      datosDeLaRuta: "Pasará por Paseo de la Reforma",
      kilometrajeDeEntrada: "7",
      kilometrajeDeSalida: "13",
      listadoReporteDeSalida: [
        {
          uuid: 1,
          fecha: "2023-04-25",
          tipoDeProducto: "Bebidas",
          producto: "Agua con gas",
          codigoDelProducto: "B_AG",
          cantidadDeProducto: 10,
        },
        {
          uuid: 2,
          fecha: "2023-05-06",
          tipoDeProducto: "Alimentos",
          producto: "Hamburguesas",
          codigoDelProducto: "A_HB",
          cantidadDeProducto: 5,
        },
      ],
    },
    {
      // 10
      sucursalAEnviar: "Condesa",
      nombreDelRepartidor: "Andrés López",
      datosDeLaRuta: "Pasará por Avenida Tamaulipas",
      kilometrajeDeEntrada: "8",
      kilometrajeDeSalida: "17",
      listadoReporteDeSalida: [
        {
          uuid: 1,
          fecha: "2023-04-26",
          tipoDeProducto: "Bebidas",
          producto: "Té helado",
          codigoDelProducto: "B_TH",
          cantidadDeProducto: 7,
        },
        {
          uuid: 2,
          fecha: "2023-05-07",
          tipoDeProducto: "Alimentos",
          producto: "Pizza",
          codigoDelProducto: "A_PZ",
          cantidadDeProducto: 9,
        },
      ],
    },
  ],
  materiaPrima: [
    {
      // 1
      materiaPrima: "Manzana",
      unidades: "Kilogramos",
      temperatura: "Ambiente",
    },
    {
      // 2
      materiaPrima: "Papa",
      unidades: "Gramos",
      temperatura: "Ambiente",
    },
    {
      // 3
      materiaPrima: "Carne de res",
      unidades: "Gramos",
      temperatura: "Congelado",
    },
    {
      // 4
      materiaPrima: "Cebolla",
      unidades: "Kilogramos",
      temperatura: "Ambiente",
    },
    {
      // 5
      materiaPrima: "Tomate",
      unidades: "Kilogramos",
      temperatura: "Refrigerado",
    },
    {
      // 6
      materiaPrima: "Lechuga",
      unidades: "Kilogramos",
      temperatura: "Ambiente",
    },
    {
      // 7
      materiaPrima: "Aceite de oliva",
      unidades: "Litros",
      temperatura: "Ambiente",
    },
    {
      // 8
      materiaPrima: "Harina de trigo",
      unidades: "Gramos",
      temperatura: "Ambiente",
    },
    {
      // 9
      materiaPrima: "Azúcar",
      unidades: "Kilogramos",
      temperatura: "Ambiente",
    },
    {
      // 10
      materiaPrima: "Huevo",
      unidades: "Kilogramos",
      temperatura: "Refrigerado",
    },
  ],
  asignarComision: [
    {
      // 1
      sucursalOFranquicia: "Franquicia",
      minimoDeLaMeta: 5000,
      nombreSucursalOFranquicia: "Polanco",
      mes: "Noviembre",
      anio: "2024",
    },
    {
      // 2
      sucursalOFranquicia: "Sucursal",
      minimoDeLaMeta: 6000,
      nombreSucursalOFranquicia: "Reforma",
      mes: "Diciembre",
      anio: "2024",
    },
    {
      // 3
      sucursalOFranquicia: "Franquicia",
      minimoDeLaMeta: 7000,
      nombreSucursalOFranquicia: "Condesa",
      mes: "Enero",
      anio: "2025",
    },
    {
      // 4
      sucursalOFranquicia: "Sucursal",
      minimoDeLaMeta: 5500,
      nombreSucursalOFranquicia: "Del Valle",
      mes: "Febrero",
      anio: "2025",
    },
    {
      // 5
      sucursalOFranquicia: "Franquicia",
      minimoDeLaMeta: 9000,
      nombreSucursalOFranquicia: "Polanco",
      mes: "Marzo",
      anio: "2025",
    },
    {
      // 6
      sucursalOFranquicia: "Sucursal",
      minimoDeLaMeta: 7000,
      nombreSucursalOFranquicia: "Santa Fe",
      mes: "Abril",
      anio: "2025",
    },
    {
      // 7
      sucursalOFranquicia: "Franquicia",
      minimoDeLaMeta: 6500,
      nombreSucursalOFranquicia: "Roma",
      mes: "Mayo",
      anio: "2025",
    },
    {
      // 8
      sucursalOFranquicia: "Sucursal",
      minimoDeLaMeta: 7500,
      nombreSucursalOFranquicia: "Centro",
      mes: "Junio",
      anio: "2025",
    },
    {
      // 9
      sucursalOFranquicia: "Franquicia",
      minimoDeLaMeta: 6000,
      nombreSucursalOFranquicia: "Polanco",
      mes: "Julio",
      anio: "2025",
    },
    {
      // 10
      sucursalOFranquicia: "Sucursal",
      minimoDeLaMeta: 7000,
      nombreSucursalOFranquicia: "Reforma",
      mes: "Agosto",
      anio: "2025",
    },
  ],
  manejoDeAlmacen: [
    {
      // 1
      materiaPrima: "Tomate",
      unidades: "Kilogramos",
      temperatura: "Ambiente",
      cantidad: 250,
    },
    {
      // 2
      materiaPrima: "Papa",
      unidades: "Kilogramos",
      temperatura: "Ambiente",
      cantidad: 500,
    },
    {
      // 3
      materiaPrima: "Zanahoria",
      unidades: "Kilogramos",
      temperatura: "Ambiente",
      cantidad: 150,
    },
    {
      // 4
      materiaPrima: "Lechuga",
      unidades: "Kilogramos",
      temperatura: "Refrigerado",
      cantidad: 50,
    },
    {
      // 5
      materiaPrima: "Brócoli",
      unidades: "Kilogramos",
      temperatura: "Refrigerado",
      cantidad: 100,
    },
    {
      // 6
      materiaPrima: "Ajo",
      unidades: "Kilogramos",
      temperatura: "Ambiente",
      cantidad: 20,
    },
    {
      // 7
      materiaPrima: "Pimiento",
      unidades: "Kilogramos",
      temperatura: "Ambiente",
      cantidad: 80,
    },
    {
      // 8
      materiaPrima: "Coliflor",
      unidades: "Kilogramos",
      temperatura: "Refrigerado",
      cantidad: 75,
    },
    {
      // 9
      materiaPrima: "Espinaca",
      unidades: "Kilogramos",
      temperatura: "Refrigerado",
      cantidad: 30,
    },
    {
      // 10
      materiaPrima: "Pepino",
      unidades: "Kilogramos",
      temperatura: "Ambiente",
      cantidad: 40,
    },
  ],
  usuario: [
    {
      nombre: "Juan Pérez",
      correoElectronico: "juan@admin.com",
      contrasenia: bcrypt.hashSync("admin123"),
      role: ["admin"],
    },
    {
      nombre: "María Rodríguez",
      correoElectronico: "maria@contaduria.com",
      contrasenia: bcrypt.hashSync("contaduria456"),
      role: ["contaduria"],
    },
    {
      nombre: "Luis Gómez",
      correoElectronico: "luis@compras.com",
      contrasenia: bcrypt.hashSync("compras789"),
      role: ["gerencia de compras"],
    },
    {
      nombre: "Ana Martínez",
      correoElectronico: "ana@ventas.com",
      contrasenia: bcrypt.hashSync("ventas321"),
      role: ["gerencia de ventas"],
    },
    {
      nombre: "Carlos Sánchez",
      correoElectronico: "carlos@operativa.com",
      contrasenia: bcrypt.hashSync("operativa654"),
      role: ["gerencia operativa"],
    },
    {
      nombre: "Laura López",
      correoElectronico: "laura@rrhh.com",
      contrasenia: bcrypt.hashSync("rrhh987"),
      role: ["recursos humanos"],
    },
    {
      nombre: "Elvira Alcazar",
      correoElectronico: "elvira@alcazar.com",
      contrasenia: bcrypt.hashSync("elviraalcazar987"),
      role: ["gerencia de compras", "gerencia de ventas", "gerencia operativa"],
    },
  ],
};

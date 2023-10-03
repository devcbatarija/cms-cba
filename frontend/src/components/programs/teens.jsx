import CaracteristicasCurso from './ProgramComponent/ProgramaCaracteristica';
import CuadroInscripcion from '../inscripcion/incripcion';
import ListaPreciosCursos from './ProgramComponent/ProgramaPrecios';
import ProgramaOferta from './ProgramComponent/ProgramaOferta';
import RequisitosInscripcion from './ProgramComponent/ProgramaRequisitos';


const ofertaProps = {
  id: "1",
  imagenUrl: "https://creativeadvertising.ro/wp-content/uploads/2023/04/business.jpg",
  iconoUrl: "https://th.bing.com/th/id/R.f4d824992072c70247fce6773a393b6f?rik=sflnahOaaHzPwQ&pid=ImgRaw&r=0",
  titulo: "¿QUÉ APRENDERÁ EN ESTE PROGRAMA?",
  puntos: [
    "Aprenderás a presentarte y presentar a tus amigos.",
    "Dar información personal, hablar de tu familia, describir personas y objetos.",
    "Aumentarás tu vocabulario y hablarás sobre planes futuros.",
    "Te referirás a experiencias en el colegio, con tu familia y amigos.",
    "Podrás relatar experiencias pasadas, futuras, entender y contar historias."
  ]
};

const caracteristicasCursoProps = {
  imagenUrl: "https://cdn.goconqr.com/uploads/media/image/18714397/desktop_a7d21e94-1811-4ac5-a226-4e8e8494f284.jpg",
  titulo: "CARACTERISTICAS DEL CURSO",
  descripcion: "Los programas están organizados en diferentes áreas de habilidad para facilitar el estudio del idioma: Gramática, Vocabulario, Pronunciación, Escritura y Redacción. El programa que ofrecemos para niños de entre 7 y 10 años es el English for Kids, el mismo comprende 18 módulos bimestrales. La enseñanza de este programa se basa en juegos, canciones, adivinanzas, etc, lo cual motiva al niño para que asimile mucho más fácil el idioma. Los cursos son de 1 ½ hora diaria, de lunes a viernes y están disponibles en horarios de la tarde de 14:45 a 16:15 y de 16:25 a 17:55."
};

const requisitosInscripcionProps = {
  imagenUrl: "https://th.bing.com/th/id/R.c162d9ccc85bd1bfa50bb9326ae63cbe?rik=d9UiAQcodmfAFA&riu=http%3a%2f%2fwww.galileo.edu%2fpage%2fwp-content%2fuploads%2f2020%2f10%2ficonos_requisitos.png&ehk=25%2fmHjHyN%2b6nwdBewY3XS5e4S4O57oYIPhyEbWcUItc%3d&risl=&pid=ImgRaw&r=0",
  requisitos: [
    "Fotocopia de CI o Certificado de Nacimiento",
    "Fotocopia libreta del último curso aprobado",
    "Visa de estudios (Solo extranjeros)"
  ]
};

const preciosCursosProps = [
  { nombre: "Children", horario: "Tarde 16:15 17:45", modalidad: "Presencial", costo: 600 },
  { nombre: "Adultos", horario: "Noche 18:00 19:30", modalidad: "Virtual", costo: 800 }
];

const ProgramTeens = () => {
  return (
    <>
      <div className='w-full sm:w-9/10 md:w-8/10 lg:w-7/10 xl:w-6/10 2xl:w-5/10 mx-auto justify-center bg-gray-50'>
        <div className='InformationContainer'>
          <ProgramaOferta {...ofertaProps} />
          <div id='2' className="mt-4 p-4 rounded-lg text-gray-700 blur-10 flex flex-col md:flex-row border-b border-gray-300 ">
            <CaracteristicasCurso {...caracteristicasCursoProps} />
            <RequisitosInscripcion {...requisitosInscripcionProps} />
          </div>
          <div className="padding-40  text-center">
            <ListaPreciosCursos preciosCursos={preciosCursosProps} />
          </div>
        </div>
        <div className='mt-4'>
          <CuadroInscripcion />
        </div>
      </div>
    </>
  );
}

export default ProgramTeens;
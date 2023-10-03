import Carousel from '../carusel/carusel';
import CuadroInscripcion from '../inscripcion/incripcion';

const ProgramAdults = () => {

  return (
    <>
      <div className='w-full sm:w-9/10 md:w-8/10 lg:w-7/10 xl:w-6/10 2xl:w-5/10 mx-auto justify-center bg-gray-50'>
        <div className='InformationContainer'>
          <div id='1' className="program-container flex flex-col md:flex-row lg:flex-row items-center justify-center border-b border-gray-300">
            <div className="ImagenPrincipal w-full md:w-1/2  p-0">
              <div style={{
                backgroundImage: `url("https://costaaraucania.educacionpublica.cl/wp-content/uploads/2020/03/EDUMAT-2020-3.jpeg")`,
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                height: "50vh",
                width: "100%"
              }}>
              </div>
            </div>
            <div className="mt-4 md:mt-0 md:ml-4 md:w-1/2 md:mt-4 text-justify pb-4 pl-4 pr-6 pt-4">
              <div className='imagen flex items-center h-full'>
                <img className='imagenPequena w-30 h-20' src="https://th.bing.com/th/id/R.f4d824992072c70247fce6773a393b6f?rik=sflnahOaaHzPwQ&pid=ImgRaw&r=0" alt="estudianteIcon" />
              </div>
              <br />
              <br />
              <div className='w-full sm:w-9/10 md:w-8/10 lg:w-7/10 xl:w-6/10 2xl:w-5/10 justify-center flex-col md:flex-row justify-center ' >
                <p className="text-2xl font-bold text-black">¿QUÉ APRENDERÁ EN ESTE PROGRAMA?</p>
                <br />
                <div className='text-justify'>
                  <ul className="list-disc pl-4 list-none">
                    <li className="text-1xl text-gray-600">Aprenderás a presentarte y presentar a tus amigos.</li>
                    <li className="text-1xl text-gray-600">Dar información personal, hablar de tu familia, describir personas y objetos.</li>
                    <li className="text-1xl text-gray-600">Aumentarás tu vocabulario y hablarás sobre planes futuros.</li>
                    <li className="text-1xl text-gray-600">Te referirás a experiencias en el colegio, con tu familia y amigos.</li>
                    <li className="text-1xl text-gray-600">Podrás relatar experiencias pasadas, futuras, entender y contar historias.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div id='2' className="mt-4 p-4 rounded-lg text-gray-700 blur-10 flex flex-col md:flex-row border-b border-gray-300 ">
            <div className="w-full md:w-1/2 mt-4 p-2 rounded-lg text-center">
              <div className='imagen flex items-center '>
                <img className='imagenPequena w-15 h-20' src="https://cdn.goconqr.com/uploads/media/image/18714397/desktop_a7d21e94-1811-4ac5-a226-4e8e8494f284.jpg" alt="estudianteIcon" />
              </div>
              <h2 className="text-2xl font-bold text-center">CARACTERISTICAS DEL CURSO</h2>
              <br />
              <div className="text-justify">
                <p>
                  Los programas están organizados en diferentes áreas de habilidad para facilitar el estudio del idioma: Gramática, Vocabulario,
                  Pronunciación, Escritura y Redacción. El programa que ofrecemos para niños de entre 7 y 10 años es el English for Kids, el mismo comprende
                  18 módulos bimestrales. La enseñanza de este programa se basa en juegos, canciones, adivinanzas, etc, lo cual motiva al niño para que
                  asimile mucho más fácil el idioma. Los cursos son de 1 ½ hora diaria, de lunes a viernes y están disponibles en horarios de la tarde
                  de 14:45 a 16:15 y de 16:25 a 17:55.
                </p>
              </div>
            </div>
            <div className="w-full md:w-1/2 mt-4 p-5 rounded-lg text-center">
              <div className='imagen flex items-center '>
                <img className='imagenPequena w-15 h-20' src="https://th.bing.com/th/id/R.c162d9ccc85bd1bfa50bb9326ae63cbe?rik=d9UiAQcodmfAFA&riu=http%3a%2f%2fwww.galileo.edu%2fpage%2fwp-content%2fuploads%2f2020%2f10%2ficonos_requisitos.png&ehk=25%2fmHjHyN%2b6nwdBewY3XS5e4S4O57oYIPhyEbWcUItc%3d&risl=&pid=ImgRaw&r=0" alt="estudianteIcon" />
              </div>
              <h2 className="text-2xl font-bold">REQUISITOS DE INSCRIPCION</h2>
              <br />
              <ul className="list-disc pl-4 list-none">
                <li>Fotocopia de CI o Certificado de Nacimiento</li>
                <li>Fotocopia libreta del ultimo curso aprobado</li>
                <li>Visa de estudios (Solo extranjeros)</li>
              </ul>
              <br />
            </div>
          </div>
          <div className="padding-40  text-center">
            <div>
              <br />
              <h2 className="text-2xl font-bold">PRECIOS DE NUESTROS CURSOS</h2>
              <table className="border-collapse w-full sm:w-9/10 md:w-8/10 lg:w-7/10 xl:w-6/10 2xl:w-5/10 mx-auto text-center">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b border-gray-300 text-black">Curso</th>
                    <th className="py-2 px-4 border-b border-gray-300 text-black">Horario</th>
                    <th className="py-2 px-4 border-b border-gray-300 text-black">Modalidad</th>
                    <th className="py-2 px-4 border-b border-gray-300 text-black">Costo</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-2 px-4 border-b border-gray-300">Children</td>
                    <td className="py-2 px-4 border-b border-gray-300">Tarde 16:15 17:45</td>
                    <td className="py-2 px-4 border-b border-gray-300">Presencial</td>
                    <td className="py-2 px-4 border-b border-gray-300">600</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border-b border-gray-300">Children</td>
                    <td className="py-2 px-4 border-b border-gray-300">Tarde 16:15 17:45</td>
                    <td className="py-2 px-4 border-b border-gray-300">Presencial</td>
                    <td className="py-2 px-4 border-b border-gray-300">600</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className='mt-4'>
          <CuadroInscripcion />
          <br />
          <br />
        </div>
      </div>
    </>
  );
}
export default ProgramAdults;

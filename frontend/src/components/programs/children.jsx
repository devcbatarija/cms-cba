import Carousel from '../carusel/carusel';
import CuadroInscripcion from '../inscripcion/incripcion';

const ProgramChildren = () => {
  return (
    <>
      <div className='w-9/10 mx-auto justify-center bg-gray-50 mx-auto p-30'>
        <div className='InformationContainer' style={{ padding: '0 100px'}}>
          <div className="flex flex-col md:flex-row items-center justify-center">
            <img
              className="w-full md:w-1/2 h-90 object-cover"
              src="https://st2.depositphotos.com/2309453/5324/i/450/depositphotos_53241145-stock-photo-children-studying-in-kindergarten-school.jpg"
              alt="imagen de programa"
            />
            <div className="mt-4 md:mt-0 md:ml-4 md:w-1/2 text-justify">
              <p className="text-3xl font-bold" style={{ color: "black" }}>¿Qué aprendo en este programa?</p>
              <ul className="list-disc pl-4">
                <li className="text-xl font-semibold text-gray-600" >Aprenderás a presentarte y presentar a tus amigos.</li>
                <li className="text-xl font-semibold text-gray-600" >Dar información personal, hablar de tu familia, describir personas y objetos.</li>
                <li className="text-xl font-semibold text-gray-600" >Aumentarás tu vocabulario y hablarás sobre planes futuros.</li>
                <li className="text-xl font-semibold text-gray-600" >Te referirás a experiencias en el colegio, con tu familia y amigos.</li>
                <li className="text-xl font-semibold text-gray-600" >Podrás relatar experiencias pasadas, futuras, entender y contar historias.</li>
              </ul>
            </div>
          </div>

          <div className="mt-4 p-4 rounded-lg text-gray-700" style={{ backgroundColor: "rgba(255, 255, 255, 0.5)",  backdropFilter: "blur(10px)" }}>
            <h2 className="text-2xl font-bold" style={{ textAlign: "center" }}>CARACTERISTICAS DEL CURSO</h2>
            <p style={{ textAlign: "center" }}>
              Los programas están organizados en diferentes áreas de habilidad para facilitar el estudio del idioma: Gramática, Vocabulario,
              Pronunciación, Escritura y Redacción. El programa que ofrecemos para niños de entre 7 y 10 años es el English for Kids, el mismo comprende
              18 módulos bimestrales. La enseñanza de este programa se basa en juegos, canciones, adivinanzas, etc, lo cual motiva al niño para que
              asimile mucho más fácil el idioma. Los cursos son de 1 ½ hora diaria, de lunes a viernes y están disponibles en horarios de la tarde
              de 14:45 a 16:15 y de 16:25 a 17:55.
            </p>
            <div style={{ padding: "40px" }}>
              <table className="border-collapse w-1/2 mx-auto text-center">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b border-gray-300 bg-blue-700 text-white">Curso</th>
                    <th className="py-2 px-4 border-b border-gray-300 bg-blue-700 text-white">Horario</th>
                    <th className="py-2 px-4 border-b border-gray-300 bg-blue-700 text-white">Modalidad</th>
                    <th className="py-2 px-4 border-b border-gray-300 bg-blue-700 text-white">Costo</th>
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
                    <td className="py-2 px-4 border-b border-gray-300">Noche 19:00 20:30</td>
                    <td className="py-2 px-4 border-b border-gray-300">Virtual</td>
                    <td className="py-2 px-4 border-b border-gray-300">500</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="mt-4 p-4 bg-white rounded-lg" style={{ textAlign: "center" }}>
            <h2 className="text-2xl font-bold">Requisitos de inscripcion</h2>
            <ul className="list-disc pl-4 list-none">
              <li>Fotocopia de CI o Certificado de Nacimiento</li>
              <li>Fotocopia libreta del ultimo curso aprobado</li>
              <li>Visa de estudios (Solo extranjeros)</li>
            </ul>
          </div>
        </div>
        <div className='mt-4'>
          <Carousel />
          <CuadroInscripcion />
        </div>
      </div>
    </>
  );
}
export default ProgramChildren;

import ImagenFondo from "../educationUSA/EdUSAComponents/ImagenComponent";
import ServicioComponent from "../educationUSA/EdUSAComponents/ServicioComponent";
import CuadroInscripcion from "../inscripcion/incripcion";

const Banner = "https://formaciontecnicabolivia.org/sites/default/files/institutos/cbatarija.jpg"
const About = () => {
    const servicioProps = {
        titulo: "   ",
        contenido: {
            title: "Traducción de documentos",
            text: "Recuerda que también contamos con el servicio de traducción de documentos. Los documentos pueden ser traducidos del Inglés al Español y viceversa. El tiempo para la traducción de un documento es variable dependiendo del tipo y del tamaño del documento. Recuerda que también contamos con el servicio de traducción de documentos. Los documentos pueden ser traducidos del Inglés al Español y viceversa. El tiempo para la traducción de un documento es variable dependiendo del tipo y del tamaño del documento."
        },
        imagenUrl: "https://image.freepik.com/free-photo/beautiful-woman-dressed-formally-office-writing_273609-4786.jpg"
    };
    return (
        <>
            <ImagenFondo imageUrl={Banner} />
            <ServicioComponent {...servicioProps} numero={2} />
            <ServicioComponent {...servicioProps} />
            <ServicioComponent {...servicioProps} numero={2} />


            <CuadroInscripcion />
        </>
    );
}

export default About;
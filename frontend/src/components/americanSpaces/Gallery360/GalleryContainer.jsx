import { useEffect, useState } from 'react';
import imagen from '../../../assets/pruebita.jpg'
import imagen2 from '../../../assets/pruebita2.jpg'
import imagen3 from '../../../assets/pruebita3.jpg'
import imagen4 from '../../../assets/pruebita4.jpg'
import Gallery360 from './Display360Component';
import SidebarAmbiente from './SidebarAmbiente';
import CarouselGallery360 from './CarouselGallery360p';

const ambientes = [
    {
        key: "biblioteca",
        descripcion: "imagene de la bilbioteca",
        imagen: [imagen, imagen3]
    },
    {
        key: "cafeteria",
        descripcion: "imagene de la cafeteria",
        imagen: [imagen2, imagen4]
    }
];

export default function GalleryContainer() {
    const [ambienteSelected, setAmbienteSelected] = useState(ambientes[0]);
    const [imageSelected, setImageSelected] = useState('');

    const handleSelectedAmbiente = (obj) => {
        setAmbienteSelected(obj)
        setImageSelected(obj.imagen[0])
    }

    const handleSelectedImage = (img) => {
        setImageSelected(img)
    }
    useEffect(() => {
        setImageSelected(ambienteSelected.imagen[0]);
    }, [ambienteSelected]);
    return (
        <div className='flex flex-col md:flex-row'>
            <div className='w-full md:w-5/6 p-1 bg-gray-200 order-2 md:order-1'>
                <div>
                    <Gallery360 image={imageSelected} />
                </div>
                <div className='w-full flex items-center justify-center'>
                    <CarouselGallery360 selected={ambienteSelected} handleSelectedImage={handleSelectedImage} />
                </div>
            </div>
            <div className='w-full md:w-1/6 p-1 order-1 md:order-2'>
                <SidebarAmbiente ambientes={ambientes} handleSelectedAmbiente={handleSelectedAmbiente} />
            </div>
        </div>

    );
}
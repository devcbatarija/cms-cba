import React, { useEffect, useState } from 'react';
import Gallery360 from './Display360Component';
import SidebarAmbiente from './SidebarAmbiente';
import CarouselGallery360 from './CarouselGallery360p';
import { useDispatch, useSelector } from "react-redux";
import { getAllAmbientes } from '../../../redux-toolkit/actions/galleryActions';

export default function GalleryContainer() {
    const dataEvironment= useSelector((state)=>state.gallery.ambient)
    const [ambienteSelected, setAmbienteSelected] = useState(dataEvironment[0]);
    const [imageSelected, setImageSelected] = useState('');
    const [ambienteAvailable, setAmbienteAvailable] = useState(true);
console.log(dataEvironment)
    const dispatch=useDispatch();

    const handleSelectedAmbiente = (obj) => {
        setAmbienteSelected(obj)
        setImageSelected(obj.Galleries[0].image)
        // Verificar si el ambiente seleccionado tiene imágenes
        setAmbienteAvailable(obj.Galleries.length > 0);
    }

    const handleSelectedImage = (img) => {
        setImageSelected(img)
    }
    
    useEffect(() => {
        // Verificar si el ambiente seleccionado tiene imágenes
        if (ambienteSelected && ambienteSelected.Galleries.length > 0) {
            setImageSelected(ambienteSelected.Galleries[0].image);
            setAmbienteAvailable(true);
        } else {
            // Si el ambiente seleccionado no tiene imágenes, mostrar el mensaje y desactivar la disponibilidad del ambiente
            setAmbienteAvailable(false);
        }
        dispatch(getAllAmbientes())
    }, [ambienteSelected]);

    return (
        <div className='flex flex-col md:flex-row'>
            <div className='w-full md:w-5/6 p-1 bg-gray-200 order-2 md:order-2'>
                <div>
                    {ambienteAvailable ? (
                        <Gallery360 image={imageSelected} />
                    ) : (
                        <Gallery360 image={imageSelected}/>
                    )}
                </div>
                <div className='w-full flex items-center justify-center'>
                    <CarouselGallery360 selected={ambienteSelected} handleSelectedImage={handleSelectedImage} />
                </div>
            </div>
            <div className='w-full md:w-1/6 p-1 order-1 md:order-1'>
                <SidebarAmbiente ambientes={dataEvironment} handleSelectedAmbiente={handleSelectedAmbiente} />
            </div>
        </div>
    );
}

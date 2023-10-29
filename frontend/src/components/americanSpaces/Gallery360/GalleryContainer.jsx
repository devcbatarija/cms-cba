import React, { useEffect, useState } from 'react';
import Gallery360 from './Display360Component';
import SidebarAmbiente from './SidebarAmbiente';
import CarouselGallery360 from './CarouselGallery360p';
import { useDispatch, useSelector } from "react-redux";
import { getAllAmbientes } from '../../../redux-toolkit/actions/galleryActions';

export default function GalleryContainer() {
    const dataEvironment = useSelector((state) => state.gallery.ambient)
    const [ambienteSelected, setAmbienteSelected] = useState(null);
    const [imageSelected, setImageSelected] = useState('');
    const [ambienteAvailable, setAmbienteAvailable] = useState(false);
    const dispatch = useDispatch();

    const handleSelectedAmbiente = (obj) => {
        setAmbienteSelected(obj)
        setImageSelected(obj.Galleries[0].image)
        setAmbienteAvailable(obj.Galleries.length > 0);
    }
    const handleSelectedImage = (img) => {
        setImageSelected(img)
    }

    useEffect(() => {
        if (ambienteSelected && ambienteSelected.Galleries.length > 0) {
            setImageSelected(ambienteSelected.Galleries[0].image);
            setAmbienteAvailable(true);
        } else {
            setAmbienteAvailable(false);
        }
    }, [ambienteSelected]);

    useEffect(() => {
        dispatch(getAllAmbientes())
    }, []);

    return (
        dataEvironment && dataEvironment.length > 0 ? (
            <div className='flex flex-col md:flex-row'>
                <div className='w-full md:w-5/6 p-1 order-2 md:order-2'>
                    <div>
                        {ambienteSelected ? (
                            ambienteAvailable ? (
                                <Gallery360 image={imageSelected} />
                            ) : (
                                <div class="flex justify-center items-center h-52">
                                    <strong>Actualmente no hay imágenes del ambiente</strong>
                                </div>
                            )
                        ) : (
                            <div class="flex justify-center items-center h-52">
                                <strong className=''>Por favor, selecciona un ambiente</strong>
                            </div>
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
        ) : (
            <div class="flex justify-center items-center h-52">
                <strong>No existen ambientes</strong>
            </div>
        )
    );
}

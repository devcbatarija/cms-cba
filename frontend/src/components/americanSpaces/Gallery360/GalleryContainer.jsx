import { useEffect, useState } from 'react';
import imagen from '../../../assets/pruebita.jpg'
import imagen2 from '../../../assets/pruebita2.jpg'
import imagen3 from '../../../assets/pruebita3.jpg'
import imagen4 from '../../../assets/pruebita4.jpg'
import Gallery360 from './Display360Component';
import SidebarAmbiente from './SidebarAmbiente';
import CarouselGallery360 from './CarouselGallery360p';
import { useDispatch, useSelector } from "react-redux";
import { getAllAmbientes } from '../../../redux-toolkit/actions/galleryActions';

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
const example=[
	{
		id_ambiente: "80025293-5215-44ab-b398-c1c47c99e3f8",
		descripcion: "esto es una descripcion",
		nombre: "biblioteca",
		createdAt: "2023-10-10T15:10:32.650Z",
		updatedAt: "2023-10-10T15:10:32.650Z",
		UsuarioIdUsuario: "a7379baf-c1bc-4dd1-914e-be5924999679",
		Galleries: [
			{
				id_gallery: "64edbdef-7f9a-424b-8609-dc1eaa6bc159",
				image: "    ",
				createdAt: "2023-10-10T15:23:34.042Z",
				updatedAt: "2023-10-10T15:23:34.042Z",
				AmbienteIdAmbiente: "80025293-5215-44ab-b398-c1c47c99e3f8"
			}
		]
	},
	{
		id_ambiente: "80025293-5215-44ab-b398-c1c47c99e3f8",
		descripcion: "esto es una descripcion",
		nombre: "biblioteca",
		createdAt: "2023-10-10T15:10:32.650Z",
		updatedAt: "2023-10-10T15:10:32.650Z",
		UsuarioIdUsuario: "a7379baf-c1bc-4dd1-914e-be5924999679",
		Galleries: [
			{
				id_gallery: "64edbdef-7f9a-424b-8609-dc1eaa6bc159",
				image: "https://www.bing.com/images/search?view=detailV2&ccid=I5g1Vksm&id=E8AEF7EF4DFB8E57414C392B576D640779608B21&thid=OIP.I5g1Vksma2COh-MQf5KPKgAAAA&mediaurl=https%3a%2f%2fcdn.xl.thumbs.canstockphoto.es%2f-almacen-de-fotos_csp8768743.jpg&cdnurl=https%3a%2f%2fth.bing.com%2fth%2fid%2fR.239835564b266b608e87e3107f928f2a%3frik%3dIYtgeQdkbVcrOQ%26pid%3dImgRaw%26r%3d0&exph=254&expw=360&q=imagen+de+estudiantes+en+clase+360&simid=608050383390135913&FORM=IRPRST&ck=ADA943C995193715294D37B4BD4B7AC9&selectedIndex=18",
				createdAt: "2023-10-10T15:23:34.042Z",
				updatedAt: "2023-10-10T15:23:34.042Z",
				AmbienteIdAmbiente: "80025293-5215-44ab-b398-c1c47c99e3f8"
			}
		]
	},
]

export default function GalleryContainer() {
    const dataEvironment= useSelector((state)=>state.gallery.ambient)

    const [ambienteSelected, setAmbienteSelected] = useState(dataEvironment[0]);
    const [imageSelected, setImageSelected] = useState('');


    const dispatch=useDispatch();

    const handleSelectedAmbiente = (obj) => {
        setAmbienteSelected(obj)
        setImageSelected(obj.Galleries[0].image)
    }

    const handleSelectedImage = (img) => {
        setImageSelected(img)
    }
    useEffect(() => {
        ambienteSelected?setImageSelected(ambienteSelected.Galleries[0].image):null
        dispatch(getAllAmbientes())
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
                <SidebarAmbiente ambientes={dataEvironment} handleSelectedAmbiente={handleSelectedAmbiente} />
            </div>
        </div>

    );
}
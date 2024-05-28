import React, { useState } from 'react';

const images = [
    { id: 1, category: 'Biblioteca', src: 'https://e00-elmundo.uecdn.es/elmundo/imagenes/2008/06/01/1212341852_0.jpg', name: 'Biblioteca', description: 'Descripción de la biblioteca.' },
    { id: 2, category: 'Biblioteca', src: 'https://www.vagalume.com.br/bon-jovi/images/87749.jpg', name: 'Biblioteca', description: 'Descripción de la biblioteca.' },
    { id: 3, category: 'Biblioteca', src: 'https://th.bing.com/th/id/R.8891920a69d01ebb21bb04cad959221e?rik=FloenOReUhAvXg&riu=http%3a%2f%2fimages4.fanpop.com%2fimage%2fphotos%2f17000000%2fbon-jovi-bon-jovi-17035919-358-600.jpg&ehk=JWjPeLRr0k6IVgFglZ9%2fkVHBwuyg7D82%2frEMsr6vLxs%3d&risl=&pid=ImgRaw&r=0', name: 'Biblioteca', description: 'Descripción de la biblioteca.' },
    { id: 5, category: 'Biblioteca', src: 'https://th.bing.com/th/id/R.f94ad482791979d9ceed0f8f2fab9b2d?rik=xtc%2fMmvPX5ZsEw&pid=ImgRaw&r=0', name: 'Biblioteca', description: 'Descripción de la biblioteca.' },
];


const AmericanSpaces = () => {
    const [selectedImage, setSelectedImage] = useState(null);

    const imagesByCategory = {};
    images.forEach(image => {
        if (!imagesByCategory[image.category]) {
            imagesByCategory[image.category] = [];
        }
        imagesByCategory[image.category].push(image);
    });

    return (
        <>
            <div>
                <img
                    className="w-full h-auto"
                    src="https://i.ibb.co/5vfhNFc/American-Spaces-Image.png"
                    alt="Capitolio"
                />
                <div className="">
                    <div className="flex flex-wrap ">
                        <div className="w-full lg:w-2/5 flex flex-col md:flex-row lg:flex-col pl-7 pr-7 pt-10 ">
                            <h1 className="mb-4 text-2xl font-extrabold  text-gray-900 dark:text-white md:text-2xl lg:text-2xl">
                                <span className="text-transparent  bg-clip-text bg-gradient-to-r to-blue-700 from-sky-800">
                                    LA OFICINA DE LOS ESPACIOS AMERICANOS
                                </span>
                            </h1>
                            <div className=''>
                                <p className='text-justify'>
                                    Los Espacios Americanos son centros culturales e informativos del gobierno de EE. UU. en el extranjero que ofrecen acceso gratuito a información y programas sobre los Estados Unidos. Con más de 600 ubicaciones en 140 países, promueven el entendimiento mutuo y la asociación a través de eventos, programas y tecnología avanzada. Estos espacios muestran los valores estadounidenses de innovación, diversidad y apertura, y fomentan el aprendizaje, la discusión y la participación cívica.
                                </p>
                            </div>

                        </div>
                        <div className="w-full lg:w-3/5 flex flex-col md:flex-row lg:flex-col pt-5 pb-5">
                            <img src="https://i.ibb.co/89MNbCd/download-image-1714419828264.png" alt="" />
                        </div>
                    </div>
                    <div className="w-full lg:w-1/5 flex flex-col md:flex-row lg:flex-col">
                    </div>
                </div>
            </div>
        </>
    );
};

export default AmericanSpaces;
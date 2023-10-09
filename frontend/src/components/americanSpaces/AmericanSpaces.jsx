import React, { useState } from 'react';
import Masonry from 'react-masonry-css';
import './AmericanSpaces.css';


const images = [
    { id: 1, category: 'Biblioteca', src: 'https://e00-elmundo.uecdn.es/elmundo/imagenes/2008/06/01/1212341852_0.jpg', name: 'Biblioteca', description: 'Descripción de la biblioteca.' },
    { id: 2, category: 'Biblioteca', src: 'https://www.vagalume.com.br/bon-jovi/images/87749.jpg', name: 'Biblioteca', description: 'Descripción de la biblioteca.' },
    { id: 3, category: 'Biblioteca', src: 'https://th.bing.com/th/id/R.8891920a69d01ebb21bb04cad959221e?rik=FloenOReUhAvXg&riu=http%3a%2f%2fimages4.fanpop.com%2fimage%2fphotos%2f17000000%2fbon-jovi-bon-jovi-17035919-358-600.jpg&ehk=JWjPeLRr0k6IVgFglZ9%2fkVHBwuyg7D82%2frEMsr6vLxs%3d&risl=&pid=ImgRaw&r=0', name: 'Biblioteca', description: 'Descripción de la biblioteca.' },
    { id: 4, category: 'Biblioteca', src: 'https://th.bing.com/th/id/OIP.jGEr0zH5BmB5Ques5ISMDAAAAA?pid=ImgDet&w=400&h=345&rs=1', name: 'Biblioteca', description: 'Descripción de la biblioteca.' },
    { id: 5, category: 'Biblioteca', src: 'https://th.bing.com/th/id/R.f94ad482791979d9ceed0f8f2fab9b2d?rik=xtc%2fMmvPX5ZsEw&pid=ImgRaw&r=0', name: 'Biblioteca', description: 'Descripción de la biblioteca.' },
    { id: 6, category: 'Biblioteca', src: 'https://th.bing.com/th/id/OIP.9KiCRSAaZUCmqY1dwfUqkwHaEo?pid=ImgDet&w=620&h=388&rs=1', name: 'Biblioteca', description: 'Descripción de la biblioteca.' },
    { id: 7, category: 'Biblioteca', src: 'https://th.bing.com/th/id/OIP.yR-ps8U7sKxSCrc82ZzDnQHaEv?pid=ImgDet&w=1024&h=656&rs=1', name: 'Biblioteca', description: 'Descripción de la biblioteca.' },
    { id: 8, category: 'Biblioteca', src: 'https://e00-elmundo.uecdn.es/elmundo/imagenes/2008/06/01/1212341852_0.jpg', name: 'Biblioteca', description: 'Descripción de la biblioteca.' },
    { id: 9, category: 'Biblioteca', src: 'https://www.vagalume.com.br/bon-jovi/images/87749.jpg', name: 'Biblioteca', description: 'Descripción de la biblioteca.' },
    { id: 10, category: 'Cafeteria', src: 'https://th.bing.com/th/id/R.8891920a69d01ebb21bb04cad959221e?rik=FloenOReUhAvXg&riu=http%3a%2f%2fimages4.fanpop.com%2fimage%2fphotos%2f17000000%2fbon-jovi-bon-jovi-17035919-358-600.jpg&ehk=JWjPeLRr0k6IVgFglZ9%2fkVHBwuyg7D82%2frEMsr6vLxs%3d&risl=&pid=ImgRaw&r=0', name: 'Biblioteca', description: 'Descripción de la biblioteca.' },
    { id: 11, category: 'Cafeteria', src: 'https://th.bing.com/th/id/OIP.jGEr0zH5BmB5Ques5ISMDAAAAA?pid=ImgDet&w=400&h=345&rs=1', name: 'Biblioteca', description: 'Descripción de la biblioteca.' },
    { id: 12, category: 'Cafeteria', src: 'https://th.bing.com/th/id/R.f94ad482791979d9ceed0f8f2fab9b2d?rik=xtc%2fMmvPX5ZsEw&pid=ImgRaw&r=0', name: 'Biblioteca', description: 'Descripción de la biblioteca.' },
    { id: 13, category: 'Cafeteria', src: 'https://th.bing.com/th/id/OIP.9KiCRSAaZUCmqY1dwfUqkwHaEo?pid=ImgDet&w=620&h=388&rs=1', name: 'Biblioteca', description: 'Descripción de la biblioteca.' },
    { id: 14, category: 'Cafeteria', src: 'https://th.bing.com/th/id/OIP.yR-ps8U7sKxSCrc82ZzDnQHaEv?pid=ImgDet&w=1024&h=656&rs=1', name: 'Biblioteca', description: 'Descripción de la biblioteca.' },
    { id: 15, category: 'Cafeteria', src: 'https://th.bing.com/th/id/R.0f3b18812d6ab30c1cb2b72ee44a7c05?rik=iezPnMs5KDbYtQ&pid=ImgRaw&r=0', name: 'Biblioteca', description: 'Descripción de la biblioteca.' },
    { id: 16, category: 'Cafeteria', src: 'https://www.billboard.com/wp-content/uploads/media/jon-bon-jovi-live-2017-philly-billboard-1548.jpg?w=942&h=623&crop=1', name: 'Biblioteca', description: 'Descripción de la biblioteca.' },
    { id: 17, category: 'Cafeteria', src: 'https://th.bing.com/th/id/R.0356ca3518c058326fd3becfdf535012?rik=jV69svXFnWIi7Q&riu=http%3a%2f%2ffarm3.staticflickr.com%2f2251%2f2533750060_9b24d57b8f_z_d.jpg%3fzz%3d1&ehk=8Ms3AzxmWhvYvMb6DssL%2fGSEubacnquWoY1kqt8YuSA%3d&risl=&pid=ImgRaw&r=0', name: 'Biblioteca', description: 'Descripción de la biblioteca.' },
    { id: 18, category: 'Cafeteria', src: 'https://th.bing.com/th/id/OIP.jGEr0zH5BmB5Ques5ISMDAAAAA?pid=ImgDet&w=400&h=345&rs=1', name: 'Biblioteca', description: 'Descripción de la biblioteca.' },
    { id: 19, category: 'Cafeteria', src: 'https://th.bing.com/th/id/R.f94ad482791979d9ceed0f8f2fab9b2d?rik=xtc%2fMmvPX5ZsEw&pid=ImgRaw&r=0', name: 'Biblioteca', description: 'Descripción de la biblioteca.' },
    { id: 20, category: 'Cine', src: 'https://th.bing.com/th/id/OIP.9KiCRSAaZUCmqY1dwfUqkwHaEo?pid=ImgDet&w=620&h=388&rs=1', name: 'Biblioteca', description: 'Descripción de la biblioteca.' },
    { id: 21, category: 'Cine', src: 'https://th.bing.com/th/id/OIP.yR-ps8U7sKxSCrc82ZzDnQHaEv?pid=ImgDet&w=1024&h=656&rs=1', name: 'Biblioteca', description: 'Descripción de la biblioteca.' },
    { id: 22, category: 'Cine', src: 'https://th.bing.com/th/id/R.fe6ba513d4770b852751b63e08c896ae?rik=yWqU5EdG0aUbjQ&riu=http%3a%2f%2f4.bp.blogspot.com%2f__RahHtBqYhU%2fTFMQ3Jnu7qI%2fAAAAAAAAC9w%2fhDrST6uoKpw%2fs1600%2fJonBonJovi0989.jpg&ehk=EckRnNoRFpmfyi7mW5B41HDjvhCbRet9JU68c8LDX8A%3d&risl=&pid=ImgRaw&r=0', name: 'Biblioteca', description: 'Descripción de la biblioteca.' },
    { id: 23, category: 'Cine', src: 'https://www.vagalume.com.br/bon-jovi/images/87749.jpg', name: 'Biblioteca', description: 'Descripción de la biblioteca.' },
    { id: 24, category: 'Cine', src: 'https://th.bing.com/th/id/R.8891920a69d01ebb21bb04cad959221e?rik=FloenOReUhAvXg&riu=http%3a%2f%2fimages4.fanpop.com%2fimage%2fphotos%2f17000000%2fbon-jovi-bon-jovi-17035919-358-600.jpg&ehk=JWjPeLRr0k6IVgFglZ9%2fkVHBwuyg7D82%2frEMsr6vLxs%3d&risl=&pid=ImgRaw&r=0', name: 'Biblioteca', description: 'Descripción de la biblioteca.' },
    { id: 25, category: 'Cine', src: 'https://th.bing.com/th/id/OIP.jGEr0zH5BmB5Ques5ISMDAAAAA?pid=ImgDet&w=400&h=345&rs=1', name: 'Biblioteca', description: 'Descripción de la biblioteca.' },
    { id: 26, category: 'Cine', src: 'https://th.bing.com/th/id/R.f94ad482791979d9ceed0f8f2fab9b2d?rik=xtc%2fMmvPX5ZsEw&pid=ImgRaw&r=0', name: 'Biblioteca', description: 'Descripción de la biblioteca.' },
    { id: 27, category: 'Cine', src: 'https://th.bing.com/th/id/OIP.9KiCRSAaZUCmqY1dwfUqkwHaEo?pid=ImgDet&w=620&h=388&rs=1', name: 'Biblioteca', description: 'Descripción de la biblioteca.' },
    { id: 28, category: 'Cine', src: 'https://th.bing.com/th/id/OIP.bEPBZD0nS5TjUEQR4p-UBwAAAA?pid=ImgDet&w=433&h=650&rs=1', name: 'Biblioteca', description: 'Descripción de la biblioteca.' },
];


const breakpointColumnsObj = {
    default: 4, // 4 columnas por defecto
    1600: 5,    // 5 columnas cuando el ancho de la ventana es >= 1600px
    1100: 3,    // 3 columnas cuando el ancho de la ventana es >= 1100px
    700: 2,     // 2 columnas cuando el ancho de la ventana es >= 700px
    500: 1      // 1 columna cuando el ancho de la ventana es >= 500px
};

const getCategoryColorClass = (category) => {
    switch (category) {
        case 'Biblioteca':
            return 'text-blue-500';
        case 'Cafeteria':
            return 'text-green-500';
        case 'Cine':
            return 'text-red-500';
        default:
            return 'text-gray-500';
    }
};

const AmericanSpaces = () => {
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageClick = (imageId) => {
        setSelectedImage(imageId === selectedImage ? null : imageId);
    };

    const imagesByCategory = {};
    images.forEach(image => {
        if (!imagesByCategory[image.category]) {
            imagesByCategory[image.category] = [];
        }
        imagesByCategory[image.category].push(image);
    });

    return (
        <div>
            {Object.keys(imagesByCategory).map(category => (
                <div key={category} className="mb-4 text-center">
                    <h2 className={`text-3xl uppercase font-bold mb-2 ${getCategoryColorClass(category)}`}>{category}</h2>
                    <Masonry
                        breakpointCols={breakpointColumnsObj}
                        className="masonry-grid"
                        columnClassName="masonry-grid-column"
                    >
                        {imagesByCategory[category].map((image) => (
                            <div
                                key={image.id}
                                className="relative cursor-pointer rounded-lg overflow-hidden"
                                onClick={() => handleImageClick(image.id)}
                            >
                                <img src={image.src} alt={image.name} className="w-full h-auto" />
                                {selectedImage === image.id && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white p-4">
                                        <div>
                                            <h2 className="text-xl font-bold mb-2">{image.name}</h2>
                                            <p>{image.description}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </Masonry>
                </div>
            ))}
        </div>
    );
};

export default AmericanSpaces;
// // Define un objeto que especifica el número de columnas en función del ancho de la ventana.
// const breakpointColumnsObj = {
//     default: 4, // 4 columnas por defecto
//     1100: 3,    // 3 columnas cuando el ancho de la ventana es >= 1100px
//     700: 2,     // 2 columnas cuando el ancho de la ventana es >= 700px
//     500: 1      // 1 columna cuando el ancho de la ventana es >= 500px
// };
// const AmericanSpaces = () => {
//     const [selectedImage, setSelectedImage] = useState(null);

//     const handleImageClick = (imageId) => {
//         setSelectedImage(imageId === selectedImage ? null : imageId);
//     };

//     // Agrupar imágenes por categoría
//     const imagesByCategory = {};
//     images.forEach(image => {
//         if (!imagesByCategory[image.category]) {
//             imagesByCategory[image.category] = [];
//         }
//         imagesByCategory[image.category].push(image);
//     });

//     return (
//         <div>
//             {/* Iterar sobre cada categoría y mostrar las imágenes */}
//             {Object.keys(imagesByCategory).map(category => (
//                 <div key={category} className="mb-4 text-center">
//                     <h2 className="text-3xl uppercase font-bold mb-2 text-blue-500">{category}</h2>
//                     <Masonry
//                         breakpointCols={breakpointColumnsObj}
//                         className="masonry-grid"
//                         columnClassName="masonry-grid-column"
//                     >
//                         {/* Iterar sobre las imágenes de la categoría actual */}
//                         {imagesByCategory[category].map((image) => (
//                             <div
//                                 key={image.id}
//                                 className="relative cursor-pointer rounded-lg overflow-hidden"
//                                 onClick={() => handleImageClick(image.id)}
//                             >
//                                 <img src={image.src} alt={image.name} className="w-full h-auto" />
//                                 {selectedImage === image.id && (
//                                     <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white p-4">
//                                         <div>
//                                             <h2 className="text-xl font-bold mb-2">{image.name}</h2>
//                                             <p>{image.description}</p>
//                                         </div>
//                                     </div>
//                                 )}
//                             </div>
//                         ))}
//                     </Masonry>
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default AmericanSpaces;



// // // Definición del componente funcional AmericanSpaces.
// // const AmericanSpaces = () => {
// //     // Usa el hook useState para gestionar el estado del id de la imagen seleccionada.
// //     const [selectedImage, setSelectedImage] = useState(null);

// //     // Función que maneja el clic en una imagen, muestra o oculta la descripción.
// //     const handleImageClick = (imageId) => {
// //         // Si el id de la imagen clicada es igual al id de la imagen seleccionada,
// //         // establece el id de la imagen seleccionada como null (oculta la descripción).
// //         // De lo contrario, establece el id de la imagen clicada como la imagen seleccionada.
// //         setSelectedImage(imageId === selectedImage ? null : imageId);
// //     };

// //     // Renderiza el componente Masonry con las imágenes y su descripción.
// //     return (
// //         <Masonry
// //             breakpointCols={breakpointColumnsObj} // Configura las columnas responsivas.
// //             className="masonry-grid" // Clase CSS para el contenedor de la mampostería.
// //             columnClassName="masonry-grid-column" // Clase CSS para las columnas de la mampostería.
// //         >
// //             {images.map((image) => (
// //                 // Itera sobre el array de imágenes y crea un elemento div para cada una.
// //                 <div
// //                     key={image.id} // Clave única para el elemento div (react exige esto para la eficiencia de renderizado).
// //                     className="relative cursor-pointer rounded-lg overflow-hidden   "
// //                     onClick={() => handleImageClick(image.id)} // Asocia la función handleImageClick al evento de clic.
// //                 >
// //                     <img src={image.src} alt={image.name} className="w-full h-auto " />
// //                     {/* Si la imagen está seleccionada, muestra una descripción semitransparente sobre la imagen. */}
// //                     {selectedImage === image.id && (
// //                         <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white p-4">
// //                             <div>
// //                                 <h2 className="text-xl font-bold mb-2">{image.name}</h2>
// //                                 <p>{image.description}</p>
// //                             </div>
// //                         </div>
// //                     )}
// //                 </div>
// //             ))}
// //         </Masonry>
// //     );
// // };

// // export default AmericanSpaces; // Exporta el componente AmericanSpaces para ser utilizado en otros archivos.


const CarouselGallery360 = ({ selected, handleSelectedImage }) => {
    return (
        <div className="flex flex-wrap">
            {selected &&
                selected.imagen.map((img) => {
                    return (
                        <div key={img} className="p-2">
                            <img
                                className="w-24 h-24 object-cover cursor-pointer"
                                onClick={() => handleSelectedImage(img)}
                                src={img}
                                alt="image"
                            />
                        </div>
                    );
                })}
        </div>
    );
};

export default CarouselGallery360;

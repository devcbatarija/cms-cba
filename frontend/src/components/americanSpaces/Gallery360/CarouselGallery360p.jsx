const CarouselGallery360 = ({ selected, handleSelectedImage }) => {
    return (
        <div className="flex flex-wrap">
            {selected &&
                selected.Galleries.map((img) => {
                    return (
                        <div key={img.id_gallery} className="p-2">
                            <img
                                className="w-24 h-24 object-cover cursor-pointer"
                                onClick={() => handleSelectedImage(img.image)}
                                src={img.image}
                                alt="image"
                            />
                        </div>
                    );
                })}
        </div>
    );
};

export default CarouselGallery360;
